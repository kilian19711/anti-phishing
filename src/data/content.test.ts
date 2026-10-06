import { describe, expect, it } from 'vitest';
import { articles, builtInScenarios, articleWordCount, scenariosForArticle } from '../lib/content';
import { validateScenario, isSafeExampleUrl } from '../lib/validation';
import { parseMarkdown, tableOfContents } from '../lib/markdown';

const articleIds = articles.map((a) => a.id);

describe('Szenario-Pool', () => {
  it('enthält 110 Szenarien (60 Basisfälle + 50 Erweiterung)', () => {
    expect(builtInScenarios.length).toBe(110);
  });

  it('ist ausgewogen zwischen Phishing und legitim', () => {
    const phishing = builtInScenarios.filter((s) => s.classification === 'phishing').length;
    const legit = builtInScenarios.length - phishing;
    expect(phishing).toBe(legit);
  });

  it('hat eindeutige IDs und eindeutige Titel/Betreffzeilen', () => {
    const ids = builtInScenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    const titles = builtInScenarios.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
    const bodies = builtInScenarios.map((s) => s.body.join(' '));
    expect(new Set(bodies).size).toBe(bodies.length);
  });

  it.each(builtInScenarios.map((s) => [s.id, s] as const))('%s erfüllt das Schema', (_id, scenario) => {
    expect(validateScenario(scenario, articleIds)).toEqual([]);
  });

  it('nutzt ausschließlich .example-Domains für E-Mail-Absender und Links', () => {
    for (const s of builtInScenarios) {
      if (s.channel === 'email') expect(s.sender.address).toMatch(/\.example$/);
      if (s.link) expect(isSafeExampleUrl(s.link.target)).toBe(true);
      const urls = [s.body.join(' '), s.explanation].join(' ').match(/https?:\/\/[^\s)]+/g) ?? [];
      urls.forEach((u) => expect(isSafeExampleUrl(u)).toBe(true));
    }
  });

  it('deckt alle Schwierigkeitsstufen und mehrere Themen ab', () => {
    const diffs = new Set(builtInScenarios.map((s) => s.difficulty));
    expect(diffs).toEqual(new Set(['leicht', 'mittel', 'schwer']));
    expect(new Set(builtInScenarios.map((s) => s.topic)).size).toBeGreaterThanOrEqual(10);
  });
});

describe('Wissensartikel', () => {
  it('enthält mindestens 18 Artikel mit eindeutigen IDs', () => {
    expect(articles.length).toBeGreaterThanOrEqual(18);
    expect(new Set(articleIds).size).toBe(articleIds.length);
  });

  it.each(articles.map((a) => [a.id, a] as const))('%s ist vollständig', (_id, article) => {
    const words = articleWordCount(article);
    expect(words).toBeGreaterThanOrEqual(780);
    expect(words).toBeLessThanOrEqual(1400);
    expect(article.summary.length).toBeGreaterThan(40);
    expect(article.checklist.length).toBeGreaterThanOrEqual(4);
    const headings = tableOfContents(parseMarkdown(article.body)).map((h) => h.text);
    expect(headings.length).toBeGreaterThanOrEqual(5);
    expect(headings.some((h) => h.startsWith('Erkennungsmerkmale'))).toBe(true);
    expect(headings.some((h) => h.includes('Beispiel'))).toBe(true);
    expect(headings).toContain('Schutzmaßnahmen');
    expect(headings).toContain('Im Ernstfall');
    if (article.audience === 'it') {
      expect(headings).toContain('Grundlagen');
      expect(headings).toContain('Vertiefung für IT');
    }
    article.relatedArticleIds.forEach((id) => expect(articleIds).toContain(id));
    expect(article.relatedArticleIds).not.toContain(article.id);
    (article.sources ?? []).forEach((src) => expect(src.url).toMatch(/^https:\/\//));
  });

  it('jeder Artikel hat mindestens einen passenden Quizfall', () => {
    for (const a of articles) {
      expect(scenariosForArticle(a.id, builtInScenarios).length, a.id).toBeGreaterThan(0);
    }
  });

  it('enthält keine unverlinkten Platzhalter wie Lorem ipsum', () => {
    for (const a of articles) expect(a.body.toLowerCase()).not.toContain('lorem');
  });
});
