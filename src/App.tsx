import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import TrainingSetup from './pages/TrainingSetup';
import TrainingRound from './pages/TrainingRound';
import TrainingResult from './pages/TrainingResult';
import Knowledge from './pages/Knowledge';
import ArticlePage from './pages/ArticlePage';
import Scenarios from './pages/Scenarios';
import ScenarioDetail from './pages/ScenarioDetail';
import Progress from './pages/Progress';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import About from './pages/About';
import NotFound from './pages/NotFound';

const Editor = lazy(() => import('./pages/Editor'));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<p role="status">Editor wird geladen …</p>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/training" element={<TrainingSetup />} />
          <Route path="/training/runde" element={<TrainingRound />} />
          <Route path="/training/ergebnis" element={<TrainingResult />} />
          <Route path="/wissen" element={<Knowledge />} />
          <Route path="/wissen/:id" element={<ArticlePage />} />
          <Route path="/szenarien" element={<Scenarios />} />
          <Route path="/szenarien/:id" element={<ScenarioDetail />} />
          <Route path="/fortschritt" element={<Progress />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/datenschutz" element={<Privacy />} />
          <Route path="/ueber" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
