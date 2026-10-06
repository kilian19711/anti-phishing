import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IconArrowRight, IconCheck, IconTarget } from '../components/Icons';
import { Markdown } from '../components/Markdown';
import { Breadcrumbs, ClassificationBadge, Notice, usePageTitle } from '../components/ui';
import { articleReadingMinutes, articleWordCount, getArticle, relatedArticles, scenariosForArticle } from '../lib/content';
import { parseMarkdown, tableOfContents } from '../lib/markdown';
import { useApp } from '../state/AppState';
import NotFound from './NotFound';

export default function ArticlePage() {
  const { id = '' } = useParams();
  const article = getArticle(id);
  const { state, pool } = useApp();
  const location = useLocation();
  const blocks = useMemo(() => (article ? parseMarkdown(article.body) : []), [article]);
  usePageTitle(article?.title ?? 'Artikel nicht gefunden');
  if (!article) return <NotFound what="Dieser Artikel" />;

  const toc = tableOfContents(blocks);
  const cases = scenariosForArticle(article.id, pool);
  const activeRound = state.round && !state.round.finished;
  const fromQuiz = Boolean((location.state as { fromQuiz?: boolean } | null)?.fromQuiz);

  return (
    <div className="page">
      <Breadcrumbs items={[{ to: '/', label: 'Dashboard' }, { to: '/wissen', label: 'Wissen' }, { label: article.title }]} />
      {activeRound && (
        <Notice kind="info">
          <p>{fromQuiz ? 'Sie kommen aus einer laufenden Trainingsrunde.' : 'Sie haben eine laufende Trainingsrunde.'} <Link to="/training/runde">Zurück zum Quiz</Link></p>
        </Notice>
      )}
      <div className="article-layout" style={{ marginTop: 16 }}>
        <article className="article-body" aria-labelledby="artikel-titel">
          <header>
            <div className="row small" style={{ marginBottom: 8 }}>
              <span className="badge badge-brand">{article.category}</span>
              {article.audience === 'it' && <span className="badge">Mit Vertiefung für IT</span>}
              <span className="badge"><span className="mono">{articleReadingMinutes(article)} Min.</span>&nbsp;Lesezeit · {articleWordCount(article)} Wörter</span>
            </div>
            <h1 id="artikel-titel" tabIndex={-1}>{article.title}</h1>
            <div className="card" style={{ marginBottom: 20 }}>
              <h2 style={{ marginTop: 0, border: 0, paddingTop: 0, fontSize: '1.05rem' }}>Kurz zusammengefasst</h2>
              <p style={{ margin: 0 }}>{article.summary}</p>
            </div>
          </header>
          <Markdown blocks={blocks} />
          <section aria-labelledby="checkliste">
            <h2 id="checkliste">Checkliste</h2>
            <ul className="checklist">
              {article.checklist.map((c) => <li key={c}><IconCheck />{c}</li>)}
            </ul>
          </section>
          {article.sources && article.sources.length > 0 && (
            <section aria-labelledby="quellen">
              <h2 id="quellen">Zusatzmaterial (externe Quellen)</h2>
              <p className="small muted">Externe, offizielle Quellen zum Weiterlesen. Diese Links verlassen PhishLab und öffnen sich in einem neuen Tab.</p>
              <ul>
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}<span className="visually-hidden"> (externer Link, neuer Tab)</span></a>
                    <span className="small muted"> – {s.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section aria-labelledby="ueben" className="card" style={{ marginTop: 28 }}>
            <h2 id="ueben" style={{ marginTop: 0, border: 0, paddingTop: 0 }}>Passende Quizfälle</h2>
            <p>{cases.length} Übungen sind mit diesem Artikel verknüpft.</p>
            <div className="row" style={{ marginBottom: 12 }}>
              <Link to={`/training?artikel=${article.id}`} className="btn btn-primary"><IconTarget />Quiz zu diesem Thema starten</Link>
            </div>
            <ul>
              {cases.map((s) => (
                <li key={s.id}>
                  <Link to={`/szenarien/${s.id}`}>{s.title}</Link>{' '}
                  <span className="small muted">({s.difficulty})</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="verwandt">
            <h2 id="verwandt">Weiterlesen</h2>
            <ul>
              {relatedArticles(article).map((r) => (
                <li key={r.id}><Link to={`/wissen/${r.id}`}>{r.title}</Link> <span className="small muted">– {r.summary}</span></li>
              ))}
            </ul>
          </section>
        </article>
        <aside className="toc card" aria-labelledby="inhalt-titel">
          <h2 id="inhalt-titel" style={{ marginTop: 0, fontSize: '1rem' }}>Inhalt</h2>
          <nav aria-label="Inhaltsübersicht">
            <ol>
              {toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>)}
              <li><a href="#checkliste">Checkliste</a></li>
              <li><a href="#ueben">Passende Quizfälle</a></li>
            </ol>
          </nav>
          <p className="small" style={{ marginTop: 12, marginBottom: 0 }}>
            <Link to={`/training?artikel=${article.id}`}>Thema üben <IconArrowRight width={14} height={14} style={{ verticalAlign: 'middle' }} /></Link>
          </p>
        </aside>
      </div>
      <p style={{ marginTop: 24 }}><ClassificationBadge value="phishing" /> und <ClassificationBadge value="legitim" /> – alle Beispiele in diesem Artikel sind erfunden.</p>
    </div>
  );
}
