import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { articleReadingMinutes, articles, scenariosForArticle } from '../lib/content';
import { normalize } from '../lib/text';
import { useApp } from '../state/AppState';

const CATEGORIES = Array.from(new Set(articles.map((a) => a.category)));
const LEVEL = { leicht: 'Einstieg', mittel: 'Fortgeschritten', schwer: 'Vertiefung' } as const;

export default function Knowledge() {
  const { pool } = useApp();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const category = params.get('kategorie') ?? '';
  const audience = params.get('zielgruppe') ?? '';

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter((a) =>
      (!category || a.category === category) &&
      (!audience || a.audience === audience) &&
      (!q || normalize([a.title, a.summary, a.tags.join(' '), a.body].join(' ')).includes(q)),
    );
  }, [query, category, audience]);

  return (
    <div className="page">
      <PageHeader title="Wissen">
        <p>{articles.length} ausführliche Ratgeber – von den Grundlagen bis zur Vertiefung für IT-Fachkräfte. Jeder Artikel enthält Beispiele, Checklisten und passende Übungen.</p>
      </PageHeader>
      <form className="card filters" role="search" onSubmit={(e) => e.preventDefault()} aria-label="Artikel durchsuchen und filtern">
        <div className="field">
          <label htmlFor="suche">Suche</label>
          <input id="suche" type="search" value={query} placeholder="z. B. DMARC, QR-Code, Rechnung" onChange={(e) => { setQuery(e.target.value); setParam('q', e.target.value); }} />
        </div>
        <div className="field">
          <label htmlFor="kategorie">Thema</label>
          <select id="kategorie" value={category} onChange={(e) => setParam('kategorie', e.target.value)}>
            <option value="">Alle Themen</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="zielgruppe">Zielgruppe</label>
          <select id="zielgruppe" value={audience} onChange={(e) => setParam('zielgruppe', e.target.value)}>
            <option value="">Alle</option>
            <option value="alle">Für alle Mitarbeitenden</option>
            <option value="it">Mit Vertiefung für IT</option>
          </select>
        </div>
      </form>
      <p role="status" className="muted" style={{ marginTop: 12 }}>{results.length} {results.length === 1 ? 'Artikel' : 'Artikel'} gefunden.</p>
      {results.length === 0 ? (
        <div className="card">
          <p>Zu Ihrer Suche passt kein Artikel. Versuchen Sie einen allgemeineren Begriff wie „Link“ oder „Passwort“.</p>
          <button type="button" className="btn" onClick={() => { setQuery(''); setParams({}, { replace: true }); }}>Suche und Filter zurücksetzen</button>
        </div>
      ) : (
        <ul className="grid grid-2" style={{ listStyle: 'none', padding: 0 }}>
          {results.map((a) => (
            <li key={a.id} style={{ margin: 0 }}>
              <Link to={`/wissen/${a.id}`} className="card-link">
                <div className="card">
                  <div className="row small" style={{ marginBottom: 8 }}>
                    <span className="badge badge-brand">{a.category}</span>
                    <span className="badge">{LEVEL[a.level]}</span>
                    {a.audience === 'it' && <span className="badge">Mit IT-Vertiefung</span>}
                  </div>
                  <h2 style={{ marginTop: 0, fontSize: '1.12rem' }}>{a.title}</h2>
                  <p className="muted small">{a.summary}</p>
                  <p className="small muted" style={{ margin: 0 }}>
                    <span className="mono">{articleReadingMinutes(a)} Min.</span> Lesezeit · {scenariosForArticle(a.id, pool).length} passende Übungen
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
