import {
  MESSAGE_TYPES,
  TOPICS,
  type Scenario,
} from '../types/content';

export interface FieldError {
  field: string;
  message: string;
}

const DIFFICULTIES = ['leicht', 'mittel', 'schwer'];
const CHANNELS = ['email', 'sms', 'messenger'];
const CLASSIFICATIONS = ['phishing', 'legitim'];
const LOCATIONS = ['sender', 'subject', 'body', 'link', 'attachment'];
const SIGNALS = ['warnung', 'vertrauen', 'neutral'];

/** Erlaubte fiktive Domains: nur reservierte Endung .example */
export function isSafeExampleUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (u.protocol === 'https:' || u.protocol === 'http:') && u.hostname.endsWith('.example');
  } catch {
    return false;
  }
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function requireText(obj: Record<string, unknown>, field: string, label: string, errors: FieldError[], max = 4000) {
  const v = obj[field];
  if (!isString(v) || !v.trim()) errors.push({ field, message: `${label} ist ein Pflichtfeld.` });
  else if (v.length > max) errors.push({ field, message: `${label} darf höchstens ${max} Zeichen lang sein.` });
}

/**
 * Prüft ein (z. B. importiertes) Objekt gegen das Szenario-Schema.
 * Gibt verständliche deutsche Fehlermeldungen zurück.
 */
export function validateScenario(input: unknown, knownArticleIds: string[]): FieldError[] {
  const errors: FieldError[] = [];
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return [{ field: 'root', message: 'Das Szenario muss ein JSON-Objekt sein.' }];
  }
  const o = input as Record<string, unknown>;

  if (!isString(o.id) || !/^[a-z0-9-]{3,40}$/.test(o.id)) {
    errors.push({ field: 'id', message: 'Die ID muss 3–40 Zeichen lang sein und darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten.' });
  }
  requireText(o, 'title', 'Titel', errors, 120);
  if (!isString(o.topic) || !(o.topic in TOPICS)) errors.push({ field: 'topic', message: 'Bitte ein gültiges Thema wählen.' });
  if (!isString(o.difficulty) || !DIFFICULTIES.includes(o.difficulty)) errors.push({ field: 'difficulty', message: 'Bitte eine Schwierigkeit wählen (leicht, mittel, schwer).' });
  if (!isString(o.channel) || !CHANNELS.includes(o.channel)) errors.push({ field: 'channel', message: 'Bitte einen Kanal wählen (E-Mail, SMS, Messenger).' });
  if (!isString(o.messageType) || !(o.messageType in MESSAGE_TYPES)) errors.push({ field: 'messageType', message: 'Bitte einen Nachrichtentyp wählen.' });

  const sender = o.sender as Record<string, unknown> | undefined;
  if (!sender || typeof sender !== 'object') {
    errors.push({ field: 'sender.name', message: 'Absendername ist ein Pflichtfeld.' });
    errors.push({ field: 'sender.address', message: 'Absenderadresse ist ein Pflichtfeld.' });
  } else {
    if (!isString(sender.name) || !sender.name.trim()) errors.push({ field: 'sender.name', message: 'Absendername ist ein Pflichtfeld.' });
    else if (sender.name.length > 120) errors.push({ field: 'sender.name', message: 'Absendername darf höchstens 120 Zeichen lang sein.' });
    if (!isString(sender.address) || !sender.address.trim()) {
      errors.push({ field: 'sender.address', message: 'Absenderadresse ist ein Pflichtfeld.' });
    } else if (sender.address.length > 160) {
      errors.push({ field: 'sender.address', message: 'Absenderadresse darf höchstens 160 Zeichen lang sein.' });
    } else if (o.channel === 'email' && !/^[^\s@]+@[^\s@]+\.example$/.test(sender.address)) {
      errors.push({ field: 'sender.address', message: 'E-Mail-Absender müssen eine erfundene Adresse mit der Endung .example nutzen, z. B. name@firma.example.' });
    }
  }

  if (!isString(o.subject)) errors.push({ field: 'subject', message: 'Betreff muss Text sein (bei SMS/Messenger darf er leer sein).' });
  else if (o.channel === 'email' && !o.subject.trim()) errors.push({ field: 'subject', message: 'Bei E-Mails ist der Betreff ein Pflichtfeld.' });
  requireText(o, 'receivedAt', 'Zeitpunkt', errors, 40);

  if (!Array.isArray(o.body) || o.body.length === 0 || !o.body.every((p) => isString(p) && p.trim())) {
    errors.push({ field: 'body', message: 'Der Nachrichtentext braucht mindestens einen Absatz.' });
  } else if (o.body.join('\n').length > 6000) {
    errors.push({ field: 'body', message: 'Der Nachrichtentext darf höchstens 6000 Zeichen lang sein.' });
  }

  if (o.link !== undefined) {
    const l = o.link as Record<string, unknown>;
    if (!l || !isString(l.label) || !l.label.trim()) errors.push({ field: 'link.label', message: 'Der Linktext fehlt.' });
    if (!l || !isString(l.target) || !isSafeExampleUrl(l.target)) {
      errors.push({ field: 'link.target', message: 'Das Linkziel muss eine erfundene Adresse mit .example-Domain sein, z. B. https://portal.example/login.' });
    }
  }
  if (o.attachment !== undefined) {
    const a = o.attachment as Record<string, unknown>;
    if (!a || !isString(a.name) || !a.name.trim()) errors.push({ field: 'attachment.name', message: 'Der Dateiname des Anhangs fehlt.' });
    if (!a || !isString(a.size)) errors.push({ field: 'attachment.size', message: 'Die Größe des Anhangs fehlt.' });
  }

  if (!isString(o.classification) || !CLASSIFICATIONS.includes(o.classification)) {
    errors.push({ field: 'classification', message: 'Bitte festlegen, ob der Fall Phishing oder legitim ist.' });
  }
  requireText(o, 'learningGoal', 'Lernziel', errors, 400);
  requireText(o, 'explanation', 'Erklärung', errors);
  requireText(o, 'counterArguments', 'Gegenargumente', errors);
  requireText(o, 'safeAction', 'Empfohlene Handlung', errors);
  requireText(o, 'afterMistake', 'Verhalten nach einem Fehlklick', errors);

  if (!Array.isArray(o.hints) || o.hints.length === 0) {
    errors.push({ field: 'hints', message: 'Bitte mindestens einen Hinweis angeben.' });
  } else {
    const bodyText = Array.isArray(o.body) ? o.body.join(' ') : '';
    o.hints.forEach((h, idx) => {
      const hint = h as Record<string, unknown>;
      const n = idx + 1;
      if (!hint || !isString(hint.location) || !LOCATIONS.includes(hint.location)) errors.push({ field: 'hints', message: `Hinweis ${n}: ungültige Fundstelle.` });
      if (!hint || !isString(hint.signal) || !SIGNALS.includes(hint.signal)) errors.push({ field: 'hints', message: `Hinweis ${n}: ungültige Einordnung (warnung, vertrauen, neutral).` });
      if (!hint || !isString(hint.text) || !hint.text.trim()) errors.push({ field: 'hints', message: `Hinweis ${n}: Erklärungstext fehlt.` });
      if (hint?.location === 'body') {
        if (!isString(hint.excerpt) || !hint.excerpt.trim()) errors.push({ field: 'hints', message: `Hinweis ${n}: Für den Nachrichtentext braucht es einen wörtlichen Ausschnitt.` });
        else if (!bodyText.includes(hint.excerpt)) errors.push({ field: 'hints', message: `Hinweis ${n}: Der Ausschnitt „${hint.excerpt}“ kommt im Nachrichtentext nicht vor.` });
      }
      if (hint?.location === 'link' && o.link === undefined) errors.push({ field: 'hints', message: `Hinweis ${n}: bezieht sich auf einen Link, aber das Szenario hat keinen Link.` });
      if (hint?.location === 'attachment' && o.attachment === undefined) errors.push({ field: 'hints', message: `Hinweis ${n}: bezieht sich auf einen Anhang, aber das Szenario hat keinen Anhang.` });
    });
  }

  if (!Array.isArray(o.articleIds) || o.articleIds.length === 0) {
    errors.push({ field: 'articleIds', message: 'Bitte mindestens einen passenden Wissensartikel verknüpfen.' });
  } else {
    o.articleIds.forEach((id) => {
      if (!isString(id) || !knownArticleIds.includes(id)) errors.push({ field: 'articleIds', message: `Der Artikel „${String(id)}“ existiert nicht.` });
    });
  }
  return errors;
}

export function isScenario(input: unknown, knownArticleIds: string[]): input is Scenario {
  return validateScenario(input, knownArticleIds).length === 0;
}

export interface ImportResult {
  scenarios: Scenario[];
  errors: string[];
}

/** Parst eine JSON-Datei mit einem Szenario oder einer Liste von Szenarien. */
export function parseScenarioImport(json: string, knownArticleIds: string[], existingIds: string[]): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { scenarios: [], errors: ['Die Datei enthält kein gültiges JSON.'] };
  }
  const list = Array.isArray(data) ? data : (data as { scenarios?: unknown })?.scenarios ?? [data];
  if (!Array.isArray(list) || list.length === 0) return { scenarios: [], errors: ['Die Datei enthält keine Szenarien.'] };
  if (list.length > 200) return { scenarios: [], errors: ['Es können höchstens 200 Szenarien auf einmal importiert werden.'] };
  const errors: string[] = [];
  const scenarios: Scenario[] = [];
  const seen = new Set(existingIds);
  list.forEach((item, idx) => {
    const label = `Szenario ${idx + 1}`;
    const errs = validateScenario(item, knownArticleIds);
    if (errs.length) {
      errors.push(...errs.map((e) => `${label}: ${e.message}`));
      return;
    }
    const s = item as Scenario;
    if (seen.has(s.id)) {
      errors.push(`${label}: Die ID „${s.id}“ ist bereits vergeben.`);
      return;
    }
    seen.add(s.id);
    scenarios.push(s);
  });
  return { scenarios, errors };
}
