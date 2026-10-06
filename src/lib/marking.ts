import type { Hint, HintLocation, Scenario } from '../types/content';

export interface Segment {
  id: string;
  location: HintLocation;
  text: string;
}

export function splitSentences(paragraph: string): string[] {
  return paragraph.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„(0-9])/u).filter(Boolean);
}

export function bodySegments(scenario: Scenario): Segment[][] {
  return scenario.body.map((p, pi) => splitSentences(p).map((text, si) => ({ id: `body-${pi}-${si}`, location: 'body' as const, text })));
}

export function allSegments(scenario: Scenario): Segment[] {
  const segs: Segment[] = [{ id: 'sender', location: 'sender', text: `${scenario.sender.name} <${scenario.sender.address}>` }];
  if (scenario.subject) segs.push({ id: 'subject', location: 'subject', text: scenario.subject });
  segs.push(...bodySegments(scenario).flat());
  if (scenario.link) segs.push({ id: 'link', location: 'link', text: scenario.link.label });
  if (scenario.attachment) segs.push({ id: 'attachment', location: 'attachment', text: scenario.attachment.name });
  return segs;
}

export function hintsForSegment(scenario: Scenario, segment: Segment): Hint[] {
  return scenario.hints.filter((h) => {
    if (h.location !== segment.location) return false;
    if (h.location !== 'body') return true;
    if (!h.excerpt) return false;
    // Ausschnitt liegt im Satz oder der Satz liegt im (satzübergreifenden) Ausschnitt
    return segment.text.includes(h.excerpt) || h.excerpt.includes(segment.text);
  });
}

export interface MarkEvaluation {
  found: Hint[];
  missed: Hint[];
  extraSegments: Segment[];
}

export function evaluateMarks(scenario: Scenario, markedIds: string[]): MarkEvaluation {
  const segs = allSegments(scenario).filter((s) => markedIds.includes(s.id));
  const found = new Set<Hint>();
  const extraSegments: Segment[] = [];
  for (const s of segs) {
    const hs = hintsForSegment(scenario, s);
    if (hs.length === 0) extraSegments.push(s);
    hs.forEach((h) => found.add(h));
  }
  return { found: [...found], missed: scenario.hints.filter((h) => !found.has(h)), extraSegments };
}

/** Registrierte Domain = die letzten zwei Bestandteile des Hostnamens (vereinfacht für .example). */
export function registeredDomain(url: string): string {
  try {
    const parts = new URL(url).hostname.split('.');
    return parts.slice(-2).join('.');
  } catch {
    return '';
  }
}

export function hostname(url: string): string {
  try { return new URL(url).hostname; } catch { return ''; }
}
