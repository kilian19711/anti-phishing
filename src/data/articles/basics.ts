import type { Article } from '../../types/content';

export const basicArticles: Article[] = [
  {
    id: 'phishing-grundlagen',
    title: 'Phishing und Social Engineering verstehen',
    summary: 'Was Phishing ist, warum es funktioniert und wie Sie mit einem einfachen Prüfschema verdächtige Nachrichten erkennen, ohne jede E-Mail für gefährlich zu halten.',
    category: 'Grundlagen',
    audience: 'alle',
    level: 'leicht',
    tags: ['Einstieg', 'Social Engineering', 'Prüfschema'],
    body: `## Worum geht es?

**Phishing** ist ein Kunstwort aus „Password“ und „Fishing“. Gemeint sind Nachrichten, mit denen Angreifer Menschen zu einer Handlung bewegen wollen, die ihnen schadet: ein Passwort auf einer gefälschten Seite eingeben, eine Datei mit Schadsoftware öffnen, Geld überweisen oder vertrauliche Informationen herausgeben. Phishing kommt am häufigsten per E-Mail, aber auch per SMS, Messenger, Telefon oder über QR-Codes.

Phishing ist eine Form von **Social Engineering**. Das bedeutet: Angreifer manipulieren nicht in erster Linie Technik, sondern Menschen. Sie nutzen ganz normale menschliche Eigenschaften aus – Hilfsbereitschaft, Respekt vor Vorgesetzten, Neugier, Angst vor Nachteilen oder den Wunsch, Aufgaben schnell zu erledigen. Das ist wichtig zu verstehen: Wer auf Phishing hereinfällt, ist nicht „dumm“. Gute Angriffe sind darauf ausgelegt, im hektischen Arbeitsalltag glaubwürdig zu wirken.

### Massen-Phishing und gezielte Angriffe

Man unterscheidet grob zwei Arten. **Massen-Phishing** geht an sehr viele Empfänger gleichzeitig, ist oft allgemein formuliert („Sehr geehrter Kunde“) und setzt darauf, dass ein kleiner Prozentsatz reagiert. **Spear-Phishing** dagegen richtet sich gezielt an eine Person oder Abteilung. Angreifer recherchieren vorher, etwa in Karrierenetzwerken oder auf der Firmenwebsite, und nutzen echte Namen, Projekte oder Abläufe. Solche Nachrichten sind deutlich schwerer zu erkennen.

## Warum Phishing funktioniert

Angreifer bauen ihre Nachrichten meist nach einem ähnlichen Muster auf. Sie erzeugen einen **Anlass** (Paket, Rechnung, Sicherheitswarnung), einen **Druck** (Frist, Drohung, Autorität) und eine **gewünschte Handlung** (klicken, öffnen, zahlen, antworten). Je stärker der Druck, desto weniger Zeit bleibt für eine ruhige Prüfung. Genau diese Prüfung ist aber Ihr wirksamster Schutz.

Hinzu kommt: Technische Filter fangen sehr viele Phishing-Mails ab, aber nie alle. Gerade gut gemachte, gezielte Nachrichten oder Nachrichten aus echten, aber gekaperten Postfächern kommen oft durch. Deshalb ist der Mensch eine wichtige zusätzliche Schutzschicht – nicht die einzige, aber eine wertvolle.

## Erkennungsmerkmale und ihre Grenzen

Die folgenden Merkmale sind **Hinweise**, keine Beweise. Erst die Kombination mehrerer Merkmale und der Kontext ergeben ein belastbares Bild.

- **Unerwarteter Anlass:** Sie haben nichts bestellt, keinen Reset angefordert, kein Ticket eröffnet.
- **Druck:** kurze Fristen, Drohungen mit Sperrung, Mahnung oder Konsequenzen.
- **Ungewöhnliche Aufforderung:** Passwort eingeben, Makros aktivieren, Bankdaten ändern, Geschenkkarten kaufen, Codes weitergeben.
- **Abweichende Absender- oder Linkdomain:** Der Anzeigename passt, die tatsächliche Adresse aber nicht.
- **Ausschluss von Rückfragen:** „Bitte nur per E-Mail antworten“, „sprechen Sie mit niemandem darüber“.

**Grenzen:** Rechtschreibfehler, eine allgemeine Anrede oder ein dringender Ton beweisen allein nichts. Auch echte Kolleginnen und Kollegen schreiben mal fehlerhaft oder eilig. Umgekehrt sind moderne Phishing-Mails oft fehlerfrei, persönlich und professionell gestaltet. Eine bekannte Absenderadresse ist ebenfalls kein Beweis, weil Absender gefälscht oder echte Postfächer übernommen werden können.

## Ein einfaches Prüfschema

Wenn eine Nachricht Sie zu einer Handlung auffordert, stellen Sie sich drei Fragen:

1. **Erwarte ich das?** Passt die Nachricht zu etwas, das ich selbst getan oder vereinbart habe?
2. **Was soll ich tun – und wäre das normal?** Würde dieser Absender auf diesem Weg genau das von mir verlangen?
3. **Kann ich es unabhängig prüfen?** Kann ich den Absender über einen Weg erreichen, den ich selbst kenne (Telefonnummer aus dem Adressbuch, Lesezeichen, Intranet)?

Wenn Sie eine der Fragen nicht sicher beantworten können, handeln Sie nicht über die Nachricht selbst, sondern über den unabhängigen Weg. Das kostet meist nur eine Minute.

## Ein fiktives Beispiel

> **Absender:** „IT-Service“ <service@nordwerk-helpdesk.example>
> **Betreff:** Ihr Passwort läuft heute ab
> „Bestätigen Sie Ihr aktuelles Passwort über das folgende Portal, um es zu behalten.“

Die Firmendomain lautet in diesem Beispiel nordwerk.example. Die Absenderdomain ist nur ähnlich. Der Ablauf („Passwort bestätigen, um es zu behalten“) ist unüblich und zielt auf die Eingabe des Passworts. Eine sichere Reaktion: nicht klicken, die Nachricht melden und das Passwort bei Bedarf nur über den bekannten Weg ändern.

## Schutzmaßnahmen

- Öffnen Sie wichtige Dienste über eigene Lesezeichen statt über Links aus Nachrichten.
- Nutzen Sie die Melden-Funktion Ihres Mailprogramms. Eine Meldung zu viel ist besser als eine zu wenig.
- Aktivieren Sie Multi-Faktor-Authentifizierung (MFA), wo immer möglich, und bestätigen Sie nie Anfragen, die Sie nicht selbst ausgelöst haben.
- Halten Sie Betriebssystem, Browser und Programme aktuell – Updates schließen Lücken, die Schadsoftware ausnutzt.
- Klären Sie ungewöhnliche Zahlungs- oder Datenanfragen immer über einen zweiten, unabhängigen Kanal.

## Im Ernstfall

Wenn Sie geklickt, Daten eingegeben oder eine Datei geöffnet haben: Ruhe bewahren und schnell handeln. Melden Sie den Vorfall sofort der IT – je früher, desto besser lassen sich Schäden begrenzen. Ändern Sie betroffene Passwörter über den bekannten Weg. Bei geöffneten Dateien trennen Sie das Gerät vom Netzwerk, lassen es aber eingeschaltet. Niemand wird Ihnen einen Vorwurf machen, wenn Sie einen Fehler schnell melden; verschwiegene Vorfälle sind das eigentliche Risiko. Ausführliche Schritte finden Sie im Artikel „Nach dem Klick: Was jetzt zu tun ist“.

## Zusammengefasst

Phishing nutzt menschliche Reaktionen, nicht nur technische Lücken. Achten Sie auf die Kombination aus unerwartetem Anlass, Druck und ungewöhnlicher Aufforderung, und prüfen Sie im Zweifel über einen unabhängigen Weg. Einzelne Merkmale allein sind kein Beweis – weder für Phishing noch für Echtheit.`,
    checklist: [
      'Erwarte ich diese Nachricht?',
      'Ist die verlangte Handlung für diesen Absender und Kanal üblich?',
      'Stimmt die tatsächliche Absender- und Linkdomain?',
      'Werden Druck, Geheimhaltung oder Ausschluss von Rückfragen eingesetzt?',
      'Habe ich über einen unabhängig bekannten Weg nachgefragt?',
      'Im Zweifel: melden statt klicken.',
    ],
    relatedArticleIds: ['zeitdruck-autoritaet', 'anzeigename-absender', 'sicher-melden', 'legitim-ungewoehnlich'],
  },
  {
    id: 'anzeigename-absender',
    title: 'Anzeigename und tatsächlicher Absender',
    summary: 'Warum der angezeigte Name in E-Mails frei wählbar ist, wie Sie die echte Absenderadresse finden und Lookalike-Domains erkennen.',
    category: 'E-Mail prüfen',
    audience: 'alle',
    level: 'leicht',
    tags: ['Absender', 'Domain', 'Lookalike'],
    body: `## Worum geht es?

Jede E-Mail hat einen **Anzeigenamen** und eine **Absenderadresse**. Der Anzeigename ist das, was Ihr Mailprogramm groß anzeigt, zum Beispiel „IT-Service Nordwerk“. Die Absenderadresse steht oft klein dahinter oder erst nach einem Klick, zum Beispiel <it-service@nordwerk-helpdesk.example>. Der Anzeigename ist ein reines Textfeld: Jeder Absender kann dort eintragen, was er möchte – auch den Namen Ihrer Geschäftsführerin oder Ihrer Bank. Viele Mailprogramme, besonders auf Smartphones, zeigen standardmäßig nur den Anzeigenamen. Genau das nutzen Angreifer aus.

### Aufbau einer E-Mail-Adresse

Eine Adresse besteht aus dem **lokalen Teil** vor dem @ und der **Domain** dahinter. Bei max.mustermann@nordwerk.example ist „nordwerk.example“ die Domain. Die Domain sagt etwas darüber aus, welche Organisation die Adresse verwaltet. Der lokale Teil kann dagegen beliebig sein: „security“, „ceo“ oder „noreply“ sagen nichts über die Echtheit aus.

## So finden Sie die tatsächliche Adresse

- **Am PC:** Fahren Sie mit der Maus über den Absendernamen oder klicken Sie darauf. Die meisten Programme zeigen dann die vollständige Adresse.
- **Auf dem Smartphone:** Tippen Sie auf den Absendernamen. Erst dann erscheint häufig die Adresse.
- **In der Antwort:** Achten Sie beim Antworten darauf, an welche Adresse die Antwort tatsächlich geht. Ein abweichendes „Antwort an“ (Reply-To) ist ein häufiger Trick bei Zahlungsbetrug.

## Lookalike-Domains erkennen

Angreifer registrieren Domains, die echten Domains zum Verwechseln ähnlich sehen. Typische Tricks:

- **Zusätze:** nordwerk-helpdesk.example, nordwerk-it.example, nordwerk-people.example statt nordwerk.example.
- **Vertauschte oder ersetzte Zeichen:** sauber-c0.example (Null statt o), rn statt m, l statt I.
- **Andere Endung:** nordwerk.example-mail.example oder eine ganz andere Länderendung.
- **Verschachtelung:** nordwerk.example.secure-login.example – hier gehört alles zur Domain secure-login.example. Lesen Sie Domains **von rechts nach links**: Der Teil direkt vor der Endung ist entscheidend.

Ein guter Trick: Kennen Sie die echte Domain eines häufigen Partners auswendig oder haben Sie sie im Adressbuch, fällt eine Abweichung schneller auf. Viele Unternehmen markieren außerdem externe Mails mit einem Hinweis wie „[EXTERN]“. Erscheint dieser Hinweis bei einer angeblich internen Mail, ist das ein starkes Warnsignal.

## Erkennungsmerkmale und ihre Grenzen

- **Anzeigename und Domain passen nicht zusammen:** „Geschäftsführung“ schreibt von einer privaten Freemail-Adresse.
- **Ähnliche, aber nicht identische Domain** zu einem bekannten Partner oder zur eigenen Firma.
- **Abweichende Antwortadresse:** Die Antwort soll an eine andere Adresse gehen.
- **Externer Hinweis** bei einer Nachricht, die angeblich intern ist.

**Grenzen:** Eine korrekte Absenderadresse ist **kein** Beweis für Echtheit. Absenderadressen können technisch gefälscht werden (Spoofing), wenn die empfangende Seite das nicht verhindert, und echte Postfächer können von Angreifern übernommen werden. Dann stimmt alles an der Adresse – und trotzdem ist die Nachricht betrügerisch. Umgekehrt ist eine unbekannte oder private Adresse nicht automatisch verdächtig: Bewerbende, Kundinnen oder neue Partner schreiben oft von privaten oder neuen Domains.

## Ein fiktives Beispiel

> **Anzeigename:** Dr. Thomas Nordmann (Geschäftsführer)
> **Adresse:** t.nordmann.gf@mailbox-privat.example
> „Sind Sie gerade am Platz? Ich brauche dringend Ihre Hilfe bei einer vertraulichen Angelegenheit.“

Der Anzeigename wirkt seriös, die Adresse gehört aber zu einem privaten Anbieter. Zusammen mit Dringlichkeit und Vertraulichkeit ergibt sich ein typisches Bild für CEO-Betrug. Die sichere Reaktion ist ein Rückruf über die bekannte Nummer oder die Assistenz – nicht eine Antwort auf die Mail.

## Schutzmaßnahmen

- Lassen Sie sich in Ihrem Mailprogramm die vollständige Absenderadresse anzeigen, wenn das möglich ist.
- Speichern Sie wichtige Kontakte im Adressbuch, damit Abweichungen auffallen.
- Antworten Sie bei sensiblen Anfragen nicht mit „Antworten“, sondern schreiben Sie eine neue Mail an die bekannte Adresse oder rufen Sie an.
- Achten Sie auf Markierungen für externe Nachrichten.
- Melden Sie Lookalike-Domains der IT; sie kann solche Domains oft zentral sperren.

## Im Ernstfall

Haben Sie auf eine gefälschte Absenderadresse hin geantwortet oder Informationen weitergegeben, informieren Sie die IT und die betroffene Person über einen bekannten Weg. Wurden Zahlungen oder Datenänderungen veranlasst, verständigen Sie sofort die Buchhaltung und gegebenenfalls die Bank. Haben Sie über einen Link Zugangsdaten eingegeben, ändern Sie das Passwort und melden Sie den Vorfall.

## Zusammengefasst

Der Anzeigename ist frei wählbar. Prüfen Sie bei Nachrichten, die Sie zu einer Handlung auffordern, die tatsächliche Domain und lesen Sie sie von rechts nach links. Denken Sie daran: Auch eine korrekte Adresse kann trügen – entscheidend ist der Gesamtkontext und im Zweifel die Rückfrage über einen unabhängigen Weg.`,
    checklist: [
      'Vollständige Absenderadresse angezeigt?',
      'Domain von rechts nach links gelesen?',
      'Ähnliche, aber nicht identische Domain ausgeschlossen?',
      'Antwortadresse (Reply-To) geprüft?',
      'Externe Markierung bei angeblich interner Mail?',
      'Bei sensiblen Anfragen über bekannten Kontakt nachgefragt?',
    ],
    relatedArticleIds: ['spoofing-authentifizierung', 'links-domains', 'zeitdruck-autoritaet'],
  },
  {
    id: 'links-domains',
    title: 'Domains lesen und Links sicher prüfen',
    summary: 'Wie Sie Linkziele sichtbar machen, Domains korrekt lesen und warum der sicherste Weg oft ist, gar nicht auf den Link zu klicken.',
    category: 'E-Mail prüfen',
    audience: 'alle',
    level: 'mittel',
    tags: ['Links', 'Domain', 'URL'],
    body: `## Worum geht es?

Links sind das häufigste Werkzeug beim Phishing. Ein Klick führt auf eine Seite, die echt aussieht, aber Zugangsdaten abgreift, Zahlungsdaten abfragt oder Schadsoftware anbietet. Das Tückische: Der **sichtbare Linktext** und das **tatsächliche Ziel** können völlig verschieden sein. Ein Text wie „Zum Kundenportal“ oder sogar eine ausgeschriebene Adresse kann auf eine ganz andere Seite führen.

## Aufbau einer Webadresse

Eine Webadresse (URL) besteht aus mehreren Teilen. Am Beispiel https://ablage.nordwerk.example/shared?id=42:

- **https://** ist das Protokoll. Das „s“ bedeutet, dass die Verbindung verschlüsselt ist.
- **ablage.nordwerk.example** ist der Hostname. Er besteht aus der **Subdomain** „ablage“ und der **registrierten Domain** „nordwerk.example“.
- **/shared?id=42** ist der Pfad mit Parametern. Er kann beliebigen Text enthalten, auch Namen bekannter Firmen.

Entscheidend für die Frage „Wem gehört diese Seite?“ ist die registrierte Domain. Sie steht direkt vor dem ersten einzelnen Schrägstrich nach dem Protokoll, ganz rechts im Hostnamen. Deshalb gilt: **Hostnamen von rechts nach links lesen.**

### Typische Täuschungen

- **Subdomain-Trick:** nordwerk.example.login-sso.example gehört zu login-sso.example – nicht zu nordwerk.example.
- **Pfad-Trick:** https://fremd.example/nordwerk.example/login gehört zu fremd.example. Der bekannte Name steht nur im Pfad.
- **Lookalike:** nordwerk-login.example, n0rdwerk.example oder Zeichen aus anderen Alphabeten, die gleich aussehen.
- **Linkverkürzer:** Kurze Links verbergen das Ziel vollständig.
- **QR-Codes:** Auch sie verbergen das Ziel; siehe Artikel zu QR-Phishing.

## So prüfen Sie ein Linkziel

1. **Am PC:** Fahren Sie mit der Maus über den Link, ohne zu klicken. Das Ziel erscheint meist unten im Fenster oder als Tooltip.
2. **Auf dem Smartphone:** Drücken Sie lange auf den Link, bis eine Vorschau erscheint. Wählen Sie nicht „Öffnen“.
3. **Domain bestimmen:** Lesen Sie den Hostnamen von rechts nach links und vergleichen Sie ihn mit der Domain, die Sie kennen.
4. **Kontext prüfen:** Passt das Ziel zum Absender und zur Aufforderung?

Das **Schloss-Symbol** im Browser bedeutet nur, dass die Verbindung verschlüsselt ist. Es sagt nichts darüber, wer die Seite betreibt. Auch Phishing-Seiten nutzen heute fast immer HTTPS.

## Erkennungsmerkmale und ihre Grenzen

- Linktext und Ziel stimmen nicht überein.
- Die registrierte Domain gehört nicht zum angeblichen Absender.
- Das Ziel ist eine Anmeldeseite, obwohl die Nachricht nur informieren will.
- Direkte Downloads von Programmdateien (.exe, .msi, .js) über Links in Mails.

**Grenzen:** Auch legitime Firmen nutzen externe Dienstleister, etwa für Umfragen, Newsletter oder Rechnungsportale. Eine fremde Domain ist deshalb nicht automatisch Phishing. Umgekehrt kann ein Link auf eine echte Domain führen und trotzdem missbraucht werden, zum Beispiel über Weiterleitungen oder kompromittierte Seiten. Die Linkprüfung ist ein wichtiges Werkzeug, aber kein vollständiger Schutz.

## Der sicherste Weg: Nicht über den Link gehen

Für wichtige Dienste – Firmenportal, Bank, Lieferantenportal – gilt: Öffnen Sie sie über ein **eigenes Lesezeichen**, die offizielle App oder das Intranet. Wenn die Nachricht echt ist, finden Sie die Information dort auch. Damit umgehen Sie das Problem der Linkprüfung vollständig.

## Ein fiktives Beispiel

> **Linktext:** „Dokument öffnen“
> **Tatsächliches Ziel:** https://cloudshare-docs.example.login-sso.example/auth

Liest man den Hostnamen von rechts, endet er auf login-sso.example. Der vordere Teil „cloudshare-docs.example“ ist nur eine Subdomain, die Vertrauen erwecken soll. Ein Dokument, das angeblich von der Personalabteilung stammt, sollte nicht auf einer solchen Seite liegen.

## Schutzmaßnahmen

- Legen Sie Lesezeichen für häufig genutzte Portale an.
- Nutzen Sie einen Passwortmanager: Er füllt Zugangsdaten nur auf der richtigen Domain aus. Bietet er auf einer Seite keine Daten an, ist das ein Warnsignal.
- Aktivieren Sie MFA, idealerweise mit phishing-resistenten Verfahren wie Passkeys oder Sicherheitsschlüsseln.
- Lassen Sie Browser-Warnungen nicht einfach weg­klicken.
- Melden Sie verdächtige Links, damit die IT sie für alle sperren kann.

## Im Ernstfall

Haben Sie auf einen Link geklickt, aber nichts eingegeben, ist das Risiko meist gering – melden Sie den Vorfall trotzdem, damit die IT prüfen kann. Haben Sie Zugangsdaten eingegeben, ändern Sie das Passwort sofort über den bekannten Weg und informieren Sie die IT, damit laufende Sitzungen beendet werden. Haben Sie etwas heruntergeladen oder ausgeführt, trennen Sie das Gerät vom Netzwerk und rufen Sie die IT an.

## Zusammengefasst

Linktext und Ziel können verschieden sein. Lesen Sie die Domain von rechts nach links, lassen Sie sich vom Schloss-Symbol nicht täuschen und nutzen Sie für wichtige Dienste eigene Lesezeichen. Eine fremde Domain ist ein Hinweis, kein Beweis.`,
    checklist: [
      'Linkziel vor dem Klick angezeigt (Mouseover oder langes Drücken)?',
      'Hostname von rechts nach links gelesen?',
      'Gehört die registrierte Domain zum Absender?',
      'Führt der Link unerwartet zu einer Anmeldung oder einem Download?',
      'Wichtige Dienste über eigenes Lesezeichen geöffnet?',
      'Schloss-Symbol nicht als Echtheitsbeweis gewertet?',
    ],
    relatedArticleIds: ['anzeigename-absender', 'qr-phishing', 'mfa-betrug'],
  },
  {
    id: 'anhaenge',
    title: 'Anhänge sicher einschätzen',
    summary: 'Welche Dateitypen besonders riskant sind, woran Sie getarnte Anhänge erkennen und warum Makros und HTML-Dateien besondere Vorsicht verdienen.',
    category: 'E-Mail prüfen',
    audience: 'alle',
    level: 'mittel',
    tags: ['Anhänge', 'Makros', 'Dateitypen', 'Schadsoftware'],
    body: `## Worum geht es?

Anhänge sind neben Links der zweite große Angriffsweg. Ein einziger Doppelklick kann Schadsoftware starten, die Daten verschlüsselt (sogenannte **Ransomware**), Zugangsdaten ausliest oder Angreifern dauerhaft Zugriff auf das Gerät gibt. Gleichzeitig gehören Anhänge zum Arbeitsalltag: Rechnungen, Angebote, Lebensläufe und Protokolle werden täglich verschickt. Es geht also nicht darum, Anhänge grundsätzlich zu meiden, sondern sie richtig einzuschätzen.

## Dateiendungen verstehen

Die **Dateiendung** ist der Teil nach dem letzten Punkt im Dateinamen, zum Beispiel „.pdf“. Sie bestimmt, welches Programm die Datei öffnet und was dabei passieren kann. Windows blendet bekannte Endungen standardmäßig aus. Aktivieren Sie im Explorer die Anzeige der Dateinamenerweiterungen – das ist eine der wirksamsten einfachen Schutzmaßnahmen.

### Besonders riskante Dateitypen

- **Programme und Skripte:** .exe, .msi, .bat, .cmd, .js, .vbs, .ps1, .scr – sie führen direkt Code aus und haben in normalen Geschäftsmails nichts zu suchen.
- **Office-Dateien mit Makros:** .docm, .xlsm, .pptm. Makros sind kleine Programme in Dokumenten. Sie können nützlich sein, werden aber häufig für Schadcode missbraucht.
- **HTML-Dateien:** .html, .htm. Sie öffnen sich im Browser und zeigen oft eine täuschend echte Anmeldeseite, die lokal auf Ihrem Rechner läuft und so manche Filter umgeht.
- **Archive:** .zip, .rar, .7z, .iso, .img. Sie können riskante Dateien verpacken. Passwortgeschützte Archive können Virenscanner oft nicht prüfen.
- **Verknüpfungen:** .lnk-Dateien können Befehle ausführen.

### Getarnte Dateien

- **Doppelte Endung:** „Rechnung.pdf.exe“ – nur die letzte Endung zählt.
- **Irreführende Symbole:** Programme können sich ein PDF-Symbol geben.
- **Lange Dateinamen:** Viele Leerzeichen schieben die echte Endung aus dem sichtbaren Bereich.

## Erkennungsmerkmale und ihre Grenzen

- Sie erwarten den Anhang nicht oder er passt nicht zum Absender.
- Der Dateityp passt nicht zum Inhalt (Scan als HTML, Voicemail als .htm, Bestellung als .exe).
- Sie sollen „Bearbeitung aktivieren“ oder „Inhalte aktivieren“ klicken, damit das Dokument „richtig angezeigt“ wird.
- Ein Archiv ist passwortgeschützt, und das Passwort steht in derselben Mail.
- Nach dem Öffnen werden Sie zur Anmeldung aufgefordert.

**Grenzen:** Ein PDF ist meist harmlos, aber nicht immer: PDFs können Links zu Phishing-Seiten enthalten. Umgekehrt sind verschlüsselte Anhänge nicht automatisch verdächtig. Seriöse Absender, etwa Steuerbüros, verschlüsseln vertrauliche Dokumente – und teilen das Passwort über einen getrennten Kanal mit, nicht in derselben Mail. Auch der Absender allein entscheidet nicht: Eine Bewerbung von einer privaten Adresse ist normal, ein Makro-Dokument in dieser Bewerbung nicht.

## Ein fiktives Beispiel

> **Betreff:** Bewerbung als Sachbearbeiterin
> **Anhang:** Bewerbung_Becker.docm
> „Damit alle Inhalte korrekt angezeigt werden, aktivieren Sie bitte beim Öffnen die Bearbeitung und die Inhalte (Makros).“

Bewerbungen werden üblicherweise als PDF verschickt. Die Endung .docm und die Bitte, Makros zu aktivieren, sind starke Warnsignale. Die sichere Reaktion: nicht öffnen, melden und bei Bedarf um eine PDF-Version über das Bewerbungsportal bitten.

## Schutzmaßnahmen

- Dateiendungen im Explorer einblenden.
- Makros niemals aktivieren, wenn ein Dokument per Mail kam und Sie nicht sicher wissen, dass Makros nötig und vom Absender beabsichtigt sind.
- Bei unerwarteten Anhängen beim Absender über einen bekannten Weg nachfragen.
- Bewerbungen, Rechnungen und Lieferantendokumente möglichst über Portale oder etablierte Prozesse annehmen.
- Die IT kann riskante Dateitypen zentral blockieren und Makros aus dem Internet standardmäßig sperren.

## Im Ernstfall

Wenn Sie einen verdächtigen Anhang geöffnet oder Makros aktiviert haben:

1. Trennen Sie das Gerät vom Netzwerk (Kabel ziehen, WLAN aus).
2. Lassen Sie das Gerät eingeschaltet – wichtige Spuren für die Analyse gehen sonst verloren.
3. Informieren Sie sofort die IT, am besten telefonisch.
4. Arbeiten Sie nicht weiter an dem Gerät und schließen Sie keine USB-Sticks an.

## Zusammengefasst

Achten Sie auf Dateityp, Erwartbarkeit und Kontext. Programme, Makro-Dokumente, HTML-Dateien und passwortgeschützte Archive verdienen besondere Vorsicht. Ein PDF von einem bekannten Partner im passenden Kontext ist dagegen normal.`,
    checklist: [
      'Erwarte ich diesen Anhang von diesem Absender?',
      'Ist die letzte Dateiendung harmlos und passend?',
      'Werde ich aufgefordert, Makros oder Inhalte zu aktivieren?',
      'Steht ein Archiv-Passwort in derselben Mail?',
      'Verlangt die Datei nach dem Öffnen eine Anmeldung?',
      'Bei Unsicherheit beim Absender über bekannten Weg nachgefragt?',
    ],
    relatedArticleIds: ['nach-dem-klick', 'incident-response', 'phishing-grundlagen'],
  },
  {
    id: 'zeitdruck-autoritaet',
    title: 'Zeitdruck, Autorität und andere Psychotricks',
    summary: 'Welche psychologischen Hebel Angreifer nutzen, warum sie wirken und wie Sie mit einer kurzen Pause und einem Rückruf gegensteuern.',
    category: 'Grundlagen',
    audience: 'alle',
    level: 'leicht',
    tags: ['Social Engineering', 'CEO-Betrug', 'Psychologie'],
    body: `## Worum geht es?

Die meisten Phishing-Angriffe arbeiten mit Gefühlen. Wer unter Druck steht, Angst hat oder einer Autorität gefallen möchte, prüft weniger sorgfältig. Angreifer setzen diese Hebel bewusst ein. Wenn Sie die Hebel kennen, erkennen Sie Manipulationsversuche schneller – auch dann, wenn die Nachricht technisch perfekt aussieht.

## Die wichtigsten Hebel

### Zeitdruck

„Innerhalb von 24 Stunden“, „heute bis 17 Uhr“, „sonst wird Ihr Konto gesperrt“. Zeitdruck soll verhindern, dass Sie nachdenken, nachfragen oder Kolleginnen um Rat bitten. Besonders wirksam ist Zeitdruck kurz vor Feierabend, vor Wochenenden oder Feiertagen.

### Autorität

Nachrichten im Namen der Geschäftsführung, einer Behörde, der Polizei oder der IT. Menschen folgen Anweisungen von Autoritäten eher, ohne zu hinterfragen. Beim sogenannten **CEO-Betrug** (auch „Chef-Masche“) geben sich Angreifer als Geschäftsführung aus und fordern Überweisungen oder den Kauf von Geschenkkarten.

### Geheimhaltung

„Bitte sprechen Sie mit niemandem darüber.“ Geheimhaltung isoliert Sie und schaltet die wichtigste Schutzmaßnahme aus: die Rückfrage bei anderen.

### Angst und Drohung

Mahnungen, Pfändungsdrohungen, angebliche Viren, Sperrungen. Angst führt zu schnellen, unüberlegten Reaktionen.

### Neugier und Belohnung

Gehaltslisten, Gewinnspiele, Steuererstattungen, „Fotos von der Weihnachtsfeier“. Neugier und die Aussicht auf einen Vorteil verleiten zum Klick.

### Hilfsbereitschaft

„Ich bin neu und mein Zugang geht noch nicht – kannst du mir kurz helfen?“ Hilfsbereitschaft ist eine wertvolle Eigenschaft im Team. Angreifer nutzen sie aus, um an Zugangsdaten oder Informationen zu kommen.

## Erkennungsmerkmale und ihre Grenzen

- Mehrere Hebel gleichzeitig: Autorität **und** Zeitdruck **und** Geheimhaltung.
- Ein ungewöhnlicher Weg: private Nummer, private Mailadresse, Messenger statt üblichem Kanal.
- Ein ungewöhnlicher Zahlungsweg: Geschenkkarten, Kryptowährung, neues Auslandskonto.
- Begründungen, warum Rückfragen nicht möglich sind: „Ich sitze in einer Besprechung“, „Mein Telefon ist defekt“.

**Grenzen:** Dringende Nachrichten gibt es auch im echten Arbeitsleben. Eine Pflichtschulung hat eine Frist, eine Führungskraft schreibt in Eile, die IT kündigt ein kurzfristiges Update an. Dringlichkeit allein ist kein Beweis für Phishing. Achten Sie darauf, ob die Dringlichkeit mit einer **riskanten Handlung** verknüpft ist und ob Rückfragen ausgeschlossen werden. Eine echte Führungskraft wird Verständnis haben, wenn Sie bei einer ungewöhnlichen Zahlung kurz anrufen.

## Ein fiktives Beispiel

> **Absender:** „Thomas Nordmann“, unbekannte Mobilnummer im Messenger
> „Guten Morgen, das ist meine private Nummer. Ich brauche heute Ihre Unterstützung bei einer vertraulichen Übernahme. Unsere Anwältin meldet sich gleich. Bitte noch mit niemandem sprechen.“

Hier kommen Autorität, Geheimhaltung, ein ungewöhnlicher Kanal und angekündigte Dritte zusammen. Die sichere Reaktion: nicht antworten und die Geschäftsführung über einen bekannten Weg kontaktieren – etwa über die Festnetznummer oder die Assistenz.

## Die wirksamste Gegenmaßnahme: Pause und Rückruf

Wenn Sie merken, dass eine Nachricht starke Gefühle auslöst – Eile, Angst, Stolz, Neugier –, ist das ein gutes Signal für eine kurze Pause. Fragen Sie sich: Was soll ich tun? Wäre das normal? Wie kann ich das unabhängig prüfen? Dann nutzen Sie einen **unabhängigen Kontaktweg**: die Telefonnummer aus dem internen Verzeichnis, das Lieferantenstammblatt oder ein persönliches Gespräch. Rufen Sie niemals eine Nummer aus der verdächtigen Nachricht selbst an.

## Schutzmaßnahmen

- Klare Regeln: Zahlungen und Bankdatenänderungen nur nach Vier-Augen-Prinzip und Rückruf.
- Geschäftsführung kommuniziert offen, dass Rückfragen bei ungewöhnlichen Anweisungen ausdrücklich erwünscht sind.
- Keine Geschenkkarten-Käufe auf Zuruf.
- Eine Kultur, in der „Ich habe kurz nachgefragt“ gelobt und nicht als Misstrauen verstanden wird.

## Im Ernstfall

Haben Sie unter Druck gehandelt – etwa Codes von Geschenkkarten weitergegeben oder eine Zahlung angestoßen –, informieren Sie sofort Ihre Führungskraft, die Buchhaltung und die IT. Bei Überweisungen kontaktieren Sie umgehend die Bank, um einen Rückruf zu versuchen. Bei Geschenkkarten wenden Sie sich an den Herausgeber über dessen offizielle Website. Erstatten Sie zusätzlich Anzeige bei der Polizei.

## Zusammengefasst

Angreifer nutzen Zeitdruck, Autorität, Geheimhaltung, Angst, Neugier und Hilfsbereitschaft. Einzelne Hebel kommen auch im normalen Alltag vor. Wird aber Druck mit einer riskanten Handlung und dem Ausschluss von Rückfragen kombiniert, ist eine Pause und ein Rückruf über einen bekannten Weg die beste Reaktion.`,
    checklist: [
      'Löst die Nachricht starke Gefühle aus (Eile, Angst, Neugier)?',
      'Wird Autorität mit einer ungewöhnlichen Bitte verknüpft?',
      'Werden Rückfragen erschwert oder ausgeschlossen?',
      'Geht es um Geld, Codes, Zugangsdaten oder vertrauliche Informationen?',
      'Habe ich über einen unabhängig bekannten Weg nachgefragt?',
    ],
    relatedArticleIds: ['phishing-grundlagen', 'rechnungsbetrug', 'telefonbetrug-helpdesk'],
  },
];
