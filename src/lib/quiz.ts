import type { Difficulty, Scenario, TopicId } from '../types/content';
import { defaultRandom, shuffle, type RandomFn } from './shuffle';

export type RoundMode = 'kurz' | 'standard' | 'voll';

export const ROUND_SIZES: Record<RoundMode, number | null> = {
  kurz: 5,
  standard: 10,
  voll: null,
};

export const ROUND_LABELS: Record<RoundMode, string> = {
  kurz: 'Kurze Runde (5 Fälle)',
  standard: 'Standardrunde (10 Fälle)',
  voll: 'Vollständiger Modus (alle Fälle)',
};

export interface RoundFilter {
  topic?: TopicId;
  difficulty?: Difficulty;
  articleId?: string;
}

export function filterPool(pool: Scenario[], filter: RoundFilter): Scenario[] {
  return pool.filter(
    (s) =>
      (!filter.topic || s.topic === filter.topic) &&
      (!filter.difficulty || s.difficulty === filter.difficulty) &&
      (!filter.articleId || s.articleIds.includes(filter.articleId)),
  );
}

/**
 * Erstellt eine neue Runde: gefiltert, gemischt, ohne doppelte Fälle.
 * Ist die neue Reihenfolge identisch mit der vorherigen, wird neu gemischt.
 */
export function createRound(
  pool: Scenario[],
  mode: RoundMode,
  filter: RoundFilter = {},
  previousOrder: string[] = [],
  random: RandomFn = defaultRandom,
): string[] {
  const unique = Array.from(new Map(filterPool(pool, filter).map((s) => [s.id, s])).values());
  const size = ROUND_SIZES[mode] ?? unique.length;
  let order: string[] = [];
  for (let attempt = 0; attempt < 10; attempt++) {
    order = shuffle(unique, random).slice(0, Math.min(size, unique.length)).map((s) => s.id);
    if (order.length < 2 || order.join() !== previousOrder.join()) break;
  }
  return order;
}
