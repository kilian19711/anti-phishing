import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ClassificationBadge, DifficultyBadge, PageHeader } from '../components/ui';
import { useApp } from '../state/AppState';
import { MESSAGE_TYPES, TOPICS, type Scenario } from '../types/content';

const CHANNEL = { email: 'E-Mail', sms: 'SMS', messenger: 'Messenger' } as const;

export default function Scenarios() {
  const { pool, state } = useApp();
  const [params, setParams] = useSearchParams();
  const f = {
    thema: params.get('thema') ?? '',
    schwierigkeit: params.get('schwierigkeit') ?? '',
    typ: params.get('typ') ?? '',
    kanal: params.get('kanal') ?? '',
    ergebnis: params.get('ergebnis') ?? '',
  };
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(params);
    if (v) n.set(k, v); else n.delete(k);
    setParams(n, { replace: true });
  };
  const custom = new Set(state.customScenarios.map((s) => s.id));
  const results = useMemo(
    () => pool.filter((s: Scenario) =>
      (!f.thema || s.topic === f.thema) && (!f.schwierigkeit || s.difficulty === f.schwierigkeit) &&
      (!f.typ || s.messageType === f.typ) && (!f.kanal || s.channel === f.kanal) && (!f.ergebnis || s.classification === f.ergebnis)),
    [pool, f.thema, f.schwierigkeit, f.typ, f.kanal, f.ergebnis],
  );
  const qs = new URLSearchParams();
  if (f.thema) qs.set('thema', f.thema);

  return (
    <div className="page">
      <PageHeader title="Szenario-Bibliothek">
        <p>Alle {pool.length} Übungsfälle mit Musterlösung, Hinweisen und passenden Artikeln. Achtung: Hier sehen Sie die Lösungen direkt – zum Üben nutzen Sie besser das Training.</p>
      </PageHeader>
      <form className="card filters" onSubmit={(e) => e.preventDefault()} aria-label="Szenarien filtern">
        <div className="field"><label htmlFor="f-thema">Thema</label>
          <select id="f-thema" value={f.thema} onChange={(e) => set('thema', e.target.value)}><option value="">Alle</option>{Object.entries(TOPICS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        <div className="field"><label htmlFor="f-diff">Schwierigkeit</label>
          <select id="f-diff" value={f.schwierigkeit} onChange={(e) => set('schwierigkeit', e.target.value)}><option value="">Alle</option><option value="leicht">Leicht</option><option value="mittel">Mittel</option><option value="schwer">Schwer</option></select></div>
        <div className="field"><label htmlFor="f-typ">Nachrichtentyp</label>
          <select id="f-typ" value={f.typ} onChange={(e) => set('typ', e.target.value)}><option value="">Alle</option>{Object.entries(MESSAGE_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        <div className="field"><label htmlFor="f-kanal">Kanal</label>
          <select id="f-kanal" value={f.kanal} onChange={(e) => set('kanal', e.target.value)}><option value="">Alle</option>{Object.entries(CHANNEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
        <div className="field"><label htmlFor="f-erg">Ergebnis</label>
          <select id="f-erg" value={f.ergebnis} onChange={(e) => set('ergebnis', e.target.value)}><option value="">Alle</option><option value="phishing">Phishing</option><option value="legitim">Legitim</option></select></div>
      </form>
      <div className="row" style={{ margin: '12px 0' }}>
        <p role="status" className="muted" style={{ margin: 0 }}>{results.length} Szenarien gefunden.</p>
        <span className="spacer" />
        {f.thema && <Link className="btn btn-small" to={`/training?${qs}`}>Training zu diesem Thema</Link>}
        {params.toString() && <button type="button" className="btn btn-small btn-ghost" onClick={() => setParams({}, { replace: true })}>Filter zurücksetzen</button>}
      </div>
      {results.length === 0 ? (
        <div className="card"><p style={{ margin: 0 }}>Für diese Filterkombination gibt es keine Szenarien. Setzen Sie einen Filter zurück.</p></div>
      ) : (
        <ul className="grid grid-3" style={{ listStyle: 'none', padding: 0 }}>
          {results.map((s) => (
            <li key={s.id} style={{ margin: 0 }}>
              <Link to={`/szenarien/${s.id}`} className="card-link">
                <div className="card">
                  <div className="row small" style={{ marginBottom: 8 }}>
                    <ClassificationBadge value={s.classification} />
                    <DifficultyBadge value={s.difficulty} />
                    {custom.has(s.id) && <span className="badge badge-sim">Eigenes Szenario</span>}
                  </div>
                  <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>{s.title}</h2>
                  <p className="small muted" style={{ margin: 0 }}>{TOPICS[s.topic]} · {CHANNEL[s.channel]} · {MESSAGE_TYPES[s.messageType]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
