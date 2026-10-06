/**
 * Fisher-Yates-Shuffle: jede Permutation ist gleich wahrscheinlich.
 * (Ein `sort(() => Math.random() - 0.5)` wäre verzerrt.)
 * Nutzt crypto.getRandomValues, wenn verfügbar.
 */
export type RandomFn = () => number;

export const defaultRandom: RandomFn = () => {
  const c = globalThis.crypto;
  if (c?.getRandomValues) {
    const buf = new Uint32Array(1);
    c.getRandomValues(buf);
    return buf[0] / 2 ** 32;
  }
  return Math.random();
};

export function shuffle<T>(items: readonly T[], random: RandomFn = defaultRandom): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Wählt `count` verschiedene Elemente zufällig aus (ohne Wiederholung). */
export function sample<T>(items: readonly T[], count: number, random: RandomFn = defaultRandom): T[] {
  return shuffle(items, random).slice(0, Math.min(count, items.length));
}
