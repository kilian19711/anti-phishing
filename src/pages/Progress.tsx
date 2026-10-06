import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconDownload, IconLock, IconTrash } from '../components/Icons';
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
  const { state, dispatch, pool, enablePersist, disablePersistAndDelete, exportData } = useApp();
  const [message, setMessage] = useState<{ kind: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [confirm, setConfirm] = useState<'delete' | 'reset' | null>(null);
  const [showData, setShowData] = useState(false);
  const byTopic = statsBy(state.history, pool, (s) => s.topic, TOPIC_IDS);
  const byDiff = statsBy(state.history, pool, (s) => s.difficulty, DIFFICULTY_IDS);

  const activate = () => {
    const ok = enablePersist();
    setMessage(ok ? { kind: 'success', text: 'Dauerhaftes Speichern ist aktiviert. Ihr Fortschritt wird ab jetzt in diesem Browser auf diesem Gerät gespeichert.' }
      : { kind: 'error', text: 'Speichern ist in diesem Browser nicht möglich (z. B. privater Modus oder blockierter Speicher). Ihr Fortschritt bleibt nur für diese Sitzung erhalten.' });
  };

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
        <h2 id="speichern" style={{ marginTop: 0 }}><IconLock width={20} height={20} style={{ verticalAlign: 'middle' }} /> Speichern auf diesem Gerät</h2>
        {message && <div style={{ marginBottom: 12 }}><Notice kind={message.kind} role="status"><p>{message.text}</p></Notice></div>}
        {!state.storageAvailable && (
          <Notice kind="warning" title="Browserspeicher nicht verfügbar"><p>Ihr Browser erlaubt keine lokale Speicherung. PhishLab funktioniert trotzdem vollständig – der Fortschritt gilt dann nur für diese Sitzung.</p></Notice>
        )}
        {state.storageAvailable && !state.persist && (
          <>
            <p><strong>Standard: nichts wird gespeichert.</strong> Ihr Fortschritt liegt nur im Arbeitsspeicher dieses Tabs und ist nach dem Schließen oder Neuladen weg.</p>
            <p>Wenn Sie möchten, können Sie das dauerhafte Speichern aktivieren. Dann legt PhishLab im <em>lokalen Speicher (localStorage) dieses Browsers</em> ab:</p>
            <ul>
              <li>je beantworteter Übung: Szenario-ID, Ihre Antwort, ob sie richtig war, und den Zeitpunkt</li>
              <li>Ihre im Editor erstellten eigenen Szenarien</li>
            </ul>
            <p>Es werden keine Namen, keine E-Mail-Adressen und keine Gerätekennungen gespeichert, und nichts wird an einen Server übertragen. Sie können die Daten jederzeit hier ansehen, exportieren und vollständig löschen.</p>
            <button type="button" className="btn btn-accent" onClick={activate}>Dauerhaftes Speichern aktivieren</button>
          </>
        )}
        {state.persist && (
          <>
            <p><strong>Dauerhaftes Speichern ist aktiv.</strong> Gespeichert sind {state.history.length} Antworten und {state.customScenarios.length} eigene Szenarien – nur in diesem Browser auf diesem Gerät.</p>
            <div className="row">
              <button type="button" className="btn" aria-expanded={showData} aria-controls="gespeicherte-daten" onClick={() => setShowData((v) => !v)}>{showData ? 'Daten ausblenden' : 'Gespeicherte Daten anzeigen'}</button>
              <button type="button" className="btn" onClick={() => downloadText(`phishlab-daten-${new Date().toISOString().slice(0, 10)}.json`, exportData())}><IconDownload />Als JSON exportieren</button>
              <button type="button" className="btn btn-danger" onClick={() => setConfirm('delete')}><IconTrash />Gespeicherte Daten löschen</button>
            </div>
            {showData && <pre id="gespeicherte-daten" className="card mono small" style={{ overflowX: 'auto', maxHeight: 320, marginTop: 12 }}>{exportData()}</pre>}
          </>
        )}
        {confirm === 'delete' && (
          <div style={{ marginTop: 12 }}>
            <Notice kind="warning" title="Wirklich löschen?">
              <p>Alle auf diesem Gerät gespeicherten PhishLab-Daten werden entfernt und das dauerhafte Speichern deaktiviert. Ihr Fortschritt dieser Sitzung bleibt bis zum Schließen des Tabs sichtbar.</p>
              <div className="row">
                <button type="button" className="btn btn-danger" onClick={() => { disablePersistAndDelete(); setConfirm(null); setMessage({ kind: 'success', text: 'Die gespeicherten Daten wurden aus diesem Browser gelöscht.' }); }}>Ja, endgültig löschen</button>
                <button type="button" className="btn" onClick={() => setConfirm(null)}>Abbrechen</button>
              </div>
            </Notice>
          </div>
        )}
      </section>

      {state.history.length > 0 && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0 }}>Sitzungsfortschritt zurücksetzen</h2>
          {confirm !== 'reset' ? (
            <button type="button" className="btn" onClick={() => setConfirm('reset')}>Alle Antworten zurücksetzen</button>
          ) : (
            <div className="row">
              <span>Alle Antworten verwerfen{state.persist ? ' (auch die gespeicherten)' : ''}?</span>
              <button type="button" className="btn btn-danger" onClick={() => { dispatch({ type: 'clearHistory' }); setConfirm(null); setMessage({ kind: 'success', text: 'Ihr Fortschritt wurde zurückgesetzt.' }); }}>Ja, zurücksetzen</button>
              <button type="button" className="btn" onClick={() => setConfirm(null)}>Abbrechen</button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
