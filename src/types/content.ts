/**
 * Datenschema für Szenarien und Artikel.
 * Inhalte liegen getrennt von UI-Komponenten in src/data/.
 */

export type Classification = 'phishing' | 'legitim';
export type Difficulty = 'leicht' | 'mittel' | 'schwer';
export type Channel = 'email' | 'sms' | 'messenger';

export const TOPICS = {
  paket: 'Paket & Lieferung',
  konto: 'Passwort & Konto',
  mfa: 'MFA & Anmeldung',
  zahlung: 'Rechnung & Zahlung',
  intern: 'Interne Kommunikation',
  qr: 'QR-Codes',
  bewerbung: 'Bewerbung & HR',
  anhang: 'Anhänge',
  wartung: 'IT-Wartung & Support',
  freigabe: 'Dokumentfreigaben',
  mobil: 'SMS & Messenger',
  ungewoehnlich: 'Legitim, aber ungewöhnlich',
} as const;
export type TopicId = keyof typeof TOPICS;

export const MESSAGE_TYPES = {
  benachrichtigung: 'Benachrichtigung',
  rechnung: 'Rechnung / Zahlung',
  anfrage: 'Anfrage',
  sicherheit: 'Sicherheitshinweis',
  mitteilung: 'Interne Mitteilung',
  freigabe: 'Dokumentfreigabe',
  kurznachricht: 'Kurznachricht',
} as const;
export type MessageTypeId = keyof typeof MESSAGE_TYPES;

/** Wo im Nachrichtenfenster ein Hinweis zu finden ist. */
export type HintLocation = 'sender' | 'subject' | 'body' | 'link' | 'attachment';
/** warnung = spricht für Phishing, vertrauen = stützt Legitimität, neutral = allein kein Beweis. */
export type HintSignal = 'warnung' | 'vertrauen' | 'neutral';

export interface Hint {
  location: HintLocation;
  /** Für location 'body': wörtlicher Ausschnitt aus dem Nachrichtentext. */
  excerpt?: string;
  signal: HintSignal;
  text: string;
}

export interface SimulatedLink {
  /** Sichtbarer Linktext */
  label: string;
  /** Tatsächliches (fiktives) Ziel – nur .example-Domains. Wird nie aufgerufen. */
  target: string;
}

export interface SimulatedAttachment {
  name: string;
  size: string;
}

export interface Scenario {
  id: string;
  title: string;
  topic: TopicId;
  difficulty: Difficulty;
  channel: Channel;
  messageType: MessageTypeId;
  sender: { name: string; address: string };
  /** Bei SMS/Messenger kann das leer bleiben. */
  subject: string;
  receivedAt: string;
  /** Absätze des Nachrichtentexts */
  body: string[];
  link?: SimulatedLink;
  attachment?: SimulatedAttachment;
  classification: Classification;
  learningGoal: string;
  hints: Hint[];
  /** Warum die richtige Einordnung zutrifft */
  explanation: string;
  /** Warum die andere Einordnung hier nicht zutrifft / was allein kein Beweis ist */
  counterArguments: string;
  safeAction: string;
  /** Was zu tun ist, wenn man falsch gehandelt hat (z. B. geklickt) */
  afterMistake: string;
  articleIds: string[];
}

export type Audience = 'alle' | 'it';

export interface ArticleSource {
  title: string;
  url: string;
  note: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  audience: Audience;
  level: Difficulty;
  tags: string[];
  /** Markdown-ähnlicher Text: "## Überschrift", "### Unterüberschrift", "- Liste", "1. Liste", "> Hinweis", **fett** */
  body: string;
  checklist: string[];
  relatedArticleIds: string[];
  sources?: ArticleSource[];
}
