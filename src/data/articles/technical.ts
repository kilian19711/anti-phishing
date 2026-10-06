import type { Article } from '../../types/content';

const RFC_NOTE = 'Externe Zusatzinformation (technischer Standard, englisch). Wird in einem neuen Tab geöffnet.';

export const technicalArticles: Article[] = [
  {
    id: 'spoofing-authentifizierung',
    title: 'Spoofing und die Grenzen der E-Mail-Authentifizierung',
    summary: 'Warum Absenderadressen gefälscht werden können, was Authentifizierungsverfahren dagegen leisten und wo ihre Grenzen liegen.',
    category: 'Technik',
    audience: 'it',
    level: 'mittel',
    tags: ['Spoofing', 'Authentifizierung', 'E-Mail-Technik'],
    body: `## Grundlagen

**Spoofing** bedeutet „Vortäuschen“. Beim E-Mail-Spoofing wird eine Absenderadresse eingetragen, die nicht dem tatsächlichen Absender gehört. Das ist möglich, weil das grundlegende Protokoll für den Mailversand, **SMTP** (Simple Mail Transfer Protocol), aus einer Zeit stammt, in der man sich gegenseitig vertraute. SMTP prüft von sich aus nicht, ob jemand berechtigt ist, eine bestimmte Absenderadresse zu verwenden. Man kann sich das wie einen Briefumschlag vorstellen: Wer einen Brief einwirft, kann jeden beliebigen Absender auf den Umschlag schreiben.

Für Mitarbeitende heißt das: Eine Absenderadresse, die völlig korrekt aussieht – sogar die eigene Firmendomain –, ist allein **kein Beweis** dafür, dass die Mail wirklich von dort stammt.

### Drei Arten von Absender-Täuschung

- **Echtes Spoofing:** Die exakte Domain wird gefälscht, z. B. buchhaltung@nordwerk.example, obwohl die Mail von einem fremden Server kommt.
- **Lookalike-Domains:** Eine ähnliche Domain wird registriert, z. B. nordwerk-it.example. Technisch ist das kein Spoofing, denn die Domain gehört dem Angreifer wirklich – Authentifizierungsverfahren schlagen deshalb nicht an.
- **Kompromittierte Postfächer:** Angreifer haben die Zugangsdaten eines echten Postfachs. Die Mail kommt tatsächlich vom echten Server und besteht alle technischen Prüfungen.

## Was Authentifizierung leistet

Um echtes Spoofing zu erschweren, wurden Verfahren entwickelt, die Domaininhaber im **DNS** (Domain Name System, sozusagen das Telefonbuch des Internets) veröffentlichen:

- **SPF** legt fest, welche Server Mails für eine Domain versenden dürfen.
- **DKIM** fügt eine digitale Signatur hinzu, mit der der Empfänger prüfen kann, ob die Mail von der Domain signiert und unterwegs nicht verändert wurde.
- **DMARC** verknüpft SPF und DKIM mit der sichtbaren Absenderdomain und sagt dem Empfänger, was bei Fehlschlag zu tun ist (nichts, Quarantäne oder Ablehnung).

Details erklärt der Artikel „SPF, DKIM und DMARC verständlich erklärt“.

## Wo die Grenzen liegen

- **Nur wenn eingerichtet und durchgesetzt:** Die Verfahren helfen nur, wenn die Absenderdomain sie korrekt veröffentlicht **und** der empfangende Server sie prüft und befolgt. Eine DMARC-Richtlinie „p=none“ beobachtet nur und blockiert nichts.
- **Keine Hilfe gegen Lookalikes:** nordwerk-it.example kann perfekte SPF-, DKIM- und DMARC-Einträge haben – die Domain gehört ja dem Angreifer.
- **Keine Hilfe gegen kompromittierte Konten:** Eine Mail aus einem echten, übernommenen Postfach ist technisch einwandfrei authentifiziert.
- **Anzeigename bleibt frei:** Authentifizierung bezieht sich auf die Domain, nicht auf den Anzeigenamen „Geschäftsführung“.
- **Weiterleitungen** können SPF brechen und zu Fehlalarmen führen; hier hilft ARC (Authenticated Received Chain), das aber nicht überall ausgewertet wird.

## Erkennungsmerkmale und ihre Grenzen

Für Mitarbeitende:

- Interne Absender, aber externe Antwortadresse.
- Externe Markierung („[EXTERN]“) bei angeblich interner Mail.
- Ungewöhnliche Anfrage trotz bekannter Adresse.

Für die IT:

- Authentication-Results im Header zeigen spf=fail, dkim=fail oder dmarc=fail.
- Die Domain im Return-Path weicht von der From-Domain ab, ohne dass DKIM-Alignment besteht.

**Grenzen:** Ein „pass“ bei allen Prüfungen bedeutet nur, dass die Mail von einem für die Domain berechtigten System kam. Es bedeutet nicht, dass der Inhalt harmlos ist. Ein „fail“ kann auch bei legitimen Mails auftreten, etwa durch falsch konfigurierte Newsletter-Dienste oder Weiterleitungen.

## Ein fiktives Beispiel

> **From:** Buchhaltung Nordwerk <buchhaltung@nordwerk.example>
> **Reply-To:** buchhaltung.freigabe@mailbox-privat.example
> **Authentication-Results:** spf=fail; dmarc=fail (p=none)

Die sichtbare Adresse ist gefälscht. Die DMARC-Richtlinie der Domain steht auf „none“, deshalb wurde die Mail zugestellt statt abgelehnt. Die externe Antwortadresse verrät das Ziel: Antworten sollen beim Angreifer landen.

## Vertiefung für IT

- Veröffentlichen Sie für alle Domains SPF und DKIM, auch für Domains, die **keine** Mails versenden (SPF „v=spf1 -all“ und DMARC „p=reject“ für Parkdomains).
- Führen Sie DMARC schrittweise ein: zuerst „p=none“ mit Auswertung der Aggregatberichte (rua), dann „p=quarantine“, dann „p=reject“. So vermeiden Sie, legitime Dienste auszusperren.
- Inventarisieren Sie alle Dienste, die in Ihrem Namen versenden (Newsletter, Ticketsystem, CRM), und binden Sie sie per SPF-Include oder eigenem DKIM-Schlüssel ein.
- Markieren Sie externe Mails im Betreff oder per Banner und warnen Sie bei Anzeigenamen, die interne Personen imitieren.
- Überwachen Sie neu registrierte Lookalike-Domains Ihrer Marke.
- Schützen Sie Postfächer mit MFA und Anomalie-Erkennung, um Kontoübernahmen zu verhindern – dagegen hilft keine Domain-Authentifizierung.

## Schutzmaßnahmen

- Bei sensiblen Anfragen nie allein auf die Absenderadresse vertrauen.
- Antwortadressen prüfen, bevor Sie sensible Informationen senden.
- Verdächtige Mails melden: Die IT kann die Header auswerten.

## Im Ernstfall

Haben Sie auf eine gespoofte Mail reagiert, informieren Sie die IT und – falls es um Geld geht – die Buchhaltung und Bank. Die IT sollte die Mail-Header sichern, die DMARC-Richtlinie überprüfen und andere Empfänger warnen.

## Zusammengefasst

Absender können gefälscht werden. SPF, DKIM und DMARC erschweren das bei der exakten Domain erheblich, schützen aber weder vor ähnlichen Domains noch vor übernommenen Konten. Technik und aufmerksame Menschen ergänzen sich.`,
    checklist: [
      'Absenderadresse nicht als alleinigen Echtheitsbeweis gewertet?',
      'Antwortadresse (Reply-To) geprüft?',
      'Externe Markierung bei angeblich interner Mail beachtet?',
      'IT: SPF, DKIM und DMARC für alle Domains veröffentlicht?',
      'IT: DMARC-Richtlinie schrittweise auf quarantine/reject gestellt?',
      'IT: Lookalike-Domains und Kontoübernahmen gesondert überwacht?',
    ],
    relatedArticleIds: ['spf-dkim-dmarc', 'email-header', 'anzeigename-absender', 'mailserver-schutz'],
    sources: [
      { title: 'RFC 7489 – Domain-based Message Authentication, Reporting, and Conformance (DMARC)', url: 'https://www.rfc-editor.org/rfc/rfc7489', note: RFC_NOTE },
    ],
  },
  {
    id: 'spf-dkim-dmarc',
    title: 'SPF, DKIM und DMARC verständlich erklärt',
    summary: 'Zweck, Funktionsweise und typische Fehlinterpretationen der drei wichtigsten E-Mail-Authentifizierungsverfahren – mit Einstieg für alle und Vertiefung für IT.',
    category: 'Technik',
    audience: 'it',
    level: 'schwer',
    tags: ['SPF', 'DKIM', 'DMARC', 'DNS'],
    body: `## Grundlagen

E-Mail wurde ursprünglich ohne Absenderprüfung entworfen. Damit Empfänger heute besser erkennen können, ob eine Mail wirklich von der angegebenen Domain kommt, gibt es drei sich ergänzende Verfahren. Sie werden im **DNS** veröffentlicht – einem weltweiten Verzeichnis, in dem Domaininhaber Informationen über ihre Domain hinterlegen.

### SPF – Wer darf senden?

**SPF** (Sender Policy Framework) ist eine Liste erlaubter Absenderserver. Der Domaininhaber veröffentlicht zum Beispiel: „Mails von nordwerk.example dürfen nur von diesen Servern kommen.“ Der empfangende Server prüft, ob der einliefernde Server auf der Liste steht. Wichtig: SPF prüft die Adresse aus dem sogenannten **Envelope** (Return-Path), also gewissermaßen den Absender auf dem Umschlag – nicht zwingend die Adresse, die Sie im Mailprogramm sehen.

### DKIM – Ist die Mail signiert und unverändert?

**DKIM** (DomainKeys Identified Mail) fügt jeder Mail eine digitale Signatur hinzu. Der sendende Server signiert mit einem privaten Schlüssel, der öffentliche Schlüssel steht im DNS. Der Empfänger prüft damit, ob die Signatur zur angegebenen Domain passt und ob signierte Teile der Mail unterwegs verändert wurden. DKIM sagt aber nur: „Diese Domain hat signiert.“ Welche Domain das ist (d=), muss nicht die sichtbare Absenderdomain sein.

### DMARC – Passt alles zur sichtbaren Absenderdomain?

**DMARC** (Domain-based Message Authentication, Reporting and Conformance) schließt die Lücke: Es verlangt, dass SPF oder DKIM nicht nur bestanden werden, sondern auch zur **sichtbaren From-Domain passen**. Diese Übereinstimmung heißt **Alignment**. Außerdem legt der Domaininhaber fest, was bei Fehlschlag passieren soll – „none“ (nur beobachten), „quarantine“ (z. B. Spam-Ordner) oder „reject“ (ablehnen) – und erhält Berichte darüber, wer in seinem Namen sendet.

## Vertiefung für IT

### SPF im Detail

Ein SPF-Eintrag ist ein TXT-Record, etwa: v=spf1 ip4:192.0.2.10 include:mailer.example -all. Mechanismen wie ip4, include, a und mx beschreiben erlaubte Quellen; das abschließende all legt das Standardverhalten fest (-all = fail, ~all = softfail). Achten Sie auf das Limit von **zehn DNS-Lookups** pro Auswertung: Zu viele includes führen zu „permerror“ und damit faktisch zu einem Fehlschlag. SPF bricht bei klassischer Weiterleitung, weil dann ein fremder Server einliefert.

### DKIM im Detail

Der öffentliche Schlüssel liegt unter selector._domainkey.domain. Nutzen Sie mindestens 2048-Bit-RSA-Schlüssel, wo möglich, und rotieren Sie Schlüssel regelmäßig über neue Selektoren. DKIM übersteht Weiterleitungen meist, kann aber brechen, wenn Mailinglisten den Betreff oder Text verändern.

### DMARC im Detail

Der DMARC-Record steht unter _dmarc.domain, z. B. v=DMARC1; p=quarantine; rua=mailto:dmarc-berichte@nordwerk.example; adkim=r; aspf=r. Die Aggregatberichte (rua) zeigen, welche Quellen in Ihrem Namen senden und ob sie bestehen. Empfohlenes Vorgehen:

1. Alle legitimen Versanddienste inventarisieren.
2. SPF und DKIM für jeden Dienst einrichten.
3. DMARC mit p=none starten und Berichte mehrere Wochen auswerten.
4. Auf p=quarantine, später p=reject erhöhen, ggf. schrittweise über pct.
5. Für nicht versendende Domains direkt v=spf1 -all und p=reject veröffentlichen.

## Typische Fehlinterpretationen

- **„SPF pass heißt, die Mail ist echt.“** SPF bezieht sich auf den Envelope-Absender. Ohne DMARC-Alignment kann die sichtbare From-Adresse trotzdem gefälscht sein.
- **„DKIM pass heißt, die Absenderdomain hat signiert.“** Es heißt nur, dass irgendeine Domain (d=) signiert hat. Erst DMARC prüft die Übereinstimmung.
- **„Wir haben DMARC, also sind wir geschützt.“** Mit p=none wird nichts blockiert. Und DMARC schützt nur die exakte eigene Domain.
- **„Fail heißt Phishing.“** Fehlkonfigurierte, aber legitime Dienste und Weiterleitungen führen ebenfalls zu Fehlschlägen.
- **„Dann brauchen wir keine Awareness mehr.“** Lookalike-Domains und kompromittierte Konten werden von diesen Verfahren nicht erkannt.

## Erkennungsmerkmale und ihre Grenzen

Im Header „Authentication-Results“ finden Sie Ergebnisse wie spf=pass, dkim=pass header.d=nordwerk.example und dmarc=pass. Ein dmarc=fail bei einer Mail mit Ihrer eigenen Domain ist ein deutlicher Hinweis auf Spoofing. **Grenzen:** Die Ergebnisse sind nur so gut wie der prüfende Server und die veröffentlichten Richtlinien. Ein „pass“ beweist keine guten Absichten.

## Ein fiktives Beispiel

> From: rechnung@sauber-co.example
> Authentication-Results: spf=pass smtp.mailfrom=bounce.newsletter-dienst.example; dkim=pass header.d=newsletter-dienst.example; dmarc=fail header.from=sauber-co.example

SPF und DKIM bestehen – aber für die Domain des Newsletter-Dienstes, nicht für sauber-co.example. Es fehlt das Alignment, DMARC schlägt fehl. Das kann ein falsch eingerichteter, legitimer Dienst sein oder ein Fälschungsversuch. Klärung bringt die Rückfrage beim Absender und die Prüfung der Berichte.

## Schutzmaßnahmen

- Alle eigenen Domains mit SPF, DKIM und DMARC absichern, auch ungenutzte.
- DMARC-Berichte regelmäßig auswerten, nicht nur einrichten.
- Eingehend DMARC-Richtlinien anderer Domains respektieren.
- Ergänzend Lookalike-Monitoring, MFA und Awareness einsetzen.

## Im Ernstfall

Stellen Sie fest, dass Ihre Domain für Spoofing missbraucht wird, prüfen Sie die DMARC-Richtlinie und verschärfen Sie sie nach Auswertung der Berichte. Informieren Sie betroffene Partner und Kunden über einen bekannten Weg und erklären Sie, woran sie echte Mails erkennen.

## Zusammengefasst

SPF prüft den einliefernden Server, DKIM die Signatur, DMARC die Übereinstimmung mit der sichtbaren Domain und die Reaktion bei Fehlschlag. Zusammen erschweren sie Spoofing der exakten Domain erheblich – sie garantieren aber keine Harmlosigkeit und schützen nicht vor ähnlichen Domains oder übernommenen Konten.`,
    checklist: [
      'SPF für jede Domain veröffentlicht, Lookup-Limit eingehalten?',
      'DKIM für alle Versanddienste mit eigenem Selektor aktiv?',
      'DMARC eingerichtet und Berichte (rua) ausgewertet?',
      'Richtlinie schrittweise von none über quarantine zu reject erhöht?',
      'Nicht versendende Domains mit -all und p=reject abgesichert?',
      'Ergebnisse im Header richtig gedeutet (Alignment beachtet)?',
    ],
    relatedArticleIds: ['spoofing-authentifizierung', 'email-header', 'mailserver-schutz'],
    sources: [
      { title: 'RFC 7208 – Sender Policy Framework (SPF)', url: 'https://www.rfc-editor.org/rfc/rfc7208', note: RFC_NOTE },
      { title: 'RFC 6376 – DomainKeys Identified Mail (DKIM) Signatures', url: 'https://www.rfc-editor.org/rfc/rfc6376', note: RFC_NOTE },
      { title: 'RFC 7489 – DMARC', url: 'https://www.rfc-editor.org/rfc/rfc7489', note: RFC_NOTE },
    ],
  },
  {
    id: 'email-header',
    title: 'Grundlegender Aufbau von E-Mail-Headern',
    summary: 'Welche Informationen im Kopf einer E-Mail stehen, wie Sie die wichtigsten Felder lesen und welche Schlüsse daraus zulässig sind – und welche nicht.',
    category: 'Technik',
    audience: 'it',
    level: 'schwer',
    tags: ['Header', 'Analyse', 'Received', 'Authentication-Results'],
    body: `## Grundlagen

Jede E-Mail besteht aus zwei Teilen: dem **Header** (Kopfzeilen) und dem **Body** (Nachrichtentext). Im Mailprogramm sehen Sie nur einen kleinen Teil des Headers: Absender, Empfänger, Betreff und Datum. Der vollständige Header enthält viel mehr – etwa, über welche Server die Mail gelaufen ist und wie die Authentifizierungsprüfungen ausgefallen sind. Für Mitarbeitende reicht es zu wissen, dass es diese Informationen gibt und dass die IT sie bei einer Meldung auswerten kann. Deshalb ist es wichtig, verdächtige Mails über die Melden-Funktion oder **als Anlage** weiterzuleiten: Bei einer normalen Weiterleitung gehen die Originalheader verloren.

### Wo finde ich den Header?

- In Outlook (Desktop): Nachricht öffnen, „Datei“ → „Eigenschaften“ → „Internetkopfzeilen“.
- In vielen Webmailern: Menü der Nachricht → „Original anzeigen“ oder „Quelltext anzeigen“.
- Auf Smartphones ist die Anzeige oft nicht möglich.

## Vertiefung für IT

### Wichtige Felder

- **From:** die sichtbare Absenderadresse. Frei setzbar, durch DMARC schützbar.
- **Reply-To:** Adresse für Antworten. Weicht sie von From ab, ist das bei Betrug ein häufiges Merkmal; bei Newslettern und Ticketsystemen aber normal.
- **Return-Path:** Envelope-Absender, an den Unzustellbarkeitsmeldungen gehen. Wird für SPF verwendet.
- **Received:** Jeder Server, der die Mail weiterreicht, fügt eine Received-Zeile **oben** hinzu. Man liest sie deshalb **von unten nach oben**, um den Weg nachzuvollziehen.
- **Authentication-Results:** Ergebnisse von SPF, DKIM und DMARC, eingetragen vom empfangenden Server.
- **DKIM-Signature:** Signatur mit signierender Domain (d=) und Selektor (s=).
- **Message-ID:** eindeutige Kennung, vom sendenden System erzeugt. Kann Hinweise auf das Versandsystem geben.
- **Date:** vom Absender gesetzt und daher nicht vertrauenswürdig; die Zeitstempel in den Received-Zeilen der eigenen Server sind verlässlicher.
- **X-Header:** zusätzliche, nicht standardisierte Felder, z. B. Spam-Bewertungen. Inhalt und Bedeutung hängen vom System ab.

### Received-Zeilen richtig lesen

Nur die Received-Zeilen, die **Ihre eigenen** Server hinzugefügt haben, sind vertrauenswürdig. Alle Zeilen darunter stammen von Fremden und können gefälscht sein. Der wichtigste Punkt ist der Übergang: die oberste Zeile, in der Ihr Eingangsserver die Mail von einem externen System angenommen hat. Dort stehen der Hostname und die IP-Adresse des einliefernden Servers.

### Authentication-Results interpretieren

Ein typischer Eintrag:

> Authentication-Results: mx.nordwerk.example; spf=pass smtp.mailfrom=lenz-elektro.example; dkim=pass header.d=lenz-elektro.example; dmarc=pass header.from=lenz-elektro.example

Hier passen alle Domains zusammen. Achten Sie darauf, dass Sie nur Authentication-Results Ihres eigenen Servers vertrauen; Angreifer können eigene, gefälschte Zeilen weiter unten einfügen.

## Typische Fehlinterpretationen

- **„Die IP im ersten Received-Header ist der Absender.“** Unterste Zeilen können gefälscht sein. Maßgeblich ist der Übergang zu Ihrer Infrastruktur.
- **„Die Message-ID verrät die Absenderdomain.“** Sie kann frei gesetzt werden.
- **„Ein IP-Standort beweist Herkunft.“** Angreifer nutzen gemietete Server, VPNs und kompromittierte Systeme überall auf der Welt. Geolokalisierung ist ungenau.
- **„X-Spam-Score niedrig heißt sicher.“** Gezielte Angriffe sind oft so gebaut, dass Filter sie durchlassen.

## Erkennungsmerkmale und ihre Grenzen

Hinweise auf eine gefälschte Mail können sein: dmarc=fail bei der eigenen Domain, Reply-To auf eine Freemail-Adresse, ein einliefernder Server, der nicht zum angeblichen Absender passt, oder ein Return-Path auf eine ganz andere Domain. **Grenzen:** Viele legitime Dienste (Newsletter, CRM, Ticketsysteme) senden über Drittanbieter und erzeugen dadurch ähnliche Muster. Header-Analyse liefert Indizien, die im Kontext bewertet werden müssen.

## Ein fiktives Beispiel

Eine Meldung betrifft eine angebliche Mail der Buchhaltung. Der Header zeigt: From buchhaltung@nordwerk.example, Reply-To buchhaltung.freigabe@mailbox-privat.example, spf=fail, dmarc=fail. Die oberste externe Received-Zeile nennt einen Server, der nicht zur Firma gehört. Ergebnis: Spoofing der eigenen Domain. Maßnahmen: Mail aus allen Postfächern entfernen, Absender-IP prüfen, DMARC-Richtlinie verschärfen, Empfänger informieren.

## Schutzmaßnahmen

- Meldungen immer mit Originalheader entgegennehmen (Melde-Button oder Weiterleitung als Anlage).
- Header-Analyse in einem einfachen, dokumentierten Ablauf beschreiben.
- Zeitstempel und Server Ihrer Infrastruktur korrekt synchronisieren (NTP), damit Zeitangaben verlässlich sind.

## Im Ernstfall

Sichern Sie die Originalnachricht inklusive Header, bevor sie gelöscht wird. Suchen Sie nach weiteren Empfängern derselben Kampagne, z. B. über Message-ID-Muster, Betreff oder Absender-IP, und entfernen Sie die Mails zentral.

## Zusammengefasst

Header zeigen Weg und Prüfungsergebnisse einer Mail. Lesen Sie Received-Zeilen von unten nach oben, vertrauen Sie nur Einträgen Ihrer eigenen Server und bewerten Sie Ergebnisse immer im Kontext.`,
    checklist: [
      'Verdächtige Mail als Anlage oder per Melde-Button weitergeleitet?',
      'From, Reply-To und Return-Path verglichen?',
      'Received-Zeilen von unten nach oben gelesen?',
      'Nur Authentication-Results des eigenen Servers berücksichtigt?',
      'Ergebnisse im Kontext statt isoliert bewertet?',
    ],
    relatedArticleIds: ['spf-dkim-dmarc', 'spoofing-authentifizierung', 'incident-response'],
    sources: [
      { title: 'RFC 5322 – Internet Message Format', url: 'https://www.rfc-editor.org/rfc/rfc5322', note: RFC_NOTE },
    ],
  },
  {
    id: 'mailserver-schutz',
    title: 'Schutzmaßnahmen für Mailserver und Postfächer',
    summary: 'Welche technischen und organisatorischen Maßnahmen Phishing-Risiken senken – von Filtern über MFA bis zu klaren Prozessen.',
    category: 'Technik',
    audience: 'it',
    level: 'schwer',
    tags: ['Mailserver', 'Härtung', 'MFA', 'Filter'],
    body: `## Grundlagen

Kein einzelnes Werkzeug verhindert alle Phishing-Angriffe. Wirksam ist ein Zusammenspiel mehrerer Schutzschichten – man spricht von **Defense in Depth** („gestaffelte Verteidigung“). Wenn eine Schicht versagt, fängt die nächste den Angriff ab. Für Mitarbeitende bedeutet das: Filter und Technik helfen, aber sie sind nicht perfekt. Und für die IT bedeutet es: Awareness ersetzt keine Technik, und Technik ersetzt keine Awareness.

### Die Schichten im Überblick

1. **Domain-Schutz:** SPF, DKIM und DMARC für eigene Domains.
2. **Eingangsfilter:** Prüfung von Absender, Inhalt, Links und Anhängen.
3. **Postfach- und Kontoschutz:** MFA, Anomalie-Erkennung, eingeschränkte Weiterleitungsregeln.
4. **Endgeräteschutz:** Updates, Virenschutz, eingeschränkte Rechte, Makro-Richtlinien.
5. **Prozesse:** Meldeweg, Vier-Augen-Prinzip bei Zahlungen, Incident-Response.
6. **Menschen:** Schulung und eine Kultur, in der Melden erwünscht ist.

## Vertiefung für IT

### Eingangsfilter

- **Reputations- und Authentifizierungsprüfung:** DMARC-Richtlinien anderer Domains respektieren, bekannte schlechte Quellen blockieren.
- **Anhangsfilter:** Ausführbare Dateien, Skripte, Verknüpfungen und Disk-Images blockieren. Makro-Dokumente aus externen Quellen in Quarantäne oder mit Warnung zustellen. HTML-Anhänge besonders bewerten.
- **Sandboxing:** Anhänge und Links in einer isolierten Umgebung ausführen und beobachten.
- **Link-Umschreibung und Klickzeitprüfung:** Links werden beim Klick erneut geprüft, weil Seiten oft erst nach der Zustellung bösartig werden. Datenschutz und Transparenz gegenüber den Mitarbeitenden beachten.
- **Externe Kennzeichnung:** Banner oder Betreff-Präfix für externe Mails, Warnung bei Anzeigenamen, die interne Personen imitieren.

### Konto- und Postfachschutz

- **MFA für alle Konten**, bevorzugt phishing-resistente Verfahren (FIDO2-Sicherheitsschlüssel, Passkeys). Push-Verfahren mit Nummernabgleich statt einfacher „Genehmigen“-Taste.
- **Legacy-Protokolle abschalten** (z. B. Basic Auth für IMAP/POP), da sie MFA umgehen können.
- **Automatische Weiterleitungen nach extern** standardmäßig unterbinden; Angreifer richten nach einer Kontoübernahme oft heimliche Regeln ein.
- **Anmeldeanomalien** überwachen: unmögliche Reisen, neue Geräte, ungewöhnliche Länder, neue Postfachregeln.
- **Bedingter Zugriff:** Anmeldung nur von verwalteten Geräten oder aus bestimmten Kontexten.

### Endgeräte

- Zeitnahe Updates von Betriebssystem, Browser und Office.
- Makros aus dem Internet standardmäßig blockieren (Mark-of-the-Web).
- Keine lokalen Administratorrechte im Alltag.
- Dateinamenerweiterungen standardmäßig anzeigen.
- Endpoint Detection and Response (EDR) und zentrale Protokollierung.

### Meldeweg

- Ein gut sichtbarer **Melde-Button** im Mailprogramm, der die Originalnachricht mit Header an ein Funktionspostfach sendet.
- Schnelle Rückmeldung an Meldende („Danke, war Phishing – wurde entfernt“).
- Möglichkeit, gemeldete Mails zentral aus allen Postfächern zu entfernen.

## Typische Fehlinterpretationen

- **„Unser Filter ist gut, also kommt nichts durch.“** Gezielte Angriffe und kompromittierte Partnerkonten umgehen Filter regelmäßig.
- **„MFA macht Phishing unmöglich.“** Echtzeit-Phishing-Proxys und MFA-Fatigue umgehen klassische Verfahren. Phishing-resistente Verfahren sind deutlich robuster.
- **„Link-Umschreibung schützt vor allem.“** Sie hilft, ersetzt aber nicht die Prüfung durch Menschen und kann umgangen werden.

## Erkennungsmerkmale und ihre Grenzen

Technische Indikatoren für einen laufenden Angriff: viele gleichartige Mails an verschiedene Empfänger, neue Weiterleitungsregeln, Anmeldungen von ungewöhnlichen Orten, viele fehlgeschlagene MFA-Anfragen. **Grenzen:** Einzelne Indikatoren erzeugen Fehlalarme. Ein guter Prozess legt fest, wer bewertet und wie schnell reagiert wird.

## Ein fiktives Beispiel

Ein Mitarbeiter meldet unerwartete MFA-Anfragen am späten Abend. Das Monitoring zeigt mehrere Anmeldeversuche mit korrektem Passwort aus einem fremden Netz. Die IT sperrt die Sitzungen, setzt das Passwort zurück, prüft Postfachregeln und stellt fest, dass das Passwort bei einem externen Dienst wiederverwendet wurde. Maßnahmen: Umstellung auf Nummernabgleich bei Push-MFA und Schulung zu Passwortwiederverwendung.

## Schutzmaßnahmen

- SPF, DKIM, DMARC mit Durchsetzung.
- Anhangs- und Linkfilter mit Sandbox.
- MFA für alle, phishing-resistent wo möglich.
- Externe Weiterleitungen und Legacy-Protokolle sperren.
- Melde-Button, Rückmeldung, zentrale Entfernung.
- Zahlungsprozesse mit Vier-Augen-Prinzip und Rückruf.

## Im Ernstfall

Bei einer Kontoübernahme: Sitzungen beenden, Passwort zurücksetzen, MFA-Methoden prüfen, Postfachregeln und Weiterleitungen kontrollieren, versendete Mails sichten und betroffene Empfänger warnen. Details im Artikel zur Incident-Response.

## Zusammengefasst

Mehrere Schutzschichten ergänzen sich: Domain-Schutz, Filter, Kontoschutz, Endgeräte, Prozesse und Menschen. Jede Schicht hat Grenzen – zusammen senken sie das Risiko deutlich.`,
    checklist: [
      'Domain-Authentifizierung mit Durchsetzung aktiv?',
      'Riskante Anhänge blockiert, Makros aus dem Internet gesperrt?',
      'MFA für alle Konten, möglichst phishing-resistent?',
      'Externe Weiterleitungen und Legacy-Protokolle deaktiviert?',
      'Melde-Button mit Rückmeldung und zentraler Entfernung vorhanden?',
      'Anmeldeanomalien und neue Postfachregeln überwacht?',
    ],
    relatedArticleIds: ['spf-dkim-dmarc', 'mfa-betrug', 'incident-response', 'awareness-schulungen'],
  },
];
