import { describe, expect, it } from 'vitest';
import { builtInScenarios } from './content';
import { createRound, filterPool } from './quiz';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('verändert das Original nicht und behält alle Elemente', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect([...out].sort()).toEqual(input);
  });

  it('ist annähernd gleichverteilt (Fisher-Yates)', () => {
    const counts: Record<string, number> = {};
    for (let i = 0; i < 6000; i++) {
      const k = shuffle([1, 2, 3]).join('');
      counts[k] = (counts[k] ?? 0) + 1;
    }
    expect(Object.keys(counts)).toHaveLength(6);
    Object.values(counts).forEach((c) => expect(c).toBeGreaterThan(800));
  });
});

describe('createRound', () => {
  it('Standardrunde: 10 Fälle ohne Duplikate', () => {
    const r = createRound(builtInScenarios, 'standard');
    expect(r).toHaveLength(10);
    expect(new Set(r).size).toBe(10);
  });

  it('kurze Runde: 5 Fälle', () => {
    expect(createRound(builtInScenarios, 'kurz')).toHaveLength(5);
  });

  it('vollständiger Modus: jeder Fall genau einmal', () => {
    const r = createRound(builtInScenarios, 'voll');
    expect(r).toHaveLength(builtInScenarios.length);
    expect(new Set(r)).toEqual(new Set(builtInScenarios.map((s) => s.id)));
  });

  it('erzeugt unterschiedliche Runden', () => {
    const rounds = new Set(Array.from({ length: 20 }, () => createRound(builtInScenarios, 'standard').join()));
    expect(rounds.size).toBeGreaterThan(15);
  });

  it('wiederholt nicht exakt die vorherige Reihenfolge', () => {
    const pool = builtInScenarios.slice(0, 2);
    const prev = createRound(pool, 'voll');
    for (let i = 0; i < 20; i++) expect(createRound(pool, 'voll', {}, prev).join()).not.toBe(prev.join());
  });

  it('kombiniert Filter und Zufall ohne Duplikate', () => {
    const filtered = filterPool(builtInScenarios, { topic: 'zahlung' });
    const r = createRound(builtInScenarios, 'standard', { topic: 'zahlung' });
    expect(r.length).toBe(Math.min(10, filtered.length));
    expect(new Set(r).size).toBe(r.length);
    r.forEach((id) => expect(filtered.map((s) => s.id)).toContain(id));
  });

  it('dedupliziert einen Pool mit doppelten Einträgen', () => {
    const doubled = [...builtInScenarios, ...builtInScenarios];
    const r = createRound(doubled, 'voll');
    expect(new Set(r).size).toBe(r.length);
    expect(r.length).toBe(builtInScenarios.length);
  });

  it('filtert nach Artikel', () => {
    const r = createRound(builtInScenarios, 'voll', { articleId: 'qr-phishing' });
    expect(r.length).toBeGreaterThan(0);
    r.forEach((id) => expect(builtInScenarios.find((s) => s.id === id)!.articleIds).toContain('qr-phishing'));
  });
});
