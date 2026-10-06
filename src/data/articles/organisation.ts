import type { Article } from '../../types/content';

export const organisationArticles: Article[] = [
  {
    id: 'incident-response',
    title: 'Erste Schritte der IT-Incident-Response bei Phishing',
    summary: 'Ein praxisnaher Ablauf für IT-Teams: von der Meldung über Eindämmung und Analyse bis zur Nachbereitung – mit Einstieg für alle und Vertiefung für IT.',
    category: 'Richtig reagieren',
    audience: 'it',
    level: 'schwer',
    tags: ['Incident Response', 'Eindämmung', 'Forensik', 'Prozess'],
    body: `## Grundlagen

**Incident Response** bedeutet „Reaktion auf einen Sicherheitsvorfall“. Gemeint ist ein geordnetes Vorgehen, wenn etwas passiert ist – zum Beispiel, wenn jemand auf eine Phishing-Mail hereingefallen ist. Ziel ist, den Schaden zu begrenzen, die Ursache zu verstehen, den Normalbetrieb wiederherzustellen und daraus zu lernen. Für Mitarbeitende ist die wichtigste Aufgabe einfach: schnell melden und den Anweisungen der IT folgen. Für die IT ist ein vorbereiteter Ablauf entscheidend, denn im Ernstfall fehlt die Zeit, alles neu zu überlegen.

### Die Phasen im Überblick

Viele Leitfäden beschreiben einen ähnlichen Kreislauf:

1. **Vorbereitung** – Zuständigkeiten, Kontakte, Werkzeuge und Abläufe festlegen.
2. **Erkennung und Analyse** – Meldung aufnehmen, Vorfall bewerten.
3. **Eindämmung** – Ausbreitung stoppen.
4. **Beseitigung** – Ursache entfernen.
5. **Wiederherstellung** – Systeme und Konten sicher zurück in den Betrieb bringen.
6. **Nachbereitung** – Lehren ziehen und Maßnahmen umsetzen.

## Vertiefung für IT

### 1. Vorbereitung

- Erreichbarkeit: Wer nimmt Meldungen an, auch außerhalb der Kernzeit?
- Kontaktliste: Geschäftsleitung, Datenschutz, Rechtsabteilung bzw. externe Beratung, Bank, Dienstleister, ggf. Cyber-Versicherung.
- Werkzeuge: zentrale Suche und Entfernung von Mails, Sperren von Konten und Sitzungen, Isolieren von Endgeräten, Protokollzugriff.
- Vorlagen: Checklisten für typische Fälle (Zugangsdaten eingegeben, Anhang geöffnet, Zahlung veranlasst).
- Übung: Ablauf regelmäßig mit einem fiktiven Fall durchspielen.

### 2. Erkennung und Analyse

- **Meldung aufnehmen:** Wer, wann, was genau? Geklickt, eingegeben, geöffnet, gezahlt?
- **Originalnachricht sichern** inklusive Header (siehe Artikel zu E-Mail-Headern).
- **Indikatoren extrahieren:** Absenderadressen, Domains, URLs, Dateinamen, Hashwerte von Anhängen, Absender-IP.
- **Umfang bestimmen:** Wer hat dieselbe Mail erhalten? Wer hat geklickt? Proxy-, DNS- und Mailprotokolle helfen dabei.
- **Schweregrad bewerten:** Nur zugestellt? Geklickt? Daten eingegeben? Schadcode ausgeführt? Geld geflossen?

### 3. Eindämmung

- Mails der Kampagne aus allen Postfächern entfernen.
- Absender, Domains und URLs blockieren.
- Bei eingegebenen Zugangsdaten: Passwort zurücksetzen, **alle Sitzungen und Tokens widerrufen**, MFA-Methoden prüfen.
- Postfachregeln, Weiterleitungen und App-Berechtigungen (z. B. OAuth-Zugriffe) des betroffenen Kontos kontrollieren.
- Bei Schadcode: Endgerät isolieren (Netzwerk trennen oder per EDR isolieren), nicht vorschnell neu aufsetzen, bevor Beweise gesichert sind.
- Bei Zahlungen: sofort Bank kontaktieren und Rückruf versuchen.

### 4. Beseitigung

- Schadsoftware entfernen oder Gerät neu aufsetzen.
- Von Angreifern angelegte Regeln, Konten, Geräte oder Berechtigungen löschen.
- Ausgenutzte Schwachstellen schließen.

### 5. Wiederherstellung

- Konten nach Prüfung wieder freigeben, idealerweise mit stärkerer MFA.
- Systeme aus sauberen Sicherungen wiederherstellen, falls nötig.
- Erhöhte Überwachung für einige Zeit.

### 6. Nachbereitung

- Was ist passiert, was hat gut funktioniert, was nicht?
- Technische Maßnahmen: Filterregeln, MFA-Verfahren, Makro-Richtlinien.
- Organisatorische Maßnahmen: Prozesse, Schulungsinhalte, Meldewege.
- Rückmeldung an die meldende Person und – wo sinnvoll – eine kurze Warnung an alle.

## Rechtliche und organisatorische Aspekte

Je nach Vorfall können Melde- oder Informationspflichten bestehen, etwa wenn personenbezogene Daten betroffen sind. Ob und welche Pflichten gelten, hängt vom Einzelfall ab und sollte mit der oder dem Datenschutzbeauftragten bzw. rechtlicher Beratung geklärt werden. Dieser Artikel ist keine Rechtsberatung. Dokumentieren Sie den Vorfall zeitnah und nachvollziehbar.

## Erkennungsmerkmale und ihre Grenzen

Indikatoren für eine erfolgreiche Kompromittierung: Anmeldungen aus ungewöhnlichen Netzen, neue Weiterleitungsregeln, unbekannte MFA-Geräte, massenhafter Mailversand aus einem Konto, ungewöhnliche Prozesse auf Endgeräten. **Grenzen:** Fehlende Indikatoren bedeuten nicht, dass nichts passiert ist. Angreifer verwischen Spuren, und Protokolle sind nicht immer vollständig oder lange genug aufbewahrt.

## Ein fiktives Beispiel

Um 09:12 Uhr meldet eine Mitarbeiterin, dass sie auf einer gefälschten Seite ihr Passwort eingegeben hat. Die IT setzt das Passwort zurück, widerruft alle Sitzungen und findet eine neue Regel, die Mails mit „Rechnung“ im Betreff in einen versteckten Ordner verschiebt. Die Regel wird entfernt. Die Suche ergibt 60 weitere Empfänger, zwei haben geklickt, einer hat Daten eingegeben – auch dessen Konto wird gesichert. Die Kampagnen-Mails werden entfernt, die Domain blockiert. In der Nachbereitung wird die Push-MFA auf Nummernabgleich umgestellt.

## Schutzmaßnahmen

- Incident-Response-Plan schriftlich festhalten und üben.
- Protokollierung und Aufbewahrung so einstellen, dass Analysen möglich sind.
- Technische Möglichkeit, Mails zentral zu entfernen und Sitzungen zu widerrufen.
- Eine Meldekultur, in der Betroffene schnell und ohne Angst melden.

## Im Ernstfall

Für Mitarbeitende: melden, nichts löschen, Anweisungen folgen. Für die IT: Beweise sichern, eindämmen, Umfang bestimmen, beseitigen, wiederherstellen und nachbereiten.

## Zusammengefasst

Ein vorbereiteter Ablauf macht den Unterschied. Schnelle Eindämmung – Sitzungen widerrufen, Mails entfernen, Geräte isolieren – begrenzt den Schaden. Gründliche Analyse und Nachbereitung verhindern Wiederholungen.`,
    checklist: [
      'Meldung aufgenommen: geklickt, eingegeben, geöffnet, gezahlt?',
      'Originalnachricht mit Header gesichert?',
      'Weitere Empfänger ermittelt und Mails entfernt?',
      'Passwort zurückgesetzt und alle Sitzungen widerrufen?',
      'Postfachregeln, Weiterleitungen und MFA-Methoden geprüft?',
      'Nachbereitung mit konkreten Maßnahmen durchgeführt?',
    ],
    relatedArticleIds: ['nach-dem-klick', 'email-header', 'mailserver-schutz', 'sicher-melden'],
  },
  {
    id: 'awareness-schulungen',
    title: 'Wirksame Awareness-Schulungen gestalten',
    summary: 'Was gute Security-Awareness ausmacht, warum Angst und Bloßstellen schaden und wie Schulungen, Übungen und Meldekultur zusammenwirken.',
    category: 'Organisation',
    audience: 'it',
    level: 'mittel',
    tags: ['Awareness', 'Schulung', 'Meldekultur', 'Didaktik'],
    body: `## Grundlagen

**Security Awareness** bedeutet Sicherheitsbewusstsein. Gemeint ist, dass Menschen Risiken kennen, sie im Alltag erkennen und wissen, wie sie sicher reagieren. Awareness-Schulungen sollen genau das fördern. Ein einmaliger Pflichtvortrag pro Jahr reicht dafür selten. Wirksam sind regelmäßige, kurze und praxisnahe Formate, die zum Arbeitsalltag passen – und eine Unternehmenskultur, in der Sicherheit gemeinsam getragen wird.

Wichtig ist das richtige Ziel: Es geht nicht darum, dass niemand mehr je einen Fehler macht. Das ist unrealistisch. Ziel ist, dass Menschen **häufiger erkennen, schneller melden und Fehler offen zugeben**. Dann kann die Technik, die Fehler nie ganz verhindern kann, mit menschlicher Aufmerksamkeit zusammenwirken.

## Vertiefung für IT

### Was gute Schulungen auszeichnet

- **Relevanz:** Beispiele aus dem echten Arbeitsalltag der Zielgruppe – die Buchhaltung braucht andere Szenarien als die Produktion oder die Personalabteilung.
- **Kurze Einheiten:** Lieber regelmäßig zehn Minuten als einmal im Jahr zwei Stunden.
- **Aktives Lernen:** Übungen mit Entscheidungen und sofortigem, erklärendem Feedback wirken besser als reine Folien.
- **Beide Seiten zeigen:** Nicht nur Phishing, sondern auch legitime Nachrichten. Sonst entsteht Übervorsicht und Meldungen von harmlosen Mails nehmen überhand.
- **Konkrete Handlungsanweisungen:** Wie melde ich? Wen rufe ich an? Was tue ich nach einem Klick?
- **Verständliche Sprache:** Fachbegriffe erklären, nicht voraussetzen.
- **Barrierefreiheit:** Inhalte für alle zugänglich gestalten – Untertitel, Tastaturbedienung, gute Kontraste.

### Was Schulungen schadet

- **Angst und Drohungen:** „Wer klickt, bekommt Konsequenzen.“ Das führt dazu, dass Fehler verschwiegen werden – genau das Gegenteil des Gewünschten.
- **Bloßstellen:** Ranglisten, Namenslisten von „Durchgefallenen“ oder öffentliche Kritik zerstören Vertrauen.
- **Unrealistische Faustregeln:** „Rechtschreibfehler = Phishing“ oder „Externe Mails sind gefährlich“ führen zu Fehleinschätzungen.
- **Überforderung:** Zu viele Regeln auf einmal.

### Phishing-Simulationen

Manche Unternehmen verschicken simulierte Phishing-Mails, um das Verhalten zu üben. Das kann sinnvoll sein, wenn bestimmte Grundsätze beachtet werden:

- Transparenz: Die Belegschaft weiß, dass es Übungen gibt.
- Abstimmung mit Betriebsrat bzw. Personalvertretung und Datenschutz; die Rechtslage und Mitbestimmung sind vorab zu klären.
- Keine Auswertung, die einzelne Personen bloßstellt; Fokus auf Lernen statt Kontrolle.
- Sofortiges, freundliches Lernangebot nach einem Klick.
- Erfolgsmessung über Melderaten, nicht nur über Klickraten.
- Keine Szenarien, die Menschen emotional verletzen (z. B. angebliche Bonuszahlungen oder Kündigungen).

PhishLab selbst versendet bewusst **keine** Simulationen an echte Personen, sondern bietet eine Lernumgebung, in der Nutzer selbstbestimmt üben.

### Erfolg messen

- **Melderate:** Wie viele Menschen melden verdächtige Nachrichten?
- **Zeit bis zur ersten Meldung** einer echten Kampagne.
- **Selbstmeldungen nach Fehlern:** Steigen sie, ist das ein gutes Zeichen für die Kultur.
- **Qualitative Rückmeldungen:** Verstehen Menschen die Inhalte und finden sie sie nützlich?

Messungen sollten aggregiert und ohne Personenprofile erfolgen.

## Erkennungsmerkmale und ihre Grenzen

Woran erkennen Sie, dass Awareness wirkt? Mehr Meldungen, schnellere Meldungen, mehr Rückfragen über bekannte Wege, offener Umgang mit Fehlern. **Grenzen:** Auch perfekt geschulte Menschen machen Fehler, besonders unter Stress. Awareness ist eine Schutzschicht unter mehreren und ersetzt keine technischen Maßnahmen wie MFA, Filter oder Zahlungsprozesse.

## Ein fiktives Beispiel

Ein mittelständisches Unternehmen ersetzt den jährlichen Pflichtvortrag durch monatliche Fünf-Minuten-Übungen mit je drei Nachrichten – Phishing und legitim gemischt. Nach jeder Entscheidung gibt es eine kurze Erklärung. Die IT führt einen Melde-Button ein und bedankt sich für jede Meldung. Nach einem halben Jahr melden deutlich mehr Mitarbeitende verdächtige Mails, und eine echte Kampagne wird innerhalb weniger Minuten erkannt und entfernt.

## Schutzmaßnahmen

- Regelmäßige, kurze, praxisnahe Lerneinheiten.
- Klarer, einfacher Meldeweg mit Rückmeldung.
- Führungskräfte als Vorbilder: Auch sie melden und fragen nach.
- Keine Bestrafung bei selbst gemeldeten Fehlern.
- Inhalte regelmäßig an aktuelle Maschen anpassen.

## Im Ernstfall

Nach einem echten Vorfall bietet sich eine kurze, sachliche Information an alle an: was passiert ist, woran man es hätte erkennen können, was zu tun ist. Ohne Namen, ohne Schuldzuweisung.

## Zusammengefasst

Wirksame Awareness ist regelmäßig, praxisnah, respektvoll und zeigt sowohl Phishing als auch legitime Nachrichten. Angst und Bloßstellen schaden. Erfolg zeigt sich vor allem an mehr und schnelleren Meldungen.`,
    checklist: [
      'Kurze, regelmäßige Lerneinheiten statt Einmal-Vortrag?',
      'Szenarien passend zur Zielgruppe, Phishing und legitim gemischt?',
      'Klarer Meldeweg mit Rückmeldung vorhanden?',
      'Keine Bestrafung oder Bloßstellung, keine Personenranglisten?',
      'Erfolg über Melderaten statt nur Klickraten gemessen?',
      'Simulationen vorab mit Datenschutz und Mitbestimmung abgestimmt?',
    ],
    relatedArticleIds: ['sicher-melden', 'phishing-grundlagen', 'incident-response'],
  },
];
