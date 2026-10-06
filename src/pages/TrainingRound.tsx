import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Feedback } from '../components/Feedback';
import { IconAlert, IconArrowLeft, IconArrowRight, IconShield } from '../components/Icons';
import { MailView } from '../components/MailView';
import { Notice, ProgressBar, usePageTitle } from '../components/ui';
import { useApp } from '../state/AppState';
import type { Confidence } from '../state/types';
import type { Classification } from '../types/content';

export default function TrainingRound() {
  const { state, dispatch, getScenario } = useApp();
  const navigate = useNavigate();
  const round = state.round;
  const [confidence, setConfidence] = useState<Confidence | ''>('');
  const [confirmAbort, setConfirmAbort] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  usePageTitle(round ? `Training – Fall ${round.index + 1} von ${round.order.length}` : 'Training');

  const currentId = round?.order[round.index];
  const answer = currentId ? round?.answers[currentId] : undefined;

  useEffect(() => { setConfidence(''); setConfirmAbort(false); }, [currentId]);
  useEffect(() => {
    if (answer) feedbackRef.current?.querySelector<HTMLElement>('#feedback')?.focus();
  }, [answer]);

  if (!round) return <Navigate to="/training" replace />;
  if (round.finished) return <Navigate to="/training/ergebnis" replace />;
  const scenario = currentId ? getScenario(currentId) : undefined;
  if (!scenario) {
    return (
      <div className="page-narrow">
        <Notice kind="error" title="Dieser Fall ist nicht mehr verfügbar">
          <p>Möglicherweise wurde ein eigenes Szenario gelöscht. <Link to="/training">Neue Runde starten</Link></p>
        </Notice>
      </div>
    );
  }

  const total = round.order.length;
  const answeredCount = Object.keys(round.answers).length;
  const isLast = round.index === total - 1;

  const choose = (chosen: Classification) => {
    dispatch({ type: 'answer', scenarioId: scenario.id, chosen, correct: chosen === scenario.classification, confidence: confidence || undefined, now: Date.now() });
  };
  const next = () => (isLast ? finish() : dispatch({ type: 'goTo', index: round.index + 1 }));
  const finish = () => { dispatch({ type: 'finishRound' }); navigate('/training/ergebnis'); };
  const abort = () => { dispatch({ type: 'abortRound' }); navigate('/training'); };

  return (
    <div className="page">
      <header className="page-header">
        <p className="small muted" style={{ marginBottom: 4 }}>
          Training · <span className="mono">{answeredCount}/{total}</span> beantwortet
        </p>
        <h1 tabIndex={-1}>Fall {round.index + 1} von {total}</h1>
        <ProgressBar value={answeredCount} max={total} label="Rundenfortschritt" />
        <nav aria-label="Fälle dieser Runde" style={{ marginTop: 12 }}>
          <ol className="step-nav">
            {round.order.map((id, i) => {
              const a = round.answers[id];
              const status = a ? (a.correct ? 'richtig beantwortet' : 'falsch beantwortet') : 'offen';
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`step-dot${a ? (a.correct ? ' done-correct' : ' done-wrong') : ''}`}
                    aria-current={i === round.index ? 'step' : undefined}
                    aria-label={`Fall ${i + 1}, ${status}`}
                    onClick={() => dispatch({ type: 'goTo', index: i })}
                  >
                    {a ? (a.correct ? '✓' : '✗') : i + 1}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </header>

      <div className="quiz-layout">
        <div className="stack">
          {round.markMode && !answer && (
            <Notice kind="info" title="Hinweise markieren">
              <p>Wählen Sie per Klick oder Tastatur (Tab, dann Enter/Leertaste) die Stellen aus, die Ihnen auffallen. Markierte Stellen sind gelb hinterlegt und mit ✎ gekennzeichnet.</p>
            </Notice>
          )}
          <MailView
            scenario={scenario}
            markMode={round.markMode && !answer}
            marks={round.marks[scenario.id] ?? []}
            onToggleMark={(seg) => dispatch({ type: 'toggleMark', scenarioId: scenario.id, segment: seg })}
            revealMarks={round.markMode && Boolean(answer)}
          />
        </div>

        <div className="stack" ref={feedbackRef}>
          {!answer ? (
            <section className="card" aria-labelledby="entscheidung">
              <h2 id="entscheidung" style={{ marginTop: 0 }}>Wie schätzen Sie diese Nachricht ein?</h2>
              <fieldset style={{ marginBottom: 16 }}>
                <legend>Wie sicher sind Sie? (optional)</legend>
                {([['unsicher', 'Unsicher'], ['eher-sicher', 'Eher sicher'], ['sicher', 'Sehr sicher']] as const).map(([v, l]) => (
                  <label key={v} className="choice">
                    <input type="radio" name="sicherheit" value={v} checked={confidence === v} onChange={() => setConfidence(v)} />
                    {l}
                  </label>
                ))}
              </fieldset>
              <div className="answer-buttons">
                <button type="button" className="btn answer-btn phishing" onClick={() => choose('phishing')}>
                  <IconAlert />Phishing
                </button>
                <button type="button" className="btn answer-btn legitim" onClick={() => choose('legitim')}>
                  <IconShield />Legitim
                </button>
              </div>
            </section>
          ) : (
            <Feedback scenario={scenario} answer={answer} marks={round.marks[scenario.id]} markMode={round.markMode} />
          )}

          <nav className="card row" aria-label="Rundensteuerung">
            <button type="button" className="btn" onClick={() => dispatch({ type: 'goTo', index: round.index - 1 })} disabled={round.index === 0}>
              <IconArrowLeft />Zurück
            </button>
            {answer ? (
              <button type="button" className="btn btn-primary" onClick={next}>
                {isLast ? 'Zur Auswertung' : 'Nächster Fall'}<IconArrowRight />
              </button>
            ) : (
              <button type="button" className="btn" onClick={next}>
                {isLast ? 'Überspringen und auswerten' : 'Überspringen'}<IconArrowRight />
              </button>
            )}
            <span className="spacer" />
            {!isLast && answeredCount > 0 && (
              <button type="button" className="btn btn-ghost" onClick={finish}>Runde jetzt auswerten</button>
            )}
            {!confirmAbort ? (
              <button type="button" className="btn btn-ghost" onClick={() => setConfirmAbort(true)}>Abbrechen</button>
            ) : (
              <div className="row" role="group" aria-label="Abbruch bestätigen">
                <span className="small">Runde wirklich abbrechen? Bereits beantwortete Fälle bleiben in Ihrer Sitzungsstatistik.</span>
                <button type="button" className="btn btn-danger btn-small" onClick={abort}>Ja, abbrechen</button>
                <button type="button" className="btn btn-small" onClick={() => setConfirmAbort(false)}>Weiter üben</button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
