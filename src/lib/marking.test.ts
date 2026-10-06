import { describe, expect, it } from 'vitest';
import { builtInScenarios } from './content';
import { allSegments, evaluateMarks, hintsForSegment, registeredDomain } from './marking';

describe('Hinweise markieren', () => {
  it('jeder Hinweis ist mindestens einer markierbaren Stelle zugeordnet', () => {
    for (const s of builtInScenarios) {
      const segs = allSegments(s);
      for (const h of s.hints) {
        const matched = segs.some((seg) => hintsForSegment(s, seg).includes(h));
        expect(matched, `${s.id}: ${h.text}`).toBe(true);
      }
    }
  });

  it('bewertet gefundene, übersehene und zusätzliche Markierungen', () => {
    const s = builtInScenarios.find((x) => x.id === 'sc-001')!;
    const segs = allSegments(s);
    const kartenSatz = segs.find((x) => x.text.includes('Kreditkartendaten'))!;
    const res = evaluateMarks(s, [kartenSatz.id, 'sender']);
    expect(res.found.some((h) => h.excerpt === 'Kreditkartendaten zur Verifizierung')).toBe(true);
    expect(res.extraSegments.map((x) => x.id)).toContain('sender');
    expect(res.missed.length).toBe(s.hints.length - res.found.length);
  });

  it('liest die registrierte Domain von rechts', () => {
    expect(registeredDomain('https://cloudshare-docs.example.login-sso.example/auth')).toBe('login-sso.example');
    expect(registeredDomain('kaputt')).toBe('');
  });
});
