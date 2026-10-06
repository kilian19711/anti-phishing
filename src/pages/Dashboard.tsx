import { Link } from 'react-router-dom';
import { IconArrowRight, IconBook, IconTarget } from '../components/Icons';
import { PageHeader, ProgressBar, formatTime } from '../components/ui';
import { articles } from '../lib/content';
import { rate, recentTopics, recommendTopic, statsBy, TOPIC_IDS } from '../lib/stats';
import { useApp } from '../state/AppState';
import { TOPICS } from '../types/content';

export default function Dashboard() {
  const { state, pool } = useApp();
  const history = state.history;
  const correct = history.filter((h) => h.correct).length;
  const quote = rate({ answered: history.length, correct });
  const topicStats = statsBy(history, pool, (s) => s.topic, TOPIC_IDS);
  const recent = recentTopics(history, pool);
  const recommended = recommendTopic(history, pool);

  return (
    <div className="page">
      <PageHeader title="Willkommen bei PhishLab">
        <p className="lead">
          Üben Sie mit vollständig simulierten Nachrichten, verdächtige und echte E-Mails, SMS und Chats sicher zu unterscheiden.
          Nach jeder Entscheidung erfahren Sie, woran Sie es erkennen – und was im Ernstfall zu tun ist.
        </p>
        <div className="row">
          <Link to="/training" className="btn btn-primary"><IconTarget />Training starten</Link>
          <Link to="/wissen" className="btn"><IconBook />Wissen entdecken</Link>
        </div>
      </PageHeader>

      <section aria-labelledby="kennzahlen">
        <h2 id="kennzahlen">Ihre aktuelle Sitzung</h2>
        <div className="grid grid-4">
          <div className="card stat">
            <span className="stat-value">{history.length}</span>
            <span className="stat-label">bearbeitete Übungen</span>
          </div>
          <div className="card stat">
            <span className="stat-value">{quote === null ? '–' : `${quote} %`}</span>
            <span className="stat-label">Trefferquote{quote === null ? ' (noch keine Antworten)' : ` (${correct} von ${history.length} richtig)`}</span>
          </div>
          <div className="card stat">
            <span className="stat-value">{pool.length}</span>
            <span className="stat-label">verfügbare Szenarien</span>
          </div>
          <div className="card stat">
            <span className="stat-value">{articles.length}</span>
            <span className="stat-label">Wissensartikel</span>
          </div>
        </div>
        <p className="small muted" style={{ marginTop: 12 }}>
          {state.persist
            ? 'Dauerhaftes Speichern auf diesem Gerät ist aktiviert. Verwalten oder löschen können Sie die Daten unter „Fortschritt“.'
            : 'Diese Werte liegen nur im Arbeitsspeicher dieses Tabs und verschwinden beim Schließen oder Neuladen.'}
        </p>
      </section>

      <section aria-labelledby="empfehlung" className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h2 id="empfehlung">Nächste Empfehlung</h2>
          <p>
            {history.length === 0
              ? 'Starten Sie mit einer kurzen Runde über alle Themen. Danach schlagen wir Ihnen passende Schwerpunkte vor.'
              : `Thema „${TOPICS[recommended]}“ – hier gibt es für Sie gerade am meisten zu entdecken.`}
          </p>
          <div className="row">
            {history.length === 0 ? (
              <Link to="/training?modus=kurz" className="btn btn-primary">Kurze Runde starten<IconArrowRight /></Link>
            ) : (
              <Link to={`/training?thema=${recommended}`} className="btn btn-accent">Übungen zu „{TOPICS[recommended]}“<IconArrowRight /></Link>
            )}
          </div>
        </div>
        <div className="card">
          <h2>Zuletzt bearbeitete Themen</h2>
          {recent.length === 0 ? (
            <p className="muted">Noch keine Themen bearbeitet. Ihre letzten Themen erscheinen hier, sobald Sie Fälle beantwortet haben.</p>
          ) : (
            <ul>
              {recent.map((t) => (
                <li key={t}>
                  {TOPICS[t]} – zuletzt <span className="mono">{formatTime(topicStats[t].lastAt!)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="themen" style={{ marginTop: 24 }}>
        <h2 id="themen">Themenübersicht</h2>
        <div className="grid grid-3">
          {TOPIC_IDS.map((t) => {
            const s = topicStats[t];
            const r = rate(s);
            return (
              <div key={t} className="card">
                <h3 style={{ marginTop: 0 }}>{TOPICS[t]}</h3>
                <ProgressBar value={s.seen} max={s.total} label={`Fortschritt ${TOPICS[t]}`} />
                <p className="small muted" style={{ margin: '8px 0' }}>
                  {s.seen} von {s.total} Fällen bearbeitet
                  {r !== null && ` · ${r} % richtig`}
                  {s.lastAt ? ` · zuletzt ${formatTime(s.lastAt)}` : ' · noch nicht bearbeitet'}
                </p>
                <Link to={`/training?thema=${t}`}>Thema üben<span className="visually-hidden">: {TOPICS[t]}</span></Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
