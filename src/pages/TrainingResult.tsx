import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArticleLinks } from '../components/Feedback';
import { IconTarget } from '../components/Icons';
import { ClassificationBadge, Notice, PageHeader } from '../components/ui';
import { createRound } from '../lib/quiz';
import { useApp } from '../state/AppState';

export default function TrainingResult() {
  const { state, dispatch, getScenario, pool } = useApp();
  const navigate = useNavigate();
  const round = state.round;
  if (!round) return <Navigate to="/training" replace />;

  const answered = round.order.filter((id) => round.answers[id]);
  const correct = answered.filter((id) => round.answers[id].correct);
  const wrong = answered.filter((id) => !round.answers[id].correct);
  const skipped = round.order.length - answered.length;
  const pct = answered.length ? Math.round((correct.length / answered.length) * 100) : 0;

  const retryWrong = () => {
    const order = createRound(pool.filter((s) => wrong.includes(s.id)), 'voll');
    dispatch({ type: 'startRound', mode: 'voll', filter: {}, order, markMode: round.markMode, now: Date.now() });
    navigate('/training/runde');
  };
  const newRound = () => {
    const order = createRound(pool, round.mode, round.filter, state.lastOrder);
    dispatch({ type: 'startRound', mode: round.mode, filter: round.filter, order, markMode: round.markMode, now: Date.now() });
    navigate('/training/runde');
  };

  return (
    <div className="page">
      <PageHeader title="Auswertung der Runde">
        <p className="lead">
          Sie haben <strong>{correct.length} von {answered.length}</strong> beantworteten Fällen richtig eingeordnet
          {answered.length > 0 && <> (<span className="mono">{pct} %</span>)</>}
          {skipped > 0 && `, ${skipped} Fall/Fälle übersprungen`}.
        </p>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={newRound}><IconTarget />Neue Runde mit gleichen Einstellungen</button>
          {wrong.length > 0 && <button type="button" className="btn btn-accent" onClick={retryWrong}>Falsch beantwortete erneut üben ({wrong.length})</button>}
          <Link to="/training" className="btn">Einstellungen ändern</Link>
        </div>
      </PageHeader>

      {answered.length === 0 && (
        <Notice kind="info" title="Keine Antworten in dieser Runde">
          <p>Sie haben alle Fälle übersprungen. Starten Sie eine neue Runde, wenn Sie üben möchten.</p>
        </Notice>
      )}

      <section aria-labelledby="zusammenfassung" className="stack">
        <h2 id="zusammenfassung">Alle Fälle im Überblick</h2>
        {round.order.map((id, i) => {
          const s = getScenario(id);
          const a = round.answers[id];
          if (!s) return null;
          return (
            <article key={id} className={`card ${a ? (a.correct ? 'feedback-correct' : 'feedback-wrong') : ''}`} aria-labelledby={`res-${id}`}>
              <h3 id={`res-${id}`} style={{ marginTop: 0 }}>
                {i + 1}. {s.title}{' '}
                <span className="small muted">– {a ? (a.correct ? '✓ richtig' : '✗ falsch') : 'übersprungen'}</span>
              </h3>
              <p className="row small">
                <span>Ihre Antwort:</span> {a ? <ClassificationBadge value={a.chosen} /> : <span className="badge">keine</span>}
                <span>Richtig:</span> <ClassificationBadge value={s.classification} />
                {a?.confidence && <span className="badge">Ihre Sicherheit: {a.confidence.replace('-', ' ')}</span>}
              </p>
              <p>{s.explanation}</p>
              <div className="row">
                <Link to={`/szenarien/${s.id}`} state={{ fromResult: true }}>Fall erneut ansehen<span className="visually-hidden">: {s.title}</span></Link>
              </div>
              <ArticleLinks scenario={s} />
            </article>
          );
        })}
      </section>
    </div>
  );
}
