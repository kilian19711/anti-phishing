import { Link } from 'react-router-dom';
import { Notice, PageHeader } from '../components/ui';

export default function About() {
  return (
    <div className="page-narrow">
      <PageHeader title="Über das Projekt">
        <p>PhishLab ist ein interaktives Lernportal zum Erkennen von Phishing und legitimen Nachrichten.</p>
      </PageHeader>
      <Notice kind="info" title="Unabhängiges Lern- und Portfolio-Projekt – kein offizielles L-mobile-Produkt">
        <p>PhishLab wurde im Rahmen einer Ausbildung als Lern- und Portfolio-Projekt entwickelt. Es ist kein Produkt von L-mobile und wird von L-mobile weder freigegeben noch unterstützt. Die Farbgestaltung ist von der Markenwelt lediglich inspiriert; offizielle Logos werden nicht verwendet.</p>
      </Notice>
      <div className="card stack" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Grundsätze</h2>
        <ul>
          <li>Alle Nachrichten, Personen, Firmen, Adressen, Links und Anhänge sind erfunden. Beispiel-Domains enden auf die reservierte Endung <code>.example</code>.</li>
          <li>Simulierte Links öffnen nur Erklärungen in PhishLab – nie externe Seiten.</li>
          <li>Keine Passworteingaben, keine echten Anmeldeseiten, kein Versand von Phishing- oder Trainingsmails an Personen.</li>
          <li>Datensparsam: kein Tracking, keine Cookies, Fortschritt standardmäßig nur in der aktuellen Sitzung.</li>
          <li>Barrierefreiheit nach WCAG 2.2 AA als Entwicklungsziel – nicht unabhängig geprüft oder zertifiziert.</li>
        </ul>
        <h2>Grenzen</h2>
        <p>Die Inhalte wurden sorgfältig erstellt, ersetzen aber keine Beratung, keine Rechtsberatung und keine unternehmensspezifische Sicherheitsrichtlinie. Halten Sie sich im Zweifel an die Vorgaben Ihrer IT. <Link to="/datenschutz">Datenschutzhinweise</Link> · <Link to="/kontakt">Kontakt</Link></p>
      </div>
    </div>
  );
}
