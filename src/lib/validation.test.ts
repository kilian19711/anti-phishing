import { describe, expect, it } from 'vitest';
import { builtInScenarios, ARTICLE_IDS } from './content';
import { parseScenarioImport, validateScenario } from './validation';

const valid = { ...builtInScenarios[0], id: 'eigen-001' };

describe('validateScenario', () => {
  it('akzeptiert ein gültiges Szenario', () => {
    expect(validateScenario(valid, ARTICLE_IDS)).toEqual([]);
  });

  it('meldet fehlende Pflichtfelder verständlich', () => {
    const errs = validateScenario({ ...valid, title: '', explanation: '  ' }, ARTICLE_IDS);
    expect(errs.map((e) => e.field)).toEqual(expect.arrayContaining(['title', 'explanation']));
    expect(errs[0].message).toMatch(/Pflichtfeld/);
  });

  it('lehnt echte Domains ab', () => {
    const errs = validateScenario({ ...valid, sender: { name: 'X', address: 'a@bank.de' }, link: { label: 'x', target: 'https://bank.de' } }, ARTICLE_IDS);
    expect(errs.map((e) => e.field)).toEqual(expect.arrayContaining(['sender.address', 'link.target']));
  });

  it('lehnt unbekannte Artikel-IDs ab', () => {
    const errs = validateScenario({ ...valid, articleIds: ['gibt-es-nicht'] }, ARTICLE_IDS);
    expect(errs.some((e) => e.field === 'articleIds')).toBe(true);
  });

  it('lehnt Hinweis-Ausschnitte ab, die nicht im Text stehen', () => {
    const errs = validateScenario({ ...valid, hints: [{ location: 'body', excerpt: 'nicht vorhanden', signal: 'warnung', text: 'x' }] }, ARTICLE_IDS);
    expect(errs.some((e) => e.message.includes('kommt im Nachrichtentext nicht vor'))).toBe(true);
  });

  it('lehnt Nicht-Objekte ab', () => {
    expect(validateScenario('text', ARTICLE_IDS)).toHaveLength(1);
    expect(validateScenario(null, ARTICLE_IDS)).toHaveLength(1);
  });
});

describe('parseScenarioImport', () => {
  it('importiert Liste und Einzelobjekt', () => {
    expect(parseScenarioImport(JSON.stringify([valid]), ARTICLE_IDS, []).scenarios).toHaveLength(1);
    expect(parseScenarioImport(JSON.stringify(valid), ARTICLE_IDS, []).scenarios).toHaveLength(1);
    expect(parseScenarioImport(JSON.stringify({ scenarios: [valid] }), ARTICLE_IDS, []).scenarios).toHaveLength(1);
  });

  it('meldet ungültiges JSON', () => {
    expect(parseScenarioImport('{kaputt', ARTICLE_IDS, []).errors[0]).toMatch(/kein gültiges JSON/);
  });

  it('verhindert doppelte IDs', () => {
    const r = parseScenarioImport(JSON.stringify([valid, valid]), ARTICLE_IDS, []);
    expect(r.scenarios).toHaveLength(1);
    expect(r.errors[0]).toMatch(/bereits vergeben/);
    expect(parseScenarioImport(JSON.stringify(valid), ARTICLE_IDS, ['eigen-001']).scenarios).toHaveLength(0);
  });
});
