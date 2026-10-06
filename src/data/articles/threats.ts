import type { Article } from '../../types/content';

export const threatArticles: Article[] = [
  {
    id: 'rechnungsbetrug',
    title: 'Rechnungs- und Zahlungsbetrug erkennen',
    summary: 'Wie Zahlungsumleitung und gefälschte Rechnungen funktionieren, warum sie oft aus echten Postfächern kommen und welche Prozesse zuverlässig schützen.',
    category: 'Betrugsmaschen',
    audience: 'alle',
    level: 'mittel',
    tags: ['Rechnung', 'Zahlung', 'BEC', 'Buchhaltung'],
    body: `## Worum geht es?

Beim Rechnungs- und Zahlungsbetrug wollen Angreifer nicht Ihr Passwort, sondern direkt Geld. Die häufigste Variante heißt im Fachjargon **Business E-Mail Compromise (BEC)**, auf Deutsch etwa „Kompromittierung geschäftlicher E-Mail“. Dabei schalten sich Angreifer in echte Geschäftsbeziehungen ein und bringen Unternehmen dazu, Zahlungen auf ein falsches Konto zu leisten. Einzelne Fälle können sehr hohe Schäden verursachen, und verlorenes Geld ist oft nur schwer zurückzuholen.

## Wie die Masche abläuft

### Variante 1: Kompromittiertes Postfach eines Partners

Angreifer übernehmen das Postfach eines Lieferanten, zum Beispiel über eine Phishing-Mail. Dann lesen sie – oft wochenlang – mit, welche Rechnungen offen sind und wie die Ansprechpartner schreiben. Im passenden Moment antworten sie im laufenden Mailverlauf: „Bitte beachten Sie unsere neue Bankverbindung.“ Die Mail kommt vom echten Postfach, enthält echte Rechnungsnummern und klingt wie immer. Technische Prüfungen wie SPF, DKIM und DMARC bestehen alle.

### Variante 2: Lookalike-Domain

Angreifer registrieren eine Domain, die der des Lieferanten ähnelt, etwa sauber-c0.example statt sauber-co.example, und schicken von dort eine „korrigierte“ Rechnung.

### Variante 3: Erfundene Rechnungen

Generische Rechnungen ohne echten Geschäftsbezug, oft mit Links zu „Rechnungsportalen“, die eigentlich Zugangsdaten abgreifen, oder mit Schadsoftware im Anhang.

### Variante 4: CEO-Betrug

Die angebliche Geschäftsführung fordert eine dringende, vertrauliche Überweisung, etwa für eine Firmenübernahme. Siehe Artikel „Zeitdruck, Autorität und andere Psychotricks“.

## Erkennungsmerkmale und ihre Grenzen

- **Neue Bankverbindung per E-Mail** – das wichtigste Merkmal überhaupt.
- **Zeitdruck:** „Bitte heute noch“, „die alte Verbindung wird morgen geschlossen“.
- **Ausschluss des Rückrufs:** „Telefon defekt“, „bitte nur per E-Mail antworten“.
- **Kleine Abweichungen** in Domain, Signatur, Tonfall oder Antwortadresse.
- **Ungewöhnliche Kontoinhaber oder Länder**, die nicht zum Lieferanten passen.

**Grenzen:** Unternehmen wechseln tatsächlich manchmal die Bank. Eine korrekte, bekannte Absenderadresse beweist nichts, weil das Postfach übernommen sein kann. Umgekehrt ist nicht jede Rechnung mit Anhang verdächtig. Entscheidend ist, wie mit Änderungen umgegangen wird: **Bankdaten werden nie allein aufgrund einer E-Mail geändert.** Seriöse Partner kündigen Änderungen an und unterstützen eine telefonische Bestätigung.

## Ein fiktives Beispiel

> **Absender:** Lena Hoffmann | Stahlbau Rieger <l.hoffmann@stahlbau-rieger.example>
> **Betreff:** AW: Rechnung 2024-118 – neue Bankverbindung
> „Bitte überweisen Sie die offene Rechnung ab sofort auf das neue Konto im Anhang. Ich bin ab morgen im Urlaub, deshalb wäre die Zahlung heute ideal. Bitte nur per E-Mail antworten, mein Telefon ist gerade defekt.“

Die Adresse ist echt, der Mailverlauf auch. Trotzdem passen drei Warnsignale zusammen: neue Bankverbindung, Zeitdruck und Ausschluss des Rückrufs. Die richtige Reaktion: keine Zahlung auf das neue Konto, Rückruf über die im Lieferantenstamm hinterlegte Nummer, Information an Buchhaltung und IT.

## Schutzmaßnahmen

### Für alle

- Bankdaten nie allein aufgrund einer E-Mail übernehmen.
- Bei Änderungen immer über eine **unabhängig bekannte** Telefonnummer zurückrufen – nicht über die Nummer in der Mail.
- Bei Zeitdruck besonders vorsichtig sein.

### Für Buchhaltung und Einkauf

- **Vier-Augen-Prinzip** für Stammdatenänderungen und größere Zahlungen.
- Dokumentierter Prozess für Bankdatenänderungen inkl. Rückrufprotokoll.
- Bankdaten nur aus dem Lieferantenstamm, nie aus der aktuellen Rechnung verwenden.
- Nutzen Sie, wo verfügbar, die Empfängerüberprüfung Ihrer Bank, die beim Überweisen anzeigt, ob Name und IBAN zusammenpassen. Sie ist ein zusätzlicher Hinweis, kein vollständiger Schutz.
- Lieferanten aktiv informieren, dass Sie Änderungen nur nach Rückruf übernehmen.

### Für die IT

- MFA für alle Postfächer, auch um zu verhindern, dass Ihr eigenes Postfach für Angriffe auf Kunden missbraucht wird.
- Überwachung neuer Postfachregeln und externer Weiterleitungen.
- Warnhinweis bei externen Mails und bei erstmaligen Absendern.

## Im Ernstfall

Wurde Geld auf ein falsches Konto überwiesen, zählt jede Stunde:

1. Sofort die eigene Bank anrufen und einen Rückruf der Überweisung versuchen.
2. Geschäftsführung, Buchhaltung und IT informieren.
3. Anzeige bei der Polizei erstatten.
4. Den echten Partner über einen bekannten Weg informieren – dessen Postfach ist möglicherweise kompromittiert.
5. Beweise sichern: Mails mit vollständigem Header, Rechnungen, Zahlungsbelege.

## Zusammengefasst

Rechnungsbetrug kommt oft aus echten Postfächern und wirkt völlig plausibel. Der zuverlässigste Schutz ist ein klarer Prozess: Bankdatenänderungen nur nach Rückruf über eine unabhängig bekannte Nummer und im Vier-Augen-Prinzip.`,
    checklist: [
      'Werden Bankdaten geändert oder ein neues Konto genannt?',
      'Wird Zeitdruck aufgebaut oder der Rückruf ausgeschlossen?',
      'Absenderdomain Zeichen für Zeichen geprüft?',
      'Rückruf über die Nummer aus dem Lieferantenstamm erfolgt?',
      'Vier-Augen-Prinzip eingehalten?',
      'Bankdaten aus dem System statt aus der Mail verwendet?',
    ],
    relatedArticleIds: ['zeitdruck-autoritaet', 'spoofing-authentifizierung', 'nach-dem-klick'],
  },
  {
    id: 'qr-phishing',
    title: 'QR-Phishing (Quishing) erkennen',
    summary: 'Warum QR-Codes Linkziele verbergen, wie Angreifer sie in E-Mails und auf Plakaten einsetzen und wie Sie QR-Codes sicher nutzen.',
    category: 'Betrugsmaschen',
    audience: 'alle',
    level: 'leicht',
    tags: ['QR-Code', 'Smartphone', 'Quishing'],
    body: `## Worum geht es?

Ein **QR-Code** ist ein quadratisches Muster, das eine Information – meist eine Webadresse – in maschinenlesbarer Form enthält. Man scannt ihn mit der Smartphone-Kamera und wird zur hinterlegten Adresse geführt. QR-Codes sind praktisch: auf Speisekarten, Parkautomaten, Plakaten oder Tickets. Genau deshalb nutzen Angreifer sie. Phishing mit QR-Codes wird auch **Quishing** genannt (aus „QR“ und „Phishing“).

## Warum QR-Codes für Angreifer attraktiv sind

- **Das Ziel ist unsichtbar.** Anders als bei einem Link können Sie nicht mit der Maus darüberfahren, um das Ziel zu sehen.
- **Wechsel aufs Smartphone.** Die Prüfung verlagert sich vom Firmen-PC, der durch Filter geschützt ist, auf ein Smartphone, das oft weniger Schutz hat und dessen kleiner Bildschirm Adressen abschneidet.
- **Filter-Umgehung.** Mailfilter erkennen Links in Bildern schlechter als normale Textlinks.
- **Vertrauen.** QR-Codes sind im Alltag so verbreitet, dass viele sie ohne nachzudenken scannen.

## Typische Szenarien

- **E-Mail mit QR-Code:** „Scannen Sie den Code, um Ihre MFA neu einzurichten“, „um Ihren Parkausweis zu registrieren“ oder „um ein Dokument zu öffnen“.
- **Überklebte Codes:** Auf Parkautomaten, Ladesäulen oder Plakaten werden echte Codes mit Aufklebern überklebt, die zu gefälschten Zahlungsseiten führen.
- **Briefe und Flyer:** Gefälschte Schreiben von Behörden, Banken oder Paketdiensten mit QR-Code zur „Zahlung“ oder „Verifizierung“.

## Erkennungsmerkmale und ihre Grenzen

- Ein QR-Code in einer **E-Mail**, obwohl Sie die Mail am PC lesen und ein Link viel einfacher wäre.
- Nach dem Scannen wird eine **Anmeldung mit Firmenzugangsdaten** oder eine **Zahlung** verlangt.
- Druck, Drohung oder Frist im Begleittext.
- Ein physischer Code ist **überklebt**, schief, beschädigt oder passt optisch nicht zum Umfeld.
- Die angezeigte Adresse vor dem Öffnen gehört nicht zum angeblichen Anbieter.

**Grenzen:** QR-Codes sind nicht per se gefährlich. Ein Code, der zur Wochenkarte der Kantine oder ins Gäste-WLAN eines Hotels führt, ist normal. Gefährlich wird es, wenn der Code zu einer Anmeldung, Zahlung oder App-Installation führt und Sie den Absender oder Ort nicht unabhängig prüfen können. Die meisten Kamera-Apps zeigen die Adresse vor dem Öffnen an – nutzen Sie diese Vorschau.

## Ein fiktives Beispiel

> **Absender:** Facility Management <facility@nordwerk-parken.example>
> **Betreff:** Pflicht: Neuregistrierung Ihres Parkausweises bis Freitag
> „Scannen Sie den QR-Code im Anhang mit Ihrem Smartphone und melden Sie sich mit Ihren Nordwerk-Zugangsdaten an. Nicht registrierte Fahrzeuge werden ab Montag abgeschleppt.“

Fremde Domain, Drohung, Frist und eine Anmeldung mit Firmenzugangsdaten über einen QR-Code. Die sichere Reaktion: nicht scannen, beim Facility Management über den bekannten Weg nachfragen und die Mail melden.

## Schutzmaßnahmen

- **Vorschau nutzen:** Lassen Sie sich die Adresse anzeigen, bevor Sie sie öffnen, und prüfen Sie die Domain (von rechts nach links lesen).
- **Keine Zugangsdaten nach QR-Scan:** Werden Firmenzugangsdaten verlangt, abbrechen und den Dienst über ein Lesezeichen oder die offizielle App öffnen.
- **Zahlungen über offizielle Apps:** Parken oder Laden lieber über die bekannte App des Betreibers.
- **Physische Codes prüfen:** Auf Aufkleber, Überklebungen und Beschädigungen achten.
- **Firmen-Smartphones schützen:** Updates installieren, Apps nur aus offiziellen Stores, Mobilgeräte-Management nutzen, wenn vorhanden.

### Für die IT

QR-Codes in Mails können Filter umgehen. Moderne Filter können Bilder analysieren und QR-Codes auslesen. Hinweise in Schulungen und eine Richtlinie, dass interne Abteilungen keine Anmeldungen per QR-Code verlangen, helfen zusätzlich.

## Im Ernstfall

Wenn Sie nach einem QR-Scan Zugangsdaten eingegeben haben, ändern Sie das Passwort sofort über den bekannten Weg und melden Sie den Vorfall der IT. Haben Sie Zahlungsdaten eingegeben, rufen Sie Ihre Bank über die Nummer auf der Karte an und lassen Sie die Karte sperren. Wurde eine App installiert, nutzen Sie das Gerät nicht weiter für Firmenzwecke und informieren Sie die IT.

## Zusammengefasst

QR-Codes verbergen ihr Ziel und verlagern die Prüfung aufs Smartphone. Nutzen Sie die Adressvorschau, geben Sie nach einem Scan keine Zugangsdaten ein und öffnen Sie wichtige Dienste über bekannte Wege. Ein QR-Code an sich ist aber kein Warnsignal.`,
    checklist: [
      'Ist ein QR-Code an dieser Stelle überhaupt sinnvoll?',
      'Adressvorschau vor dem Öffnen geprüft?',
      'Verlangt die Seite Zugangsdaten, Zahlung oder App-Installation?',
      'Physischen Code auf Überklebung geprüft?',
      'Dienst lieber über offizielle App oder Lesezeichen geöffnet?',
    ],
    relatedArticleIds: ['links-domains', 'smishing-messenger', 'mfa-betrug'],
  },
  {
    id: 'mfa-betrug',
    title: 'MFA-Betrug: Wenn der zweite Faktor angegriffen wird',
    summary: 'Wie Angreifer Multi-Faktor-Authentifizierung umgehen – durch Anfragen-Flut, Code-Abfrage oder Echtzeit-Phishing – und welche Verfahren besser schützen.',
    category: 'Betrugsmaschen',
    audience: 'alle',
    level: 'mittel',
    tags: ['MFA', 'Authenticator', 'Passkeys', 'Codes'],
    body: `## Worum geht es?

**Multi-Faktor-Authentifizierung (MFA)**, oft auch Zwei-Faktor-Authentifizierung genannt, bedeutet: Für eine Anmeldung reicht das Passwort allein nicht. Sie brauchen zusätzlich einen zweiten Nachweis, zum Beispiel einen Code per App oder SMS, eine Bestätigung in einer Authenticator-App oder einen Sicherheitsschlüssel. MFA ist eine der wirksamsten Schutzmaßnahmen gegen Kontoübernahmen. Weil sie so wirksam ist, versuchen Angreifer gezielt, sie zu umgehen. Dafür brauchen sie fast immer Ihre Mithilfe.

## Die häufigsten Angriffsmethoden

### MFA-Fatigue (Anfragen-Flut)

Angreifer kennen bereits Ihr Passwort, etwa aus einem früheren Datenleck. Sie lösen immer wieder Anmeldungen aus, sodass Ihr Smartphone Bestätigungsanfragen anzeigt – oft spätabends. Die Hoffnung: Sie tippen irgendwann genervt oder aus Versehen auf „Genehmigen“. Manchmal ruft zusätzlich ein angeblicher IT-Mitarbeiter an oder schreibt: „Bitte einfach bestätigen, wir machen gerade ein Update.“

### Code-Abfrage

Ein Anrufer gibt sich als Helpdesk, Bank oder Dienstleister aus und bittet Sie, einen gerade erhaltenen Code „zur Verifizierung“ vorzulesen. Tatsächlich hat der Angreifer selbst eine Anmeldung oder ein Zurücksetzen ausgelöst – mit Ihrem Code übernimmt er das Konto. Die SMS mit dem Code ist dabei echt, die Täuschung liegt im Anruf.

### Echtzeit-Phishing (Adversary in the Middle)

Eine gefälschte Anmeldeseite leitet alles, was Sie eingeben, sofort an die echte Seite weiter – Passwort **und** Einmal-Code. Der Angreifer erhält so eine gültige Sitzung. Für Sie sieht alles normal aus. Gegen diese Methode helfen Codes und einfache Push-Bestätigungen nicht zuverlässig.

### Registrierung eigener MFA-Methoden

Nach einer erfolgreichen Anmeldung registrieren Angreifer ihr eigenes Gerät als zusätzlichen Faktor, um dauerhaft Zugriff zu behalten.

## Erkennungsmerkmale und ihre Grenzen

- **MFA-Anfragen, die Sie nicht selbst ausgelöst haben.** Das ist das wichtigste Warnsignal: Jemand kennt dann vermutlich Ihr Passwort.
- **Jemand bittet um einen Code oder eine Bestätigung.** Kein seriöser Helpdesk und keine Bank fragt danach.
- **Mails, die zur „Bestätigung“ oder „Beibehaltung“ von MFA auffordern** und auf eine Anmeldeseite verlinken.
- **Benachrichtigung über eine neue Anmeldemethode**, die Sie nicht eingerichtet haben.

**Grenzen:** Echte Sicherheitsbenachrichtigungen gibt es – etwa „Neue Anmeldemethode hinzugefügt“, nachdem Sie Ihr neues Handy eingerichtet haben. Entscheidend ist, ob die Nachricht zu Ihrer eigenen Handlung passt. Auch echte Code-SMS sind normal, wenn Sie sich gerade selbst anmelden. Gefährlich werden sie erst, wenn jemand anderes den Code von Ihnen haben will.

## Ein fiktives Beispiel

> **Messenger, 22:47 Uhr, unbekannte Nummer:** „Hi, hier ist Max vom IT-Support. Du bekommst gleich ein paar Bestätigungsanfragen in deiner Authenticator-App. Bitte einfach auf ‚Genehmigen‘ tippen, sonst wird dein Konto gesperrt.“

Die IT bittet niemals darum, Anfragen zu genehmigen, die Sie nicht selbst ausgelöst haben. Richtig ist: alle Anfragen ablehnen, nicht antworten und den Helpdesk über die bekannte Nummer informieren. Das Passwort muss geändert werden, denn der Angreifer kennt es offenbar.

## Schutzmaßnahmen

### Für alle

- **Nur bestätigen, was Sie selbst ausgelöst haben.** Im Zweifel ablehnen.
- **Codes niemals weitergeben** – nicht am Telefon, nicht per Chat, nicht per Mail.
- **Unerwartete Anfragen melden.** Sie sind ein Hinweis, dass Ihr Passwort bekannt ist.
- **Passwörter nicht wiederverwenden** und einen Passwortmanager nutzen.

### Für die IT

- **Nummernabgleich** bei Push-Verfahren: Die Anmeldeseite zeigt eine Zahl, die in der App eingegeben werden muss. Das erschwert blindes Bestätigen.
- **Phishing-resistente Verfahren** wie FIDO2-Sicherheitsschlüssel oder Passkeys einführen. Sie sind an die echte Domain gebunden und funktionieren auf einer gefälschten Seite nicht.
- Begrenzung und Überwachung wiederholter MFA-Anfragen.
- Benachrichtigung bei neuen Anmeldemethoden und strenge Prüfung von Helpdesk-Zurücksetzungen.

## Im Ernstfall

Haben Sie eine fremde Anfrage genehmigt oder einen Code weitergegeben: Rufen Sie sofort den Helpdesk über die bekannte Nummer an. Die IT muss alle Sitzungen beenden, das Passwort zurücksetzen, registrierte MFA-Methoden prüfen und Postfachregeln kontrollieren. Je schneller das geschieht, desto weniger Zeit haben Angreifer.

## Zusammengefasst

MFA schützt sehr gut – solange niemand den zweiten Faktor herausgibt. Bestätigen Sie nur selbst ausgelöste Anmeldungen, geben Sie nie Codes weiter und melden Sie unerwartete Anfragen. Phishing-resistente Verfahren wie Passkeys bieten den stärksten Schutz.`,
    checklist: [
      'Habe ich diese Anmeldung selbst ausgelöst?',
      'Fragt mich jemand nach einem Code oder einer Bestätigung?',
      'Unerwartete MFA-Anfragen abgelehnt und gemeldet?',
      'Passwort nach unerwarteten Anfragen geändert?',
      'Phishing-resistente Methoden (Passkey, Sicherheitsschlüssel) genutzt, wo möglich?',
    ],
    relatedArticleIds: ['telefonbetrug-helpdesk', 'links-domains', 'nach-dem-klick', 'mailserver-schutz'],
  },
  {
    id: 'smishing-messenger',
    title: 'SMS- und Messenger-Phishing',
    summary: 'Wie Betrug per SMS (Smishing) und Messenger funktioniert, welche Maschen besonders verbreitet sind und wie Sie sich auf dem Smartphone schützen.',
    category: 'Betrugsmaschen',
    audience: 'alle',
    level: 'leicht',
    tags: ['SMS', 'Messenger', 'Smishing', 'Smartphone'],
    body: `## Worum geht es?

Phishing findet längst nicht mehr nur per E-Mail statt. Bei **Smishing** (aus „SMS“ und „Phishing“) kommen betrügerische Nachrichten per SMS, bei Messenger-Phishing über Chat-Apps oder interne Team-Chats. Auf dem Smartphone ist die Gefahr besonders groß: Der Bildschirm ist klein, Adressen werden abgekürzt, Nachrichten werden oft nebenbei gelesen und viele Menschen vertrauen SMS und Chats mehr als E-Mails.

## Häufige Maschen

### Paket-SMS

„Ihr Paket konnte nicht zugestellt werden“, „Lieferadresse unvollständig“, „Zollgebühr offen“. Der Link führt zu einer Seite, die Daten, Kartendaten oder die Installation einer App verlangt. Solche Apps können Schadsoftware sein, die weitere SMS verschickt oder Bankdaten ausliest.

### Bank- und Konto-SMS

„Ihr Online-Banking wurde eingeschränkt“, „Bestätigen Sie Ihre Identität“. Ziel sind Banking-Zugangsdaten und Freigabecodes.

### „Hallo Mama, Hallo Papa“

Eine unbekannte Nummer behauptet, ein Familienmitglied mit neuem Handy zu sein. Nach kurzem Austausch kommt die Bitte um eine dringende Überweisung.

### Chef- oder Kollegen-Masche im Messenger

Ein Profil mit Namen und Foto einer Führungskraft schreibt von einer neuen Nummer und bittet um vertrauliche Hilfe, Geschenkkarten oder Zahlungen.

### Interne Chats und Gastkonten

In Team-Chats können externe Gastkonten oder übernommene Konten auftauchen, die um Zugangsdaten oder das Öffnen von Dateien bitten.

## Erkennungsmerkmale und ihre Grenzen

- **Absendernamen in SMS sind frei wählbar.** Eine SMS kann als „Bank-Info“ oder „Nordwerk“ erscheinen und trotzdem gefälscht sein. Manchmal landet sie sogar im selben Verlauf wie echte Nachrichten.
- **Kurze, fremde Links** ohne erkennbaren Bezug zum Anbieter.
- **Keine konkreten Angaben:** kein Händler, keine Sendungsnummer, kein Name.
- **Neue Nummer plus Bitte um Geld oder Daten.**
- **Aufforderung, eine App außerhalb des offiziellen Stores zu installieren.**
- **Markierung „extern“ oder „Gast“** im Firmenchat bei angeblich internen Personen.

**Grenzen:** Echte SMS gibt es viele: Abholcodes für Packstationen, Anmeldecodes, Terminbestätigungen. Sie enthalten meist keinen Link oder verweisen auf die offizielle App. Ein echter Anmeldecode ist normal, wenn Sie sich gerade selbst anmelden. Menschen wechseln auch wirklich ihre Nummer – ein kurzer Anruf über die bekannte, alte Nummer klärt das.

## Ein fiktives Beispiel

> **SMS von „Bank-Info“:** „Ihr Online-Banking wurde aus Sicherheitsgründen eingeschränkt. Bitte bestätigen Sie Ihre Identität innerhalb von 12 Std.: banking-check.example/id“

Keine Bank wird genannt, es gibt eine Frist und einen fremden Link. Die sichere Reaktion: Link nicht öffnen, die Banking-App oder die bekannte Website selbst öffnen und die SMS löschen.

## Schutzmaßnahmen

- **Links aus unerwarteten SMS nicht öffnen.** Nutzen Sie stattdessen die offizielle App oder ein Lesezeichen.
- **Apps nur aus offiziellen Stores** installieren und die Installation aus unbekannten Quellen deaktiviert lassen.
- **Rückruf über bekannte Nummern** bei Bitten um Geld oder Daten.
- **Kein Teilen von Codes** – nie, egal wer fragt.
- **Smartphone aktuell halten** und, falls vorhanden, Mobilgeräte-Management der Firma nutzen.
- **Melden:** Viele Messenger bieten eine Melde- und Blockierfunktion. Firmeninterne Vorfälle gehören an die IT.

### Für die IT

- Gastzugänge in Team-Chats klar kennzeichnen und einschränken.
- Richtlinie: Interne Stellen fragen nie per Chat nach Zugangsdaten oder Codes.
- Firmen-Smartphones mit Updates und App-Richtlinien verwalten.

## Im Ernstfall

- **Daten eingegeben:** Passwort ändern, bei Bankdaten die Bank über die Nummer auf der Karte anrufen.
- **App installiert:** Flugmodus aktivieren, App nicht weiter nutzen, IT bzw. bei privaten Geräten eine Fachwerkstatt oder den Hersteller-Support fragen; Bank informieren.
- **Geld überwiesen:** sofort die Bank kontaktieren und Anzeige erstatten.
- **Firmengerät oder Firmenkonto betroffen:** IT sofort informieren.

## Zusammengefasst

SMS und Messenger sind beliebte Angriffswege, weil Absender leicht zu fälschen sind und man auf dem Smartphone schnell reagiert. Öffnen Sie keine Links aus unerwarteten Nachrichten, prüfen Sie Bitten um Geld oder Daten über bekannte Wege und geben Sie niemals Codes weiter.`,
    checklist: [
      'Erwarte ich diese SMS oder Nachricht?',
      'Enthält sie einen fremden Link oder fordert eine App-Installation?',
      'Fehlen konkrete Angaben wie Händler, Sendungsnummer oder Name?',
      'Neue Nummer plus Bitte um Geld oder Daten?',
      'Über offizielle App oder bekannte Nummer geprüft?',
      'Niemals Codes weitergegeben?',
    ],
    relatedArticleIds: ['qr-phishing', 'mfa-betrug', 'zeitdruck-autoritaet', 'telefonbetrug-helpdesk'],
  },
  {
    id: 'telefonbetrug-helpdesk',
    title: 'Telefonbetrug und Helpdesk-Imitation',
    summary: 'Wie Betrüger am Telefon vorgehen (Vishing), warum angezeigte Nummern gefälscht sein können und wie ein sicherer Rückruf funktioniert.',
    category: 'Betrugsmaschen',
    audience: 'alle',
    level: 'mittel',
    tags: ['Telefon', 'Vishing', 'Helpdesk', 'Fernwartung'],
    body: `## Worum geht es?

Beim **Vishing** (aus „Voice“ und „Phishing“) nutzen Angreifer das Telefon. Ein Anruf wirkt persönlicher und dringlicher als eine E-Mail, und viele Menschen fühlen sich verpflichtet, einer freundlichen Stimme zu helfen. Häufig geben sich Betrüger als IT-Helpdesk, als Support eines bekannten Softwareherstellers, als Bank oder als Behörde aus. Oft wird ein Anruf mit einer E-Mail oder SMS kombiniert, um glaubwürdiger zu wirken.

## Typische Maschen

### Falscher interner Helpdesk

„Hallo, hier ist die IT. Wir sehen auffällige Aktivitäten auf Ihrem Konto. Ich schicke Ihnen gleich einen Code, bitte lesen Sie ihn mir vor.“ Oder: „Bitte bestätigen Sie die Anfragen in Ihrer Authenticator-App.“ Ziel ist die Übernahme Ihres Kontos.

### Tech-Support-Betrug

Eine Mail, ein Pop-up im Browser oder ein Anruf warnt vor einem angeblichen Virus. Sie sollen eine Hotline anrufen. Ein „Techniker“ bittet Sie, eine Fernwartungssoftware zu installieren, und hat dann vollen Zugriff auf Ihr Gerät. Oft wird anschließend Geld für die angebliche „Reparatur“ verlangt.

### Angriff auf den Helpdesk selbst

Umgekehrt rufen Angreifer beim echten Helpdesk an und geben sich als Mitarbeitende aus: „Ich habe mein Handy verloren, bitte setzen Sie meine MFA zurück.“ Helpdesks brauchen daher sichere Verfahren zur Identitätsprüfung.

### Bank- oder Polizeianruf

Angebliche Bankmitarbeitende oder Polizisten fordern dazu auf, Geld auf ein „sicheres Konto“ zu überweisen oder TANs zu nennen.

## Erkennungsmerkmale und ihre Grenzen

- **Unaufgeforderter Anruf** mit einem Sicherheitsproblem.
- **Bitte um Codes, Passwörter oder Bestätigungen.**
- **Bitte, Software zu installieren** oder Fernzugriff zu gewähren.
- **Druck und Angst:** „Wenn Sie jetzt nicht handeln, gehen Daten verloren.“
- **Rückruf wird erschwert:** „Bleiben Sie in der Leitung“, „Legen Sie nicht auf“.

**Grenzen:** Die **angezeigte Telefonnummer kann gefälscht sein** (Call-ID-Spoofing). Eine bekannte Nummer im Display beweist also nicht, wer anruft. Umgekehrt ruft der echte Helpdesk durchaus an – etwa zu einem Ticket, das Sie eröffnet haben. Er wird aber nie nach Ihrem Passwort oder einem Code fragen und hat kein Problem damit, wenn Sie über die bekannte Nummer zurückrufen.

## Der sichere Rückruf

Die wichtigste Technik gegen Telefonbetrug ist der **Rückruf über einen unabhängig bekannten Weg**:

1. Beenden Sie das Gespräch höflich: „Ich rufe Sie über die offizielle Nummer zurück.“
2. Suchen Sie die Nummer selbst heraus – im Intranet, auf Ihrer Bankkarte, im internen Telefonbuch.
3. Rufen Sie dort an und fragen Sie nach dem Vorgang.

Verwenden Sie **nie** eine Nummer, die Ihnen der Anrufer nennt oder die in einer verdächtigen Mail steht. Und legen Sie nach dem Gespräch zuerst richtig auf: Manche Betrüger halten die Leitung offen und spielen einen Freiton ab.

## Ein fiktives Beispiel

> Ein „Helpdesk-Mitarbeiter“ ruft an: Es gebe Probleme mit Ihrem Konto. Kurz darauf kommt eine SMS: „Ihr Code zum Zurücksetzen des Kontos lautet 771 204. Geben Sie diesen Code niemals weiter.“ Der Anrufer bittet: „Lesen Sie mir den Code bitte vor, damit ich Sie verifizieren kann.“

Die SMS ist vermutlich echt – ausgelöst vom Angreifer. Der Anruf ist der Betrug. Richtig ist: Code nicht nennen, auflegen, den Helpdesk über die bekannte Nummer zurückrufen und den Vorfall melden.

## Schutzmaßnahmen

### Für alle

- Keine Passwörter, Codes oder TANs am Telefon nennen.
- Keine Fernwartungssoftware auf Bitten unbekannter Anrufer installieren.
- Bei Zweifeln auflegen und über eine bekannte Nummer zurückrufen.
- Auffällige Anrufe der IT melden – oft rufen Betrüger mehrere Kolleginnen und Kollegen an.

### Für Helpdesks

- Verbindliches Verfahren zur Identitätsprüfung, z. B. Rückruf auf die im Verzeichnis hinterlegte Nummer oder Bestätigung durch die Führungskraft.
- MFA-Zurücksetzungen nur nach strenger Prüfung und mit Benachrichtigung an den Nutzer.
- Offen kommunizieren: „Wir fragen Sie nie nach Ihrem Passwort oder einem Code.“
- Fernwartung nur mit bekannten Werkzeugen und nur auf Anfrage des Nutzers.

## Im Ernstfall

Haben Sie einen Code genannt, ein Passwort verraten oder Fernzugriff gewährt: Trennen Sie das Gerät vom Netzwerk, wenn Fernzugriff besteht, und rufen Sie sofort den Helpdesk über die bekannte Nummer an. Ändern Sie Passwörter von einem anderen, sicheren Gerät aus. Bei Bankdaten informieren Sie sofort Ihre Bank.

## Zusammengefasst

Am Telefon wirken Betrüger besonders überzeugend, und angezeigte Nummern können gefälscht sein. Nennen Sie nie Codes oder Passwörter, installieren Sie keine Fernwartung auf fremde Bitte hin und nutzen Sie den Rückruf über eine selbst herausgesuchte Nummer.`,
    checklist: [
      'Kam der Anruf unaufgefordert?',
      'Werden Codes, Passwörter oder Fernzugriff verlangt?',
      'Wird Druck aufgebaut oder Auflegen erschwert?',
      'Aufgelegt und über selbst herausgesuchte Nummer zurückgerufen?',
      'Auffälligen Anruf der IT gemeldet?',
    ],
    relatedArticleIds: ['mfa-betrug', 'zeitdruck-autoritaet', 'smishing-messenger'],
  },
];
