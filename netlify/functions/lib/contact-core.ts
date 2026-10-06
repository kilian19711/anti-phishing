/**
 * Kernlogik des Kontaktformulars – ohne Netlify-Abhängigkeit, damit sie testbar ist.
 * Datenschutz: Diese Datei protokolliert niemals Name, E-Mail-Adresse, Betreff oder Nachricht.
 */

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
  minMessage: 10,
  /** Mindestzeit zwischen Anzeigen und Absenden des Formulars (Spam-Schutz ohne Drittanbieter) */
  minFillMs: 3000,
} as const;

export const TOPICS = ['Frage zu PhishLab', 'Fehler melden', 'Feedback zu Inhalten', 'Sonstiges'] as const;

export interface ContactInput {
  name: string;
  email: string;
  topic: string;
  subject: string;
  message: string;
}

export interface ContactRequestBody extends Partial<ContactInput> {
  /** Honeypot – muss leer bleiben */
  website?: string;
  /** Zeitpunkt der Formularanzeige (ms) */
  startedAt?: number;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
// eslint-disable-next-line no-control-regex -- Steuerzeichen sollen gezielt entfernt werden
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Entfernt Steuerzeichen; für einzeilige Felder zusätzlich Zeilenumbrüche (Schutz vor Header-Injection). */
export function sanitizeLine(value: unknown): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').replace(CONTROL_RE, '').trim();
}

export function sanitizeText(value: unknown): string {
  return String(value ?? '').replace(/\r\n?/g, '\n').replace(CONTROL_RE, '').trim();
}

export function validateContact(body: ContactRequestBody): { data: ContactInput; errors: FieldErrors } {
  const data: ContactInput = {
    name: sanitizeLine(body.name),
    email: sanitizeLine(body.email),
    topic: sanitizeLine(body.topic),
    subject: sanitizeLine(body.subject),
    message: sanitizeText(body.message),
  };
  const errors: FieldErrors = {};
  if (data.name.length > LIMITS.name) errors.name = `Der Name darf höchstens ${LIMITS.name} Zeichen lang sein.`;
  if (!data.email) errors.email = 'Bitte geben Sie eine E-Mail-Adresse für die Antwort an.';
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an, z. B. name@beispiel.de.';
  if (!(TOPICS as readonly string[]).includes(data.topic)) errors.topic = 'Bitte wählen Sie ein Thema aus der Liste.';
  if (!data.subject) errors.subject = 'Bitte geben Sie einen Betreff an.';
  else if (data.subject.length > LIMITS.subject) errors.subject = `Der Betreff darf höchstens ${LIMITS.subject} Zeichen lang sein.`;
  if (data.message.length < LIMITS.minMessage) errors.message = `Bitte schreiben Sie eine Nachricht mit mindestens ${LIMITS.minMessage} Zeichen.`;
  else if (data.message.length > LIMITS.message) errors.message = `Die Nachricht darf höchstens ${LIMITS.message} Zeichen lang sein.`;
  return { data, errors };
}

/** Austauschbare Schnittstelle für E-Mail-Dienstleister. */
export interface MailMessage {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export interface MailProvider {
  readonly name: string;
  send(message: MailMessage): Promise<{ ok: true; id: string } | { ok: false; reason: string }>;
}

export interface ContactConfig {
  recipient?: string;
  from?: string;
  apiKey?: string;
}

export function isConfigured(cfg: ContactConfig): cfg is Required<ContactConfig> {
  return Boolean(cfg.recipient?.trim() && cfg.from?.trim() && cfg.apiKey?.trim());
}

/** Resend-Implementierung (https://resend.com/docs/api-reference/emails/send-email). */
export function createResendProvider(apiKey: string, fetchImpl: typeof fetch = fetch): MailProvider {
  return {
    name: 'Resend',
    async send(message) {
      try {
        const res = await fetchImpl('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: message.from,
            to: [message.to],
            reply_to: message.replyTo,
            subject: message.subject,
            text: message.text,
          }),
        });
        if (!res.ok) return { ok: false, reason: `provider_status_${res.status}` };
        const json = (await res.json().catch(() => null)) as { id?: string } | null;
        if (!json?.id) return { ok: false, reason: 'provider_no_id' };
        return { ok: true, id: json.id };
      } catch {
        return { ok: false, reason: 'provider_unreachable' };
      }
    },
  };
}

export function buildMail(data: ContactInput, cfg: Required<ContactConfig>): MailMessage {
  const lines = [
    'Neue Kontaktanfrage über das PhishLab-Kontaktformular',
    '',
    `Name: ${data.name || '(nicht angegeben)'}`,
    `Antwortadresse: ${data.email}`,
    `Thema: ${data.topic}`,
    `Betreff: ${data.subject}`,
    '',
    'Nachricht:',
    data.message,
  ];
  return {
    from: cfg.from,
    to: cfg.recipient,
    replyTo: data.email,
    subject: `[PhishLab] ${data.topic}: ${data.subject}`.slice(0, 200),
    text: lines.join('\n'),
  };
}

export interface HandlerResult {
  status: number;
  body: Record<string, unknown>;
}

export interface HandlerDeps {
  config: ContactConfig;
  createProvider?: (apiKey: string) => MailProvider;
  now?: () => number;
  /** Logger erhält ausschließlich anonyme Ereigniscodes. */
  log?: (event: string) => void;
}

export async function handleContact(method: string, rawBody: string | null, deps: HandlerDeps): Promise<HandlerResult> {
  const log = deps.log ?? (() => {});
  const now = deps.now ?? Date.now;
  const configured = isConfigured(deps.config);

  if (method === 'GET') return { status: 200, body: { configured } };
  if (method !== 'POST') return { status: 405, body: { code: 'method_not_allowed', message: 'Diese Anfrage ist nicht erlaubt.' } };

  if (!rawBody || rawBody.length > 20_000) {
    return { status: 400, body: { code: 'invalid_body', message: 'Die Anfrage war leer oder zu groß.' } };
  }
  let body: ContactRequestBody;
  try {
    body = JSON.parse(rawBody) as ContactRequestBody;
  } catch {
    return { status: 400, body: { code: 'invalid_body', message: 'Die Anfrage konnte nicht gelesen werden.' } };
  }

  // Honeypot oder zu schnelles Absenden: freundlich, aber ohne Versand ablehnen.
  if (sanitizeLine(body.website)) {
    log('spam_honeypot');
    return { status: 400, body: { code: 'spam', message: 'Die Anfrage wurde als automatisiert erkannt und nicht versendet.' } };
  }
  if (typeof body.startedAt !== 'number' || now() - body.startedAt < LIMITS.minFillMs) {
    log('spam_too_fast');
    return { status: 400, body: { code: 'spam', message: 'Die Anfrage wurde zu schnell abgeschickt. Bitte warten Sie einen Moment und versuchen Sie es erneut.' } };
  }

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length) {
    return { status: 422, body: { code: 'validation', message: 'Bitte prüfen Sie die markierten Felder.', errors } };
  }

  if (!configured) {
    log('not_configured');
    return { status: 503, body: { code: 'not_configured', message: 'Der E-Mail-Versand ist noch nicht eingerichtet. Ihre Nachricht wurde nicht versendet.' } };
  }

  const cfg = deps.config as Required<ContactConfig>;
  const provider = (deps.createProvider ?? ((key) => createResendProvider(key)))(cfg.apiKey);
  const result = await provider.send(buildMail(data, cfg));
  if (!result.ok) {
    log(`provider_error:${result.reason}`);
    return { status: 502, body: { code: 'provider_error', message: 'Der E-Mail-Dienst hat die Nachricht nicht angenommen. Bitte versuchen Sie es später erneut.' } };
  }
  log('sent');
  return { status: 200, body: { code: 'sent', message: 'Ihre Nachricht wurde vom E-Mail-Dienst angenommen.' } };
}
