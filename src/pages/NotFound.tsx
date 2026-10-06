import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui';

export default function NotFound({ what = 'Diese Seite' }: { what?: string }) {
  return (
    <div className="page-narrow">
      <PageHeader title="Seite nicht gefunden">
        <p>{what} existiert nicht oder wurde verschoben. Vielleicht hilft Ihnen einer dieser Wege weiter:</p>
      </PageHeader>
      <div className="row">
        <Link to="/" className="btn btn-primary">Zum Dashboard</Link>
        <Link to="/wissen" className="btn">Zum Wissensbereich</Link>
        <Link to="/szenarien" className="btn">Zur Szenario-Bibliothek</Link>
      </div>
    </div>
  );
}
