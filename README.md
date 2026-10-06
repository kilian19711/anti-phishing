# PhishLab

Interaktives Phishing-Awareness- und Lernportal: Nutzer bewerten vollständig **simulierte** E-Mails, SMS und Messenger-Nachrichten, erhalten nach jeder Entscheidung eine konkrete Erklärung und können direkt in passende Wissensartikel wechseln.

> **Unabhängiges Lern- und Portfolio-Projekt – kein offizielles L-mobile-Produkt.** Keine Freigabe oder Unterstützung durch L-mobile. Es werden keine L-mobile-Logos verwendet.

## Funktionsumfang

| Bereich | Inhalt |
|---|---|
| Dashboard | Kennzahlen der aktuellen Sitzung, Themenfortschritt, nächste Empfehlung |
| Training | Kurze Runde (5), Standard (10), vollständiger Modus (alle 60), Filter nach Thema/Schwierigkeit/Artikel, optionale Sicherheitsangabe, Modus „Hinweise markieren“, Zurück/Weiter/Überspringen/Abbrechen, ausführliche Auswertung, „Falsch beantwortete erneut üben“ |
| Wissen | 19 Artikel (je ca. 800–1.200 Wörter), Suche, Themen-/Zielgruppenfilter, Lesezeit aus echter Wortzahl, Inhaltsübersicht, Checkliste, passende Quizfälle, „Quiz zu diesem Thema starten“, verwandte Artikel, Brotkrümel, „Zurück zum Quiz“ |
| Szenarien | Bibliothek aller 60 Fälle (30 Phishing / 30 legitim) mit Filtern nach Thema, Schwierigkeit, Nachrichtentyp, Kanal, Ergebnis; Detailansicht mit Lernziel, Musterlösung, Hinweisen, Handlungsempfehlung, Artikeln |
| Fortschritt | Nach Thema und Schwierigkeit; optionales Speichern auf dem Gerät mit Anzeigen, JSON-Export und vollständigem Löschen |
| Szenario-Editor | Formular mit Live-Vorschau, Validierung mit verständlichen Fehlermeldungen, JSON-Import/-Export mit Schema-Prüfung (lokale Demo-Funktion, kein Login) |
| Kontakt | Barrierearmes Formular, Versand ausschließlich serverseitig über Netlify Function + Resend |
| Datenschutz / Über | Tatsächlicher Datenfluss, Speicherorte, Löschung, offene Prüfpunkte |

## Schnellstart

Voraussetzung: Node.js ≥ 20 (getestet mit 22).

```bash
npm install
npm run dev          # Entwicklungsserver: http://localhost:5173
npm test             # alle automatisierten Tests (Vitest)
npm run lint         # ESLint inkl. jsx-a11y
npm run typecheck    # TypeScript
npm run build        # Produktions-Build nach dist/
npm run preview      # Build lokal ansehen: http://localhost:4173
```

Quiz und Wissensbereich funktionieren ohne API-Schlüssel. Das Kontaktformular braucht eine Netlify-Umgebung (siehe unten); lokal mit `npm run dev` zeigt es ehrlich an, dass der Versand nicht erreichbar ist. Zum lokalen Test inkl. Function: `npx netlify-cli dev` mit gesetzten Umgebungsvariablen.

## Technische Entscheidungen (kurz erklärt)

- **Vite + React + TypeScript**: Das Repository war leer. Vite baut schnell eine statische Seite, die Netlify direkt ausliefern kann; TypeScript fängt Fehler schon beim Schreiben ab.
- **React Router** (einzige Laufzeit-Abhängigkeit neben React): echte URLs wie `/wissen/spf-dkim-dmarc`. Weil alle Pfade dieselbe `index.html` brauchen, enthält `netlify.toml` einen **SPA-Fallback**.
- **@fontsource-variable/inter, …/jetbrains-mono**: Schriftarten werden mitgebaut und vom eigenen Server geladen – keine Anfragen an Google Fonts.
- **Kein Markdown-Paket**: Artikel werden mit einem kleinen eigenen Parser (`src/lib/markdown.ts`) in React-Elemente umgewandelt – ohne `innerHTML`, also ohne XSS-Risiko.
- **Zustand mit `useReducer` + Context**: Fortschritt liegt standardmäßig nur im Arbeitsspeicher. `localStorage` wird erst nach ausdrücklicher Zustimmung benutzt (`src/lib/storage.ts`, mit Fallback, falls blockiert).
- **Fisher-Yates-Shuffle** mit `crypto.getRandomValues` (`src/lib/shuffle.ts`): gleichverteilt, keine Duplikate; identische Reihenfolge wie in der Vorrunde wird verworfen.
- **Dev-Abhängigkeiten**: Vitest + Testing Library + jsdom (Tests), ESLint + jsx-a11y (Code- und Barrierefreiheitsregeln), `@netlify/functions` (Typen).

## Projektstruktur

```
src/
  types/content.ts         Datenschema für Szenarien und Artikel (dokumentiert)
  data/scenarios/          60 Szenarien (part1–4.ts)
  data/articles/           19 Artikel + Abschnitt „Häufige Missverständnisse“
  data/content.test.ts     Inhaltsprüfung: Anzahl, Balance, IDs, Links, Pflichtfelder, Wortzahl, Abschnitte
  lib/                     Logik ohne UI: quiz, shuffle, validation, marking, stats, storage, markdown, content
  state/                   Reducer, Context, Typen (Sitzung + optionale Speicherung)
  components/              Layout, MailView (simulierter Posteingang), Feedback, UI-Bausteine, Icons
  pages/                   Seiten je Route
  styles/global.css        Design-Tokens und Styles
  test/                    Integrationstests der Hauptabläufe
netlify/functions/
  contact.ts               Netlify Function (Einstiegspunkt)
  lib/contact-core.ts      Validierung, Provider-Schnittstelle, Resend-Provider, Handler (testbar)
netlify.toml               Build, SPA-Fallback, Sicherheits-Header (CSP u. a.)
.env.example               Variablennamen für das Kontaktformular (leer)
```

## Datenschema eines Szenarios

Siehe `src/types/content.ts`. Pflichtfelder: `id`, `title`, `topic`, `difficulty`, `channel`, `messageType`, `sender {name, address}`, `subject` (bei E-Mail), `receivedAt`, `body[]`, `classification`, `learningGoal`, `hints[] {location, excerpt?, signal, text}`, `explanation`, `counterArguments`, `safeAction`, `afterMistake`, `articleIds[]`; optional `link {label, target}` und `attachment {name, size}`. Regeln (geprüft in `src/lib/validation.ts` und in den Tests): E-Mail-Absender und Linkziele nur mit `.example`-Domains, Hinweis-Ausschnitte müssen wörtlich im Text stehen, Artikel-IDs müssen existieren.

## Kontaktformular: sichere Konfiguration

Der Versand läuft **nur serverseitig** über `netlify/functions/contact.ts`. Schlüssel gehören nie ins Frontend oder in Git.

1. Bei [Resend](https://resend.com) ein Konto anlegen, eine eigene Absenderdomain verifizieren und einen API-Schlüssel mit Sende-Recht erstellen.
2. In Netlify unter *Site configuration → Environment variables* setzen:

| Variable | Bedeutung |
|---|---|
| `CONTACT_RECIPIENT_EMAIL` | Postfach, das die Anfragen erhält |
| `CONTACT_FROM_EMAIL` | verifizierte Absenderadresse bei Resend, z. B. `PhishLab <kontakt@ihre-domain.de>` |
| `RESEND_API_KEY` | API-Schlüssel (nur serverseitig) |

3. Neu deployen. Die Kontaktseite fragt `GET /.netlify/functions/contact` ab und zeigt an, ob der Versand eingerichtet ist.

Verhalten: Fehlt eine Variable, antwortet die Function mit `503 not_configured` und das Formular zeigt klar „nicht versendet“. Erfolg wird nur angezeigt, wenn Resend die Annahme mit einer Nachrichten-ID bestätigt. Validierung im Browser **und** auf dem Server (Pflichtfelder, Längenlimits, E-Mail-Format, Themenliste), Entfernen von Zeilenumbrüchen in einzeiligen Feldern (Header-Injection), Honeypot-Feld und Mindest-Ausfüllzeit von 3 s statt Captcha-Drittanbieter. Geloggt werden nur anonyme Ereigniscodes (`sent`, `not_configured`, `provider_error:…`), nie Inhalte oder Adressen. Keine Datenbank, keine automatische Antwort. Der Provider ist über das Interface `MailProvider` austauschbar.

> Hinweis: Die Resend-API (`POST https://api.resend.com/emails`, Bearer-Token, Felder `from`, `to`, `reply_to`, `subject`, `text`, Antwort mit `id`) wurde nach dem dokumentierten Stand implementiert und mit Mocks getestet. **Die Resend-Dokumentation war aus der Entwicklungsumgebung nicht erreichbar, und es wurde keine echte E-Mail versendet.** Bitte nach dem Einrichten einmal mit einer Testnachricht prüfen.

## Veröffentlichung auf Netlify

- Build-Befehl: `npm run build`
- Veröffentlichungsverzeichnis: `dist`
- Functions-Verzeichnis: `netlify/functions`

Alles ist in `netlify.toml` hinterlegt (inkl. SPA-Fallback und Sicherheits-Headern wie Content-Security-Policy). Repository mit Netlify verbinden, Umgebungsvariablen setzen, fertig. Ein Deployment wurde im Rahmen der Entwicklung **nicht** durchgeführt.

## Datenschutz- und Sicherheitsgrenzen

- Kein Tracking, keine Cookies, keine externen Schriften/Skripte/Bilder (im Browser geprüft: keine Anfragen an fremde Hosts).
- Fortschritt standardmäßig nur im Arbeitsspeicher; optionales Speichern im `localStorage` unter `phishlab:v1` mit minimalen Feldern (Szenario-ID, Antwort, richtig/falsch, Zeitpunkt, eigene Szenarien); Anzeigen, Export, Löschen unter „Fortschritt“.
- Alle Inhalte sind erfunden; Domains nur `.example`. Simulierte Links/Anhänge öffnen ausschließlich Erklärungen.
- Kein Versand von Trainingsmails, keine Klickerfassung, keine Passworteingaben.
- Die Datenschutzhinweise beschreiben den technischen Datenfluss, sind aber **nicht rechtlich geprüft**. Vor öffentlicher oder betrieblicher Nutzung zu klären: verantwortliche Stelle/Impressum, Rechtsgrundlage für das Kontaktformular, Auftragsverarbeitungsverträge und Serverstandorte (Netlify, Resend), Aufbewahrungsfristen im Empfängerpostfach, ggf. Datenschutzbeauftragte und Mitbestimmung. Dieses Projekt ist keine Rechtsberatung und nicht DSGVO-zertifiziert.

## Design

- App-Shell nach den vorgegebenen Nische-OS-Dark-UI-Werten (Hintergrund `#0d0f14`, Flächen `#13161e`, Karten `#1a1e2a`, Rahmen `#252a38`, Akzente `#4f8ef7`/`#7c5df9`, Status Grün/Rot/Amber, Text `#e8eaf0`/`#9ca3af`, Inter + JetBrains Mono). Im Repository gab es keine Nische-OS-Vorlage.
- L-mobile-inspirierte Ebene: Cyan-Blau `#2aa9e0` (Markenakzent, aktive Navigation) und Grün `#6cb33f` (Hauptaktionen). **Diese Werte sind aus einem Screenshot der L-mobile-Website abgeschätzt, nicht offiziell.** Website, Corporate-Design-Seite und Richtlinien-PDF waren aus der Entwicklungsumgebung nicht abrufbar (Netzwerkrichtlinie). Es wurde kein Logo verwendet oder nachgezeichnet; PhishLab nutzt eine eigene Wortmarke. Falls freigegebene Assets und offizielle Werte vorliegen, lassen sie sich zentral in `src/styles/global.css` (`--brand`, `--action`) eintragen.

## Prüfergebnisse (Stand dieser Version)

Tatsächlich ausgeführt:

- `npm test`: **134 Tests bestanden** – u. a. 60 Szenarien schema-valide, 30/30 Balance, eindeutige IDs/Titel/Texte, nur `.example`-Domains, alle Artikelverknüpfungen gültig, 19 Artikel mit 780–1.400 Wörtern und Pflichtabschnitten, jeder Artikel mit Quizfällen; Shuffle-Gleichverteilung, Runden ohne Duplikate, vollständiger Modus, Filter + Zufall; Markier-Auswertung; Editor-Validierung, JSON-Import; Kontakt-Function (Mock-Erfolg, ungültige Eingaben, Längen, Honeypot, Zeitprüfung, fehlende Konfiguration, Providerfehler, Header-Injection, keine Inhalte im Log); UI-Abläufe (Dashboard → Runde → Feedback → Artikel → zurück zum Quiz → Ergebnis, Abbruch, Markier-Modus, Suche, Filter, 404, Speichern/Wiederherstellen/Löschen, Editor, Kontakt).
- `npm run lint`, `npm run typecheck`, `npm run build`: ohne Fehler.
- Browser-Prüfung (Chromium via Playwright, `vite preview`) bei 320 px und 1440 px Breite auf 12 Routen plus Quiz/Feedback: kein horizontales Scrollen, keine Anfragen an fremde Hosts, erster Tab-Stopp ist „Zum Inhalt springen“, axe-core (WCAG 2.0/2.1/2.2 A/AA-Regeln) ohne Befund. Einmalig meldete axe einen Kontrastfehler an `.btn-primary`, der in 15 Wiederholungen nicht reproduzierbar war (rechnerischer Kontrast ca. 7,6:1; vermutlich während der Farbtransition gemessen).

Nicht geprüft: echte Screenreader (NVDA/JAWS/VoiceOver), manuelles Zoomen auf 200 % in allen Browsern, Safari/Firefox, echtes Netlify-Deployment, echter Resend-Versand. Automatisierte Prüfungen finden nur einen Teil möglicher Barrieren – **das Projekt ist weder fehlerfrei garantiert noch unabhängig auf Barrierefreiheit oder DSGVO geprüft.**

## Bekannte Einschränkungen und mögliche Erweiterungen

- Eigene Editor-Szenarien sind lokal und nicht zwischen Geräten teilbar (bewusst: kein Backend, keine Konten).
- Die „registrierte Domain“ in der Link-Simulation ist vereinfacht (letzte zwei Namensbestandteile) – für `.example`-Beispiele korrekt, für echte Domains wie `.co.uk` nicht.
- Externe Quellen in Artikeln beschränken sich auf RFC-Standards; die URLs konnten aus der Umgebung nicht abgerufen werden und sollten vor Veröffentlichung einmal geöffnet werden. BSI-/ENISA-Quellen wurden aus diesem Grund nicht verlinkt.
- Das JS-Bundle enthält alle Inhalte (~180 KB gzip), damit alles ohne API funktioniert.
- Nur dunkles Farbschema.
- Ideen: Hellmodus, Artikel als Markdown-Dateien mit Build-Schritt, Spaced-Repetition für falsch beantwortete Fälle, Übersetzungen, Playwright-Tests im CI.
