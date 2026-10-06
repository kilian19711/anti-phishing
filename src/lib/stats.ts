import { TOPICS, type Difficulty, type Scenario, type TopicId } from '../types/content';
import type { AnswerRecord } from '../state/types';

export interface Bucket {
  answered: number;
  correct: number;
  lastAt?: number;
  total: number;
}

export function rate(b: { answered: number; correct: number }): number | null {
  return b.answered ? Math.round((b.correct / b.answered) * 100) : null;
}

/** Fortschritt nach Thema bzw. Schwierigkeit – nur auf Basis der eigenen Antworten, ohne Personenprofil. */
export function statsBy<K extends string>(
  history: AnswerRecord[],
  pool: Scenario[],
  keyOf: (s: Scenario) => K,
  keys: readonly K[],
): Record<K, Bucket & { seen: number }> {
  const byId = new Map(pool.map((s) => [s.id, s]));
  const out = Object.fromEntries(keys.map((k) => [k, { answered: 0, correct: 0, total: 0, seen: 0 }])) as Record<K, Bucket & { seen: number }>;
  pool.forEach((s) => { if (out[keyOf(s)]) out[keyOf(s)].total++; });
  const seen = new Map<K, Set<string>>();
  for (const h of history) {
    const s = byId.get(h.scenarioId);
    if (!s) continue;
    const k = keyOf(s);
    const b = out[k];
    if (!b) continue;
    b.answered++;
    if (h.correct) b.correct++;
    b.lastAt = Math.max(b.lastAt ?? 0, h.at);
    if (!seen.has(k)) seen.set(k, new Set());
    seen.get(k)!.add(s.id);
  }
  seen.forEach((set, k) => { out[k].seen = set.size; });
  return out;
}

export const TOPIC_IDS = Object.keys(TOPICS) as TopicId[];
export const DIFFICULTY_IDS: Difficulty[] = ['leicht', 'mittel', 'schwer'];

/** Nächste Empfehlung: Thema mit niedrigster Trefferquote, sonst unbearbeitetes Thema. */
export function recommendTopic(history: AnswerRecord[], pool: Scenario[]): TopicId {
  const stats = statsBy(history, pool, (s) => s.topic, TOPIC_IDS);
  const untouched = TOPIC_IDS.filter((t) => stats[t].answered === 0 && stats[t].total > 0);
  const weak = TOPIC_IDS.filter((t) => stats[t].answered > 0).sort((a, b) => (rate(stats[a]) ?? 0) - (rate(stats[b]) ?? 0));
  if (weak.length && (rate(stats[weak[0]]) ?? 100) < 70) return weak[0];
  return untouched[0] ?? weak[0] ?? 'paket';
}

export function recentTopics(history: AnswerRecord[], pool: Scenario[], n = 3): TopicId[] {
  const byId = new Map(pool.map((s) => [s.id, s]));
  const out: TopicId[] = [];
  for (let i = history.length - 1; i >= 0 && out.length < n; i--) {
    const t = byId.get(history[i].scenarioId)?.topic;
    if (t && !out.includes(t)) out.push(t);
  }
  return out;
}
