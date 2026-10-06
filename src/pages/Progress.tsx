import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconLock } from '../components/Icons';
import { Notice, PageHeader, ProgressBar } from '../components/ui';
import { DIFFICULTY_IDS, rate, statsBy, TOPIC_IDS } from '../lib/stats';
import { useApp } from '../state/AppState';
import { TOPICS } from '../types/content';

export function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function Progress() {
  const { state, dispatch, pool } = useApp();
  const [message, setMessage] = useState<{ kind: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [confirm, setConfirm] = useState<'reset' | null>(null);
  const byTopic = statsBy(state.history, pool, (s) => s.topic, TOPIC_IDS);
  const byDiff = statsBy(state.history, pool, (s) => s.difficulty, DIFFICULTY_IDS);


  return (
    <div className="page">
      <PageHeader title="Fortschritt">
        <p>Ihr Lernstand nach Thema und Schwierigkeit – nur für Sie sichtbar, ohne Ranglisten, Personenprofile oder Bewertungen Ihres Unternehmens.</p>
      </PageHeader>

      {state.history.length === 0 ? (
        <Notice kind="info" title="Noch keine Ergebnisse">
          <p>Sobald Sie Übungen beantworten, sehen Sie hier Ihren Fortschritt.</p>
          <Link to="/training" className="btn btn-primary">Training starten</Link>
        </Notice>
      ) : (
        <div className="grid grid-2">
          <section className="card" aria-labelledby="nach-thema">
            <h2 id="nach-thema">Nach Thema</h2>
            <table className="result-table">
              <thead><tr><th scope="col">Thema</th><th scope="col">Bearbeitet</th><th scope="col">Richtig</th></tr></thead>
              <tbody>
                {TOPIC_IDS.map((t) => (
                  <tr key={t}>
                    <th scope="row" style={{ fontWeight: 500 }}>{TOPICS[t]}<ProgressBar value={byTopic[t].seen} max={byTopic[t].total} label={`${TOPICS[t]} bearbeitet`} /></th>
                    <td className="mono">{byTopic[t].seen}/{byTopic[t].total}</td>
                    <td className="mono">{rate(byTopic[t]) === null ? '–' : `${rate(byTopic[t])} %`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="card" aria-labelledby="nach-stufe">
            <h2 id="nach-stufe">Nach Schwierigkeit</h2>
            <table className="result-table">
              <thead><tr><th scope="col">Stufe</th><th scope="col">Antworten</th><th scope="col">Richtig</th></tr></thead>
              <tbody>
                {DIFFICULTY_IDS.map((d) => (
                  <tr key={d}><th scope="row" style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d}</th><td className="mono">{byDiff[d].answered}</td><td className="mono">{rate(byDiff[d]) === null ? '–' : `${rate(byDiff[d])} %`}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="small muted">Mehrfach beantwortete Fälle zählen bei „Antworten“ mehrfach.</p>
          </section>
        </div>
      )}

      <section className="card" aria-labelledby="speichern" style={{ marginTop: 24 }}>
        <h2 id="speichern" style={{ marginTop: 0 }}><IconLock width={20} height={20} style={{ verticalAlign: 'middle' }} /> Was wird gespeichert?</h2>
        {message && <div style={{ marginBottom: 12 }}><Notice kind={message.kind} role="status"><p>{message.text}</p></Notice></div>}
        <p><strong>Nichts dauerhaft.</strong> Ihr Fortschritt liegt nur im Arbeitsspeicher dieses Browser-Tabs. Beim Neuladen oder Schließen der Seite beginnt alles wieder bei null – so kann jede Person am selben Gerät neu üben.</p>
        <p className="small muted" style={{ marginBottom: 0 }}>Es werden keine Daten im Browser gespeichert und nichts an einen Server übertragen.</p>
      </section>

      {state.history.length > 0 && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0 }}>Sitzungsfortschritt zurücksetzen</h2>
          {confirm !== 'reset' ? (
            <button type="button" className="btn" onClick={() => setConfirm('reset')}>Alle Antworten zurücksetzen</button>
          ) : (
            <div className="row">
              <span>Alle Antworten dieser Sitzung verwerfen?</span>
              <button type="button" className="btn btn-danger" onClick={() => { dispatch({ type: 'clearHistory' }); setConfirm(null); setMessage({ kind: 'success', text: 'Ihr Fortschritt wurde zurückgesetzt.' }); }}>Ja, zurücksetzen</button>
              <button type="button" className="btn" onClick={() => setConfirm(null)}>Abbrechen</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
