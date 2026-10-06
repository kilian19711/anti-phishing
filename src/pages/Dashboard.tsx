import { Link } from 'react-router-dom';
import { IconArrowRight, IconBook, IconTarget } from '../components/Icons';
import { ProgressBar, formatTime, usePageTitle } from '../components/ui';
import { articles } from '../lib/content';
import { rate, recentTopics, recommendTopic, statsBy, TOPIC_IDS } from '../lib/stats';
import { useApp } from '../state/AppState';
import { TOPICS } from '../types/content';

export default function Dashboard() {
  const { state, pool } = useApp();
  usePageTitle('Dashboard');
  const history = state.history;
  const correct = history.filter((h) => h.correct).length;
  const quote = rate({ answered: history.length, correct });
  const topicStats = statsBy(history, pool, (s) => s.topic, TOPIC_IDS);
  const recent = recentTopics(history, pool);
  const recommended = recommendTopic(history, pool);

  return (
    <div className="page">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <span className="eyebrow">PhishLab · Ausbildungsprojekt bei L-mobile</span>
          <h1 id="hero-title" tabIndex={-1}>Phishing erkennen. <span className="grad">Sicher handeln.</span></h1>
          <p className="lead">
            Üben Sie mit vollständig simulierten E-Mails, SMS und Chats, verdächtige und echte Nachrichten zu unterscheiden.
            Nach jeder Entscheidung erfahren Sie, woran Sie es erkennen – und was im Ernstfall zu tun ist.
          </p>
          <div className="row">
            <Link to="/training" className="btn btn-primary"><IconTarget />Training starten</Link>
            <Link to="/wissen" className="btn"><IconBook />Wissen entdecken</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hv-card hv-1"><div className="hv-from"><span className="hv-dot" style={{ background: '#1f4d99' }}>IT</span>IT-Betrieb<span className="hv-tag" style={{ background: '#dcf7e3', color: '#11713a' }}>Legitim</span></div><div className="hv-sub">Wartung Dateiserver: Samstag 06–10 Uhr</div></div>
          <div className="hv-card hv-2"><div className="hv-from"><span className="hv-dot" style={{ background: '#9a430a' }}>PZ</span>Paketdienst Zustellung<span className="hv-tag" style={{ background: '#ffe1e1', color: '#b42318' }}>Phishing</span></div><div className="hv-sub">Ihr Paket konnte nicht zugestellt werden – Gebühr offen</div></div>
          <div className="hv-card hv-3"><div className="hv-from"><span className="hv-dot" style={{ background: '#5a3fa8' }}>?</span>Geschäftsführung<span className="hv-tag" style={{ background: '#eceff4', color: '#3a4152' }}>Ihre Einschätzung?</span></div><div className="hv-sub">Vertraulich – kurze Erledigung</div></div>
        </div>
      </section>

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
          {'Diese Werte gelten nur für diese Sitzung. Beim Neuladen der Seite startet alles wieder bei null.'}
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
