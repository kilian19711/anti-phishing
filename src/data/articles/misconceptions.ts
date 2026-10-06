/**
 * Zusätzlicher Abschnitt „Häufige Missverständnisse“ je Artikel.
 * Wird beim Zusammenbau vor „## Zusammengefasst“ eingefügt.
 */
export const misconceptions: Record<string, string> = {
  'phishing-grundlagen': `## Häufige Missverständnisse

**„Mich betrifft das nicht, ich habe keine wichtigen Daten.“** Angreifer interessieren sich nicht nur für Geschäftsgeheimnisse. Schon ein einfaches Mitarbeiterkonto kann als Einstieg dienen: Von dort aus werden weitere Phishing-Mails an Kolleginnen und Partner verschickt, die dem bekannten Absender eher vertrauen. Auch Zugriff auf Kalender, Adressbücher oder Dateiablagen ist für Angreifer wertvoll.

**„Ich erkenne Phishing immer sofort.“** Diese Selbstsicherheit ist gefährlich. Gezielte Nachrichten sind oft fehlerfrei, nutzen echte Namen und kommen in stressigen Momenten. Selbst erfahrene IT-Fachleute fallen gelegentlich darauf herein. Besser als Selbstsicherheit ist eine feste Gewohnheit: bei Aufforderungen kurz innehalten und prüfen.

**„Der Filter fängt ohnehin alles ab.“** Filter sind sehr wertvoll, aber sie entscheiden nach Wahrscheinlichkeiten. Neue Kampagnen, frisch registrierte Domains und Nachrichten aus echten, übernommenen Postfächern rutschen regelmäßig durch.

**„Wenn ich geklickt habe, ist sowieso alles zu spät.“** Im Gegenteil: Gerade dann zählt jede Minute. Eine schnelle Meldung ermöglicht der IT, Passwörter zurückzusetzen, Sitzungen zu beenden und andere zu warnen, bevor ein größerer Schaden entsteht.`,
  'anzeigename-absender': `## Häufige Missverständnisse

**„Die Adresse steht in meinem Adressbuch, also ist die Mail echt.“** Ihr Mailprogramm zeigt manchmal den gespeicherten Kontaktnamen an, sobald die Adresse übereinstimmt – auch wenn die Mail aus einem übernommenen Postfach stammt. Der Adressbucheintrag bestätigt nur die Adresse, nicht den Menschen dahinter.

**„noreply-Adressen sind verdächtig.“** Automatische Systeme wie Ticketsysteme, Kalender oder Sicherheitsbenachrichtigungen nutzen sehr häufig noreply-Adressen. Der lokale Teil vor dem @ sagt weder etwas Gutes noch etwas Schlechtes aus. Entscheidend sind Domain, Inhalt und Kontext.

**„Eine Mail von einer Freemail-Adresse ist immer Betrug.“** Viele Menschen haben gute Gründe, private Adressen zu nutzen: Bewerbende, Kundinnen, kleine Handwerksbetriebe oder Vereine. Verdächtig wird eine private Adresse erst, wenn sie zu einer Rolle nicht passt, etwa wenn die Geschäftsführung angeblich von dort dringende Zahlungen anweist.

**„Wenn der Name richtig geschrieben ist, passt alles.“** Angreifer recherchieren Namen, Funktionen und sogar Signaturen auf Websites und in Karrierenetzwerken. Ein korrekt geschriebener Name und eine echt aussehende Signatur sind deshalb keine Bestätigung. Ein kurzer Blick auf die vollständige Adresse dauert nur Sekunden und deckt viele Täuschungen auf.`,
  'links-domains': `## Häufige Missverständnisse

**„Ich klicke nur kurz, um zu sehen, was passiert.“** Neugier ist menschlich, aber schon der Aufruf einer Seite kann dem Angreifer verraten, dass Ihre Adresse aktiv ist. In seltenen Fällen nutzen Seiten zudem Sicherheitslücken in veralteten Browsern aus. Prüfen Sie das Ziel lieber, ohne zu klicken.

**„Ein Link mit https ist sicher.“** Das „s“ steht nur für eine verschlüsselte Verbindung zwischen Ihnen und der Seite. Auch eine betrügerische Seite kann diese Verschlüsselung haben. Sie schützt dann lediglich den Weg Ihrer Daten zum Angreifer.

**„Wenn der bekannte Firmenname in der Adresse vorkommt, gehört die Seite der Firma.“** Firmennamen können in Subdomains oder im Pfad stehen, ohne dass die Seite der Firma gehört. Nur die registrierte Domain direkt vor der Endung zählt.

**„Links in internen Mails sind immer sicher.“** Auch interne Konten können übernommen werden, und auch Kolleginnen leiten manchmal unwissentlich gefährliche Links weiter. Interne Links sind meist harmlos, aber eine ungewöhnliche Anmeldeaufforderung bleibt ein Warnsignal – unabhängig vom Absender.

**„Der Passwortmanager hat nichts ausgefüllt, wahrscheinlich ist er kaputt.“** Oft ist das Gegenteil der Fall: Der Passwortmanager erkennt, dass die Domain nicht stimmt. Nehmen Sie das ernst und tippen Sie das Passwort nicht von Hand ein.`,
  'anhaenge': `## Häufige Missverständnisse

**„Mein Virenscanner prüft das schon.“** Virenschutz ist wichtig, erkennt aber vor allem bekannte Schadsoftware. Neue oder gezielt angepasste Varianten werden manchmal erst nach Stunden oder Tagen erkannt. Außerdem kann der Scanner in passwortgeschützte Archive nicht hineinsehen.

**„Wenn das Dokument nur Text anzeigt, ist es harmlos.“** Dokumente mit Makros zeigen oft absichtlich einen verschwommenen oder leeren Inhalt mit dem Hinweis, man müsse „Inhalte aktivieren“. Der eigentliche Schadcode läuft erst nach diesem Klick. Ein leeres oder unscharfes Dokument ist also eher ein Warnsignal.

**„Excel-Dateien sind doch normale Arbeitsdateien.“** Normale Tabellen mit der Endung .xlsx enthalten keine Makros. Die Endung .xlsm zeigt dagegen, dass Makros enthalten sind. Der kleine Unterschied in der Endung ist also wichtig.

**„Ich öffne den Anhang lieber am privaten Handy, da kann nichts passieren.“** Auch Smartphones können angegriffen werden, und gefälschte Anmeldeseiten funktionieren dort genauso. Außerdem fehlen dort oft die Schutzmechanismen des Firmengeräts. Das Risiko verlagert sich nur.

**„Bekannte Absender schicken keine gefährlichen Anhänge.“** Wird das Postfach eines Partners übernommen, verschicken Angreifer von dort Schadsoftware an alle Kontakte. Gerade deshalb lohnt sich bei unerwarteten Anhängen eine kurze Rückfrage über einen bekannten Weg.`,
  'zeitdruck-autoritaet': `## Häufige Missverständnisse

**„Wenn ich bei der Chefin nachfrage, wirkt das misstrauisch.“** Viele Menschen zögern, Führungskräfte zu hinterfragen. Gute Führungskräfte sehen eine Rückfrage bei ungewöhnlichen Zahlungen aber als Zeichen von Sorgfalt. Unternehmen sollten das ausdrücklich kommunizieren, damit niemand Angst vor einer kurzen Bestätigung hat.

**„Eine Nachricht ohne Frist ist ungefährlich.“** Nicht jeder Angriff arbeitet mit Druck. Manche setzen auf Neugier, Hilfsbereitschaft oder Routine, etwa eine unauffällige Rechnung oder eine freundliche Bitte unter Kollegen. Fehlender Zeitdruck ist kein Freifahrtschein.

**„Betrüger sind unfreundlich und fordernd.“** Oft ist das Gegenteil der Fall: Social Engineers sind höflich, sympathisch und bedanken sich überschwänglich. Freundlichkeit senkt die Hemmschwelle, eine Bitte zu erfüllen.

**„Behörden und Polizei darf man nicht hinterfragen.“** Echte Behörden haben kein Problem damit, wenn Sie über die offizielle Nummer zurückrufen. Sie verlangen keine Zahlungen per Geschenkkarte und keine Überweisungen auf „sichere Konten“.

**„Ich bin gegen solche Tricks immun, weil ich sie kenne.“** Wissen hilft, schützt aber nicht vollständig. Unter Stress, Müdigkeit oder Ablenkung reagieren alle Menschen anfälliger. Deshalb sind feste Prozesse wie Rückruf und Vier-Augen-Prinzip so wertvoll: Sie wirken auch dann, wenn die eigene Aufmerksamkeit gerade nachlässt.`,
  'spoofing-authentifizierung': `## Häufige Missverständnisse

**„Spoofing ist heute technisch nicht mehr möglich.“** Wo SPF, DKIM und DMARC mit Durchsetzung eingerichtet sind und der Empfänger sie prüft, ist das Fälschen der exakten Domain deutlich schwieriger geworden. Viele Domains haben aber noch keine oder nur beobachtende Richtlinien, und nicht jeder Empfänger setzt sie konsequent um.

**„Unser Mailprogramm würde eine gefälschte Mail markieren.“** Manche Programme zeigen Warnungen an, andere nicht. Wie eine fehlgeschlagene Prüfung dargestellt wird, hängt stark von Anbieter und Konfiguration ab. Auf ein Warnsymbol allein sollte man sich nicht verlassen.

**„Wenn DMARC auf reject steht, sind wir vor Betrug sicher.“** Die Richtlinie schützt Ihre eigene Domain davor, von Fremden gefälscht zu werden. Sie verhindert nicht, dass Angreifer eine ähnliche Domain registrieren oder Ihre Mitarbeitenden mit Mails von ganz anderen Domains angreifen.

**„Eine fehlgeschlagene Prüfung ist immer ein Angriff.“** Weitergeleitete Nachrichten, Mailinglisten und vergessene Versanddienste erzeugen regelmäßig Fehlschläge, ohne dass jemand böse Absichten hat. Für die Bewertung braucht es den Kontext.`,
  'spf-dkim-dmarc': `## Häufige Missverständnisse

**„Ein langer SPF-Eintrag mit vielen includes ist besonders sicher.“** Ab mehr als zehn DNS-Abfragen wird der Eintrag ungültig. Zu großzügige Einträge erlauben zudem Servern das Versenden, die das gar nicht sollten – etwa geteilten Plattformen, auf denen auch Fremde senden können. Ein schlanker, gepflegter Eintrag ist besser.

**„DKIM-Schlüssel richtet man einmal ein und vergisst sie.“** Schlüssel sollten regelmäßig erneuert werden. Ein kompromittierter oder zu kurzer Schlüssel ermöglicht sonst gültige Signaturen durch Fremde.

**„Die Berichte sind nur für Großunternehmen interessant.“** Gerade kleine Organisationen entdecken über die Aggregatberichte oft vergessene Dienste – etwa ein altes Kontaktformular auf der Website oder einen externen Newsletter-Dienst –, die ohne korrekte Einrichtung bei einer strengen Richtlinie plötzlich blockiert würden.

**„Wer auf reject umstellt, verliert legitime Mails.“** Das Risiko besteht, wenn die Vorbereitung fehlt. Wer zuerst beobachtet, Berichte auswertet und alle Dienste einbindet, kann ohne nennenswerte Verluste umstellen. Die schrittweise Einführung ist genau dafür gedacht.

**„Mitarbeitende müssen diese Verfahren verstehen.“** Für die meisten genügt das Wissen, dass Absender gefälscht werden können und die IT das prüfen kann. Die Details sind Aufgabe der Administration.`,
  'email-header': `## Häufige Missverständnisse

**„Wer Header lesen kann, findet immer den Täter.“** Header zeigen den technischen Weg einer Nachricht, aber selten eine Person. Angreifer nutzen kompromittierte Server, gemietete Infrastruktur oder große Mailanbieter. Für die Abwehr ist das Ermitteln von Mustern und weiteren Empfängern meist wichtiger als die Frage nach der Herkunft.

**„Ein Screenshot der Mail reicht für die Analyse.“** Ein Screenshot zeigt nur die Oberfläche. Für die Bewertung von Authentifizierung, Weg und Zeitstempeln braucht die IT die Originalnachricht mit allen Kopfzeilen. Deshalb ist die Weiterleitung als Anlage oder über den Melde-Button so wichtig.

**„Alle Zeitstempel im Header sind korrekt.“** Das Datumsfeld wird vom Absender gesetzt und kann beliebig sein. Fremde Server können falsch eingestellte Uhren haben. Verlässlich sind vor allem die Zeitstempel der eigenen, synchronisierten Systeme.

**„X-Header sind standardisiert.“** Jeder Anbieter und jedes Filterprodukt fügt eigene Felder hinzu. Ihre Bedeutung muss in der jeweiligen Produktdokumentation nachgelesen werden, statt sie zu erraten.

**„Header-Analyse ist nur etwas für Spezialisten.“** Die Grundlagen – From, Reply-To, Authentication-Results und die oberste externe Received-Zeile – lassen sich mit etwas Übung schnell prüfen. Für komplexe Fälle lohnt sich ein dokumentierter Ablauf im Team.`,
  'mailserver-schutz': `## Häufige Missverständnisse

**„Mehr Filterregeln bedeuten mehr Sicherheit.“** Zu aggressive Filter blockieren legitime Nachrichten und verleiten Mitarbeitende dazu, auf private Kanäle auszuweichen – mit neuen Risiken. Gute Filterung ist ein Gleichgewicht aus Schutz und Nutzbarkeit, das regelmäßig überprüft wird.

**„Cloud-Postfächer sind automatisch sicher konfiguriert.“** Viele Sicherheitsfunktionen sind vorhanden, aber nicht immer standardmäßig aktiv. Externe Weiterleitungen, Legacy-Protokolle oder Protokollierung müssen oft bewusst eingestellt werden.

**„Link-Umschreibung ist ein Datenschutzproblem, also verzichten wir darauf.“** Klickzeitprüfung verarbeitet Daten darüber, welche Links aufgerufen werden. Das muss transparent gemacht und datenschutzrechtlich bewertet werden. Ein pauschaler Verzicht ist nicht zwingend nötig – wichtig sind eine saubere Abwägung, Information der Belegschaft und eine angemessene Aufbewahrung.

**„Lokale Administratorrechte sind für produktives Arbeiten nötig.“** Die meisten Tätigkeiten funktionieren ohne Adminrechte. Wo Software installiert werden muss, helfen Softwarecenter oder zeitlich begrenzte Rechte. Ohne Adminrechte richtet ausgeführte Schadsoftware meist deutlich weniger Schaden an.

**„Wenn alles eingerichtet ist, sind wir fertig.“** Angriffstechniken ändern sich ständig. Konfigurationen, Richtlinien und Abläufe sollten regelmäßig überprüft und an neue Maschen angepasst werden.`,
  'rechnungsbetrug': `## Häufige Missverständnisse

**„Uns kann das nicht passieren, wir kennen unsere Lieferanten.“** Gerade enge, langjährige Geschäftsbeziehungen werden ausgenutzt, weil dort Vertrauen herrscht und Rückfragen ungewohnt sind. Der Angriff kommt nicht vom Lieferanten selbst, sondern aus dessen übernommenem Postfach.

**„Eine PDF-Rechnung mit Briefkopf ist echt.“** Briefköpfe, Logos und Unterschriften lassen sich leicht kopieren, insbesondere wenn Angreifer echte Rechnungen aus einem mitgelesenen Postfach besitzen. Das Aussehen einer Rechnung sagt wenig über ihre Echtheit.

**„Bei kleinen Beträgen lohnt sich die Prüfung nicht.“** Manche Angreifer testen mit kleinen Beträgen, ob eine Masche funktioniert, oder verschicken viele kleine Rechnungen in der Hoffnung, dass sie ungeprüft durchlaufen. Der Prozess sollte unabhängig von der Betragshöhe greifen, wenn sich Bankdaten ändern.

**„Die Bank hätte eine falsche Überweisung bemerkt.“** Banken führen Überweisungen grundsätzlich auf die angegebene IBAN aus. Zusätzliche Prüfungen helfen, ersetzen aber nicht den eigenen Kontrollprozess.

**„Ein Rückruf bei der Nummer in der Mail-Signatur genügt.“** Angreifer können die Signatur ändern und dort eine eigene Nummer eintragen. Rufen Sie daher immer die Nummer aus Ihren eigenen Unterlagen an – Lieferantenstamm, Vertrag oder frühere, sicher bekannte Korrespondenz.`,
  'qr-phishing': `## Häufige Missverständnisse

**„QR-Codes können keine Schadsoftware enthalten.“** Der Code selbst enthält meist nur eine Adresse. Gefährlich ist, wohin diese Adresse führt: zu einer gefälschten Anmeldeseite, einer Zahlungsseite oder dem Download einer App. Deshalb ist die Prüfung des Ziels so wichtig.

**„Der QR-Code steht auf einem offiziellen Schild, also stimmt er.“** Gerade öffentliche Schilder an Parkautomaten oder Ladesäulen werden überklebt. Ein offizielles Schild garantiert nicht, dass der Aufkleber darauf vom Betreiber stammt.

**„Auf dem Smartphone sehe ich ohnehin, ob eine Seite echt ist.“** Auf kleinen Bildschirmen werden Adressen oft gekürzt, und manche Browser blenden die Adressleiste beim Scrollen aus. Gefälschte Seiten sehen auf dem Smartphone genauso überzeugend aus wie am PC.

**„QR-Codes in Mails der eigenen IT sind normal.“** Interne Abteilungen haben selten einen Grund, für eine Anmeldung einen QR-Code statt eines Links oder des Intranets zu verwenden. Eine Ausnahme ist die Ersteinrichtung einer Authenticator-App, die in der Regel im bekannten Anmeldeportal oder persönlich mit der IT erfolgt – nicht über einen Code aus einer unerwarteten Mail.

**„Wenn ich nichts eingebe, kann nichts passieren.“** Das Risiko ist dann deutlich geringer. Trotzdem sollten Sie keine Apps installieren oder Berechtigungen erteilen, um die eine Seite nach dem Scan bittet.`,
  'mfa-betrug': `## Häufige Missverständnisse

**„Mit MFA ist mein Passwort egal.“** MFA ist eine zusätzliche Schutzschicht, kein Ersatz für ein gutes Passwort. Ist das Passwort bekannt, steht Angreifern nur noch der zweite Faktor im Weg – und genau den versuchen sie mit den beschriebenen Tricks zu überwinden.

**„SMS-Codes sind genauso sicher wie alles andere.“** SMS-Codes sind besser als gar kein zweiter Faktor. Sie können aber abgefangen, umgeleitet oder per Telefon erfragt werden. Authenticator-Apps mit Nummernabgleich und besonders Passkeys oder Sicherheitsschlüssel bieten mehr Schutz.

**„Eine Anfrage abzulehnen könnte Ärger mit der IT geben.“** Das Gegenteil ist richtig. Das Ablehnen unerwarteter Anfragen ist genau das gewünschte Verhalten. Die IT ist froh über jede Meldung, weil sie zeigt, dass ein Passwort möglicherweise kompromittiert ist.

**„Wenn die Anfrage aus meiner Stadt kommt, bin ich es wohl selbst.“** Standortangaben in MFA-Anfragen beruhen auf IP-Adressen und sind oft ungenau. Angreifer können zudem Server in Ihrer Nähe nutzen. Entscheidend ist allein, ob Sie gerade selbst eine Anmeldung gestartet haben.

**„Passkeys sind kompliziert.“** Für Nutzerinnen und Nutzer sind Passkeys oft sogar einfacher als Passwörter: Die Anmeldung erfolgt per Fingerabdruck, Gesichtserkennung oder Geräte-PIN. Der Schutz vor gefälschten Seiten ist dabei eingebaut.`,
  'smishing-messenger': `## Häufige Missverständnisse

**„SMS sind sicherer als E-Mails, weil es keine Spamfilter braucht.“** Das Gegenteil trifft zu: Für SMS gibt es oft weniger Filter als für E-Mails, und der Absendername lässt sich frei festlegen. Dass eine Nachricht im selben Verlauf wie echte Nachrichten Ihrer Bank erscheint, beweist nichts.

**„Auf ‚STOPP‘ antworten beendet die Nachrichten.“** Bei seriösen Diensten kann das funktionieren. Bei Betrügern bestätigt eine Antwort jedoch, dass Ihre Nummer aktiv ist. Besser: nicht antworten, blockieren und melden.

**„Ein Profilbild beweist, wer schreibt.“** Profilbilder in Messengern lassen sich von Websites oder sozialen Netzwerken kopieren. Name und Bild einer Führungskraft oder eines Familienmitglieds sind kein Identitätsnachweis.

**„Ende-zu-Ende-Verschlüsselung schützt vor Betrug.“** Verschlüsselung schützt den Inhalt vor Mitlesenden unterwegs. Sie sagt nichts darüber aus, ob die Person am anderen Ende die ist, für die sie sich ausgibt.

**„Firmen-Chats sind ein geschützter Raum.“** Interne Chats sind meist sicherer als öffentliche Messenger. Gastkonten, übernommene Konten oder geteilte Kanäle mit externen Partnern können aber auch dort zu Täuschungen führen. Die Regel bleibt: Zugangsdaten und Codes werden nie geteilt.`,
  'telefonbetrug-helpdesk': `## Häufige Missverständnisse

**„Der Anrufer kannte meinen Namen und meine Abteilung, also war er echt.“** Solche Informationen finden sich oft auf Firmenwebsites, in Karrierenetzwerken oder in früheren Datenlecks. Angreifer bereiten Anrufe gezielt vor. Insiderwissen ist kein Identitätsnachweis.

**„Auflegen ist unhöflich.“** Ein höfliches „Ich rufe Sie über die offizielle Nummer zurück“ ist professionell und in Sicherheitsfragen völlig angemessen. Echte Mitarbeitende von IT, Bank oder Behörde haben dafür Verständnis.

**„Ich habe nur kurz die Fernwartung zugelassen und gleich wieder beendet.“** Schon wenige Minuten reichen, um Daten zu kopieren oder eine dauerhafte Hintertür zu installieren. Auch nach einer kurzen Sitzung muss das Gerät von der IT geprüft werden.

**„Sprachnachrichten sind vertrauenswürdig, weil ich die Stimme erkenne.“** Mit modernen Werkzeugen lassen sich Stimmen inzwischen nachahmen, wenn genügend Aufnahmen vorhanden sind. Eine bekannte Stimme allein sollte bei ungewöhnlichen Bitten – besonders um Geld oder Zugangsdaten – nicht den Ausschlag geben.

**„Helpdesks müssen jedem Anrufer schnell helfen.“** Schnelligkeit ist wichtig, Sicherheit aber auch. Ein kurzer Rückruf zur Identitätsprüfung schützt Helpdesk und Mitarbeitende gleichermaßen.`,
  'legitim-ungewoehnlich': `## Häufige Missverständnisse

**„Lieber alles melden, dann bin ich auf der sicheren Seite.“** Melden ist gut und ausdrücklich erwünscht. Wer aber jede Kalenderänderung meldet, verliert Zeit und stumpft mit der Zeit ab. Ziel ist, unsichere Fälle zu melden und offensichtlich harmlose Alltagsnachrichten normal zu bearbeiten.

**„Wenn eine Nachricht keinen Link hat, ist sie sicher.“** Auch Nachrichten ohne Link können zu riskanten Handlungen führen, etwa zu einer Überweisung, einem Rückruf bei einer falschen Nummer oder der Herausgabe von Informationen. Prüfen Sie, was verlangt wird.

**„Echte Firmen machen keine Rechtschreibfehler.“** Menschen schreiben unter Zeitdruck, auf dem Smartphone oder in einer Fremdsprache. Fehler kommen in echten Mails ständig vor.

**„Neue Domain heißt Betrug.“** Unternehmen benennen sich um, fusionieren oder wechseln den Mailanbieter. Eine neue Domain verdient eine kurze Prüfung über einen bekannten Weg, aber kein pauschales Urteil.

**„Wenn die IT es nicht angekündigt hat, ist es falsch.“** Nicht jede Benachrichtigung wird vorher angekündigt, etwa automatische Sicherheitsmeldungen nach eigener Handlung. Die Frage ist, ob die Nachricht zu Ihrem Handeln passt und ob sie Sie zu etwas Riskantem auffordert.`,
  'sicher-melden': `## Häufige Missverständnisse

**„Wenn ich melde, mache ich der IT unnötig Arbeit.“** Meldungen sind für die IT eine wertvolle Informationsquelle. Eine gut organisierte IT kann gemeldete Nachrichten schnell bewerten. Viel aufwendiger als eine Meldung ist ein unentdeckter Vorfall.

**„Andere haben die Mail bestimmt schon gemeldet.“** Darauf verlassen sich oft alle – und am Ende meldet niemand. Melden Sie trotzdem. Mehrere Meldungen helfen der IT zudem einzuschätzen, wie viele Personen betroffen sind.

**„Ich lösche die Mail einfach, das ist genauso gut.“** Löschen schützt nur Ihr eigenes Postfach. Kolleginnen mit derselben Nachricht bleiben gefährdet, und der IT fehlen Informationen über die Kampagne.

**„Ich melde erst, wenn ich mir sicher bin.“** Ein begründeter Verdacht reicht. Die Bewertung übernimmt die IT. Wer wartet, bis er sicher ist, verliert wertvolle Zeit.

**„Wer meldet, wird bei einem Fehler zur Rechenschaft gezogen.“** In einer guten Sicherheitskultur ist das Gegenteil der Fall: Wer einen eigenen Fehler schnell meldet, handelt vorbildlich. Unternehmen sollten das klar kommunizieren.`,
  'nach-dem-klick': `## Häufige Missverständnisse

**„Ich ändere schnell mein Passwort, dann muss ich niemandem etwas sagen.“** Das Passwort zu ändern ist richtig, reicht aber oft nicht aus. Angreifer können bereits eine Sitzung übernommen, Weiterleitungsregeln eingerichtet oder eigene MFA-Geräte registriert haben. Das kann nur die IT zuverlässig prüfen und beheben.

**„Ich schalte den Rechner aus, dann ist die Gefahr gebannt.“** Ausschalten stoppt zwar laufende Vorgänge, kann aber wichtige Spuren für die Analyse vernichten. Trennen Sie das Netzwerk und folgen Sie den Anweisungen der IT.

**„Es ist schon ein paar Tage her, jetzt lohnt sich das Melden nicht mehr.“** Auch eine späte Meldung ist wertvoll. Angreifer bleiben oft lange unbemerkt im System. Jede Information hilft, den Vorfall aufzuklären.

**„Nach der Eingabe kam eine Fehlermeldung, also hat es nicht funktioniert.“** Viele Phishing-Seiten zeigen absichtlich einen Fehler oder leiten auf die echte Seite weiter, nachdem sie Ihre Daten gespeichert haben. Eine Fehlermeldung ist kein Entwarnungssignal.

**„Ich warte ab, ob etwas Auffälliges passiert.“** Viele Folgen eines Angriffs sind für Betroffene unsichtbar. Abwarten verschafft vor allem den Angreifern Zeit.`,
  'incident-response': `## Häufige Missverständnisse

**„Wir sind zu klein für einen Incident-Response-Plan.“** Auch kleine Organisationen profitieren von einer einfachen Seite mit Zuständigkeiten, Kontakten und den wichtigsten Schritten. Im Ernstfall spart das wertvolle Zeit und verhindert hektische Fehlentscheidungen.

**„Am schnellsten ist es, das Gerät sofort neu aufzusetzen.“** Ein Neuaufsetzen beseitigt zwar Schadsoftware, vernichtet aber auch Spuren, die zeigen, wie der Angriff ablief und ob weitere Systeme betroffen sind. Erst sichern, dann bereinigen.

**„Passwort zurücksetzen genügt.“** Bestehende Sitzungen und Zugriffstokens bleiben je nach System gültig, bis sie ausdrücklich widerrufen werden. Auch eingerichtete Regeln, App-Berechtigungen oder zusätzliche MFA-Geräte überdauern einen Passwortwechsel.

**„Nach dem Vorfall ist vor dem Vorfall – Nachbereitung kostet nur Zeit.“** Ohne Nachbereitung wiederholen sich Vorfälle. Schon eine kurze Besprechung mit drei Fragen – was ist passiert, was hat geholfen, was ändern wir – verbessert den Schutz spürbar.

**„Die betroffene Person sollte aus dem Prozess herausgehalten werden.“** Die meldende oder betroffene Person ist oft die wichtigste Informationsquelle. Ein respektvoller Umgang fördert zudem künftige Meldungen.`,
  'awareness-schulungen': `## Häufige Missverständnisse

**„Eine hohe Klickrate zeigt, dass die Belegschaft schlecht ist.“** Klickraten hängen stark vom Schwierigkeitsgrad der Übung ab und lassen sich leicht in jede Richtung beeinflussen. Aussagekräftiger ist, wie viele Menschen verdächtige Nachrichten melden und wie schnell das geschieht.

**„Je schwieriger die Übung, desto besser.“** Übungen, die praktisch niemand erkennen kann, frustrieren und vermitteln das Gefühl, ohnehin machtlos zu sein. Gute Übungen steigern den Schwierigkeitsgrad schrittweise und erklären jede Entscheidung.

**„Awareness ist Aufgabe der IT.“** Die IT kann Inhalte bereitstellen, aber eine Sicherheitskultur entsteht durch Führungskräfte, Personalentwicklung und alle Mitarbeitenden gemeinsam.

**„Wer die Schulung abgeschlossen hat, ist geschützt.“** Wissen verblasst, und Angriffe ändern sich. Regelmäßige Auffrischungen in kleinen Einheiten halten das Thema präsent.

**„Mehr Regeln führen zu mehr Sicherheit.“** Eine lange Liste von Verboten wird schnell vergessen. Wenige, gut verständliche Grundsätze – innehalten, prüfen über bekannte Wege, melden – sind im Alltag wirksamer.`,
};
