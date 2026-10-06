import { Link } from 'react-router-dom';
import { Notice, PageHeader } from '../components/ui';

export default function Privacy() {
  return (
    <div className="page-narrow article-body">
      <PageHeader title="Datenschutzhinweise">
        <p>Hier erklären wir verständlich, welche Daten bei der Nutzung von PhishLab tatsächlich anfallen, wo sie liegen und wie Sie sie löschen.</p>
      </PageHeader>
      <Notice kind="warning" title="Hinweis zum Stand dieser Seite">
        <p>PhishLab ist ein Lern- und Portfolio-Projekt. Diese Hinweise beschreiben den technischen Datenfluss der Anwendung. Sie sind <strong>nicht rechtlich geprüft</strong> und ersetzen keine vollständige Datenschutzerklärung. Vor einer öffentlichen oder betrieblichen Nutzung müssen Betreiberangaben, Rechtsgrundlagen, Hosting- und Auftragsverarbeitungsverträge geprüft und ergänzt werden.</p>
      </Notice>

      <h2 id="ueberblick">Überblick</h2>
      <ul>
        <li>Kein Konto, keine Anmeldung, keine Ranglisten.</li>
        <li>Keine Analyse-, Tracking-, Werbe- oder Marketing-Dienste, keine Tracking-Pixel.</li>
        <li>Keine Cookies.</li>
        <li>Schriftarten und alle Inhalte werden vom eigenen Server geladen – keine externen Schriftarten-, Bild- oder Skript-Dienste.</li>
        <li>Übungen, Wissensartikel und Fortschritt funktionieren vollständig im Browser, ohne Daten an einen Server zu senden.</li>
      </ul>

      <h2 id="fortschritt">Trainingsfortschritt</h2>
      <p><strong>Standard:</strong> Ihre Antworten liegen nur im Arbeitsspeicher des geöffneten Browser-Tabs. Beim Schließen oder Neuladen sind sie gelöscht.</p>
      <p><strong>Optional:</strong> Unter <Link to="/fortschritt">Fortschritt</Link> können Sie ausdrücklich das Speichern auf diesem Gerät aktivieren. Dann speichert PhishLab im lokalen Speicher (localStorage) Ihres Browsers unter dem Schlüssel <code>phishlab:v1</code>: Szenario-ID, Ihre Antwort, richtig/falsch und Zeitpunkt je Übung sowie Ihre selbst erstellten Editor-Szenarien. Diese Daten verlassen Ihr Gerät nicht.</p>
      <p><strong>Löschen:</strong> Auf der Seite „Fortschritt“ über „Gespeicherte Daten löschen“ oder über die Browser-Einstellungen („Websitedaten löschen“). Dort können Sie die Daten auch ansehen und als JSON exportieren.</p>

      <h2 id="editor">Szenario-Editor</h2>
      <p>Eigene Szenarien liegen wie der Fortschritt nur im Arbeitsspeicher bzw. – nach Aktivierung – im lokalen Speicher Ihres Browsers. Import und Export laufen lokal über Dateien auf Ihrem Gerät. Bitte tragen Sie ausschließlich erfundene Inhalte ein.</p>

      <h2 id="kontakt">Kontaktformular</h2>
      <p>Nur wenn Sie das Kontaktformular bewusst absenden, werden die eingegebenen Daten übertragen:</p>
      <ul>
        <li><strong>Welche Daten:</strong> Name (optional), E-Mail-Adresse für die Antwort, Thema, Betreff, Nachricht.</li>
        <li><strong>Zweck:</strong> ausschließlich die Bearbeitung und Beantwortung Ihrer Anfrage.</li>
        <li><strong>Weg:</strong> Ihr Browser sendet die Daten verschlüsselt (HTTPS) an eine Serverfunktion (Netlify Function) beim Hoster Netlify. Diese gibt die Nachricht an den E-Mail-Dienstleister <strong>Resend</strong> weiter, der sie an das konfigurierte PhishLab-Postfach zustellt. Ihre Adresse wird als Antwortadresse gesetzt.</li>
        <li><strong>Speicherung:</strong> PhishLab speichert Anfragen nicht in einer Datenbank. Die Serverfunktion protokolliert nur anonyme Ereignisse (z. B. „versendet“ oder „Fehler“), niemals Nachrichtentext oder E-Mail-Adresse. Die E-Mail liegt danach im Empfängerpostfach und wird nach Erledigung gelöscht. Netlify und Resend können technisch bedingt eigene Protokolle (z. B. Zustellprotokolle) führen; deren Aufbewahrung richtet sich nach den Bedingungen der Anbieter und ist vom Betreiber zu prüfen.</li>
        <li><strong>Keine automatische Antwort</strong> und keine Weitergabe zu Werbezwecken.</li>
        <li><strong>Spam-Schutz:</strong> ein unsichtbares Feld und eine Mindest-Ausfüllzeit – ohne externe Captcha-Dienste.</li>
      </ul>
      <p>Bitte tragen Sie keine Passwörter, Zugangsdaten oder vertraulichen Unternehmensinformationen ein.</p>
      <p>Beim Aufruf der Kontaktseite fragt Ihr Browser ohne persönliche Angaben bei der eigenen Serverfunktion ab, ob der Versand eingerichtet ist.</p>

      <h2 id="hosting">Hosting</h2>
      <p>Die Anwendung ist für das Hosting bei Netlify vorbereitet. Beim Abruf jeder Website verarbeitet der Hoster technisch notwendige Verbindungsdaten wie IP-Adresse, Zeitpunkt und angeforderte Datei, um die Seite auszuliefern und den Betrieb abzusichern. Umfang und Speicherdauer bestimmt der Hoster; sie sind vom Betreiber vor dem Livegang zu prüfen und hier zu ergänzen.</p>

      <h2 id="externe-links">Externe Links</h2>
      <p>Einige Artikel verlinken offizielle Quellen als Zusatzmaterial. Diese werden nur geöffnet, wenn Sie sie anklicken, in einem neuen Tab und ohne Übermittlung der Herkunftsseite (no-referrer). Simulierte Links in Übungen führen nie zu externen Seiten.</p>

      <h2 id="offen">Vor dem Livebetrieb zu prüfen</h2>
      <ul>
        <li>Verantwortliche Stelle und Kontaktdaten (ggf. Impressum)</li>
        <li>Rechtsgrundlagen der Verarbeitung im Kontaktformular</li>
        <li>Auftragsverarbeitungsverträge mit Netlify und Resend, Serverstandorte und Drittlandübermittlung</li>
        <li>Aufbewahrungs- und Löschfristen im Empfängerpostfach</li>
        <li>Bei betrieblichem Einsatz: Abstimmung mit Datenschutzbeauftragten und ggf. Mitbestimmungsgremien</li>
      </ul>
    </div>
  );
}
