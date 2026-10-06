import { Link } from 'react-router-dom';
import { getArticle } from '../lib/content';
import { evaluateMarks } from '../lib/marking';
import type { AnswerRecord } from '../state/types';
import type { Scenario } from '../types/content';
import { IconArrowRight, IconCheckCircle, IconXCircle } from './Icons';
import { ClassificationBadge, SignalBadge } from './ui';

const LOCATION_LABEL = { sender: 'Absender', subject: 'Betreff', body: 'Text', link: 'Link', attachment: 'Anhang' } as const;

export function HintList({ scenario }: { scenario: Scenario }) {
  return (
    <ul className="hint-list">
      {scenario.hints.map((h, i) => (
        <li key={i}>
          <SignalBadge value={h.signal} />
          <div>
            <span className="small muted">{LOCATION_LABEL[h.location]}{h.excerpt ? ': ' : ''}</span>
            {h.excerpt && <span className="hint-excerpt">„{h.excerpt}“</span>}
            <div>{h.text}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ArticleLinks({ scenario, prefix = 'Mehr dazu' }: { scenario: Scenario; prefix?: string }) {
  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {scenario.articleIds.map((id) => {
        const a = getArticle(id);
        if (!a) return null;
        return (
          <li key={id} style={{ marginTop: 6 }}>
            <Link to={`/wissen/${id}`} state={{ fromQuiz: true }}>
              {prefix}: {a.title} <IconArrowRight width={16} height={16} style={{ verticalAlign: 'middle' }} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Feedback({ scenario, answer, marks, markMode }: { scenario: Scenario; answer: AnswerRecord; marks?: string[]; markMode?: boolean }) {
  const evaluation = markMode ? evaluateMarks(scenario, marks ?? []) : null;
  return (
    <section className={`card ${answer.correct ? 'feedback-correct' : 'feedback-wrong'}`} aria-labelledby="feedback-title" tabIndex={-1} id="feedback">
      <h2 className="feedback-title" id="feedback-title">
        {answer.correct ? <IconCheckCircle /> : <IconXCircle />}
        {answer.correct ? 'Richtig eingeordnet' : 'Nicht richtig eingeordnet'}
      </h2>
      <p className="row">
        <span>Ihre Antwort:</span> <ClassificationBadge value={answer.chosen} />
        <span>Richtige Einordnung:</span> <ClassificationBadge value={scenario.classification} />
      </p>
      <h3>Warum?</h3>
      <p>{scenario.explanation}</p>
      <h3>Konkrete Hinweise</h3>
      <HintList scenario={scenario} />
      <h3>Warum nicht {scenario.classification === 'phishing' ? '„legitim“' : '„Phishing“'}?</h3>
      <p>{scenario.counterArguments}</p>
      <h3>Sichere nächste Handlung</h3>
      <p>{scenario.safeAction}</p>
      {!answer.correct && (
        <>
          <h3>Falls Sie in der Realität so gehandelt hätten</h3>
          <p>{scenario.afterMistake}</p>
        </>
      )}
      {evaluation && (
        <>
          <h3>Ihre Markierungen</h3>
          <p>
            Sie haben {evaluation.found.length} von {scenario.hints.length} relevanten Stellen gefunden
            {evaluation.extraSegments.length > 0 && ` und ${evaluation.extraSegments.length} weitere Stelle(n) markiert, die hier keine besondere Rolle spielen`}.
            {' '}In der Nachricht sind Ihre Markierungen jetzt farbig und mit Unterstreichung ausgewertet: rot = Warnsignal, grün = spricht für Echtheit, grau gestrichelt = allein kein Beweis oder nicht relevant.
          </p>
          {evaluation.missed.length > 0 && (
            <>
              <p className="small muted">Übersehene Hinweise:</p>
              <ul>{evaluation.missed.map((h, i) => <li key={i}>{h.text}</li>)}</ul>
            </>
          )}
        </>
      )}
      <h3>Weiterlernen</h3>
      <ArticleLinks scenario={scenario} />
    </section>
  );
}
