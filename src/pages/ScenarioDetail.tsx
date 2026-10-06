import { Link, useLocation, useParams } from 'react-router-dom';
import { ArticleLinks, HintList } from '../components/Feedback';
import { MailView } from '../components/MailView';
import { Breadcrumbs, ClassificationBadge, DifficultyBadge, Notice, usePageTitle } from '../components/ui';
import { useApp } from '../state/AppState';
import { TOPICS } from '../types/content';
import NotFound from './NotFound';

export default function ScenarioDetail() {
  const { id = '' } = useParams();
  const { getScenario, state } = useApp();
  const location = useLocation();
  const s = getScenario(id);
  usePageTitle(s?.title ?? 'Szenario nicht gefunden');
  if (!s) return <NotFound what="Dieses Szenario" />;
  const fromResult = Boolean((location.state as { fromResult?: boolean } | null)?.fromResult);
  const isCustom = state.customScenarios.some((c) => c.id === s.id);

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: '/', label: 'Dashboard' }, { to: '/szenarien', label: 'Szenarien' }, { label: s.title }]} />
      {fromResult && state.round?.finished && <Notice kind="info"><p><Link to="/training/ergebnis">Zurück zur Auswertung</Link></p></Notice>}
      <h1 tabIndex={-1}>{s.title}</h1>
      <div className="row small" style={{ marginBottom: 16 }}>
        <ClassificationBadge value={s.classification} />
        <DifficultyBadge value={s.difficulty} />
        <span className="badge">{TOPICS[s.topic]}</span>
        {isCustom && <span className="badge badge-sim">Eigenes Szenario (lokal)</span>}
      </div>
      <div className="quiz-layout">
        <MailView scenario={s} answered />
        <div className="stack">
          <section className="card">
            <h2 style={{ marginTop: 0 }}>Lernziel</h2>
            <p>{s.learningGoal}</p>
            <h2>Musterlösung</h2>
            <p>Diese Nachricht ist <ClassificationBadge value={s.classification} />. {s.explanation}</p>
            <h3>Relevante Hinweise</h3>
            <HintList scenario={s} />
            <h3>Warum nicht die andere Einordnung?</h3>
            <p>{s.counterArguments}</p>
            <h3>Handlungsempfehlung</h3>
            <p>{s.safeAction}</p>
            <h3>Nach einem Fehlklick</h3>
            <p>{s.afterMistake}</p>
          </section>
          <section className="card">
            <h2 style={{ marginTop: 0 }}>Passende Wissensartikel</h2>
            <ArticleLinks scenario={s} prefix="Artikel" />
            <div className="row" style={{ marginTop: 12 }}>
              <Link to={`/training?thema=${s.topic}`} className="btn btn-primary">Training zum Thema „{TOPICS[s.topic]}“</Link>
              {isCustom && <Link to={`/editor?id=${s.id}`} className="btn">Im Editor bearbeiten</Link>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
