import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IconTarget } from '../components/Icons';
import { Notice, PageHeader } from '../components/ui';
import { getArticle } from '../lib/content';
import { createRound, filterPool, ROUND_LABELS, type RoundFilter, type RoundMode } from '../lib/quiz';
import { useApp } from '../state/AppState';
import { TOPICS, type Difficulty, type TopicId } from '../types/content';

const MODES: RoundMode[] = ['kurz', 'standard', 'voll'];

export default function TrainingSetup() {
  const { state, dispatch, pool } = useApp();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialTopic = params.get('thema');
  const initialMode = params.get('modus');
  const articleId = params.get('artikel') ?? '';
  const article = articleId ? getArticle(articleId) : undefined;

  const [mode, setMode] = useState<RoundMode>(MODES.includes(initialMode as RoundMode) ? (initialMode as RoundMode) : 'standard');
  const [topic, setTopic] = useState<TopicId | ''>(initialTopic && initialTopic in TOPICS ? (initialTopic as TopicId) : '');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
  const [markMode, setMarkMode] = useState(false);

  const filter: RoundFilter = useMemo(
    () => ({ topic: topic || undefined, difficulty: difficulty || undefined, articleId: article ? articleId : undefined }),
    [topic, difficulty, article, articleId],
  );
  const available = filterPool(pool, filter).length;
  const activeRound = state.round && !state.round.finished ? state.round : null;

  const start = (e: FormEvent) => {
    e.preventDefault();
    if (available === 0) return;
    const order = createRound(pool, mode, filter, state.lastOrder);
    dispatch({ type: 'startRound', mode, filter, order, markMode, now: Date.now() });
    navigate('/training/runde');
  };

  return (
    <div className="page-narrow">
      <PageHeader title="Training starten">
        <p>
          Sie sehen nacheinander simulierte Nachrichten und entscheiden: Phishing oder legitim? Es gibt kein Zeitlimit.
          Die Reihenfolge wird bei jedem Start neu gemischt, kein Fall kommt in einer Runde doppelt vor.
        </p>
      </PageHeader>

      {activeRound && (
        <Notice kind="info" title="Sie haben eine laufende Runde">
          <p>
            {Object.keys(activeRound.answers).length} von {activeRound.order.length} Fällen beantwortet.
          </p>
          <div className="row">
            <Link to="/training/runde" className="btn btn-accent">Runde fortsetzen</Link>
            <span className="small muted">Ein Neustart unten ersetzt die laufende Runde.</span>
          </div>
        </Notice>
      )}

      <form className="card stack" onSubmit={start} style={{ marginTop: 20 }} aria-describedby="anzahl-hinweis">
        {article && (
          <Notice kind="info" title="Thematische Runde">
            <p>Nur Fälle, die zum Artikel „{article.title}“ passen. <Link to="/training">Filter entfernen</Link></p>
          </Notice>
        )}
        <fieldset>
          <legend>Rundenlänge</legend>
          {MODES.map((m) => (
            <label key={m} className="choice">
              <input type="radio" name="modus" value={m} checked={mode === m} onChange={() => setMode(m)} />
              {ROUND_LABELS[m]}
            </label>
          ))}
        </fieldset>

        <div className="filters">
          <div className="field">
            <label htmlFor="thema">Thema</label>
            <select id="thema" value={topic} onChange={(e) => setTopic(e.target.value as TopicId | '')}>
              <option value="">Alle Themen</option>
              {Object.entries(TOPICS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="schwierigkeit">Schwierigkeit</label>
            <select id="schwierigkeit" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | '')}>
              <option value="">Alle Stufen</option>
              <option value="leicht">Leicht</option>
              <option value="mittel">Mittel</option>
              <option value="schwer">Schwer</option>
            </select>
          </div>
        </div>

        <label className="choice">
          <input type="checkbox" checked={markMode} onChange={(e) => setMarkMode(e.target.checked)} aria-describedby="markier-hinweis" />
          Modus „Hinweise markieren“ aktivieren
        </label>
        <p id="markier-hinweis" className="hint">
          Optional: Vor Ihrer Antwort markieren Sie verdächtige oder vertrauenswürdige Stellen. Danach sehen Sie, welche davon relevant waren.
        </p>

        <p id="anzahl-hinweis" role="status" className={available === 0 ? 'field-error' : 'muted'}>
          {available === 0
            ? 'Für diese Filterkombination gibt es keine Fälle. Bitte wählen Sie ein anderes Thema oder eine andere Schwierigkeit.'
            : `${available} passende Fälle verfügbar. Ihre Runde enthält ${mode === 'voll' ? available : Math.min(available, mode === 'kurz' ? 5 : 10)} Fälle.`}
        </p>
        <div className="row">
          <button type="submit" className="btn btn-primary" disabled={available === 0}><IconTarget />Runde starten</button>
        </div>
      </form>
    </div>
  );
}
