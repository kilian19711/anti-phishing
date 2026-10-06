import type { Article } from '../../types/content';

export const responseArticles: Article[] = [
  {
    id: 'legitim-ungewoehnlich',
    title: 'Legitim, aber ungewöhnlich: echte Nachrichten richtig prüfen',
    summary: 'Warum echte Nachrichten manchmal verdächtig wirken, welche Indizien Vertrauen stützen und wie Sie über einen unabhängigen Kontaktweg prüfen, statt pauschal zu urteilen.',
    category: 'Grundlagen',
    audience: 'alle',
    level: 'mittel',
    tags: ['Legitime Nachrichten', 'Prüfen', 'Fehlalarme'],
    body: `## Worum geht es?

Wer viel über Phishing lernt, wird manchmal übervorsichtig. Plötzlich wirkt jede Mail mit Frist, jeder neue Absender und jeder Rechtschreibfehler verdächtig. Das ist verständlich, hat aber Nachteile: Wichtige Nachrichten werden ignoriert, Kunden warten auf Antworten, und die IT wird mit Meldungen überflutet. Ziel ist deshalb nicht maximales Misstrauen, sondern **sicheres Prüfen**. Dieser Artikel zeigt, warum echte Nachrichten ungewöhnlich aussehen können und wie Sie sie souverän einordnen.

## Warum echte Nachrichten verdächtig wirken können

- **Neue Kontakte:** Neue Partner, Dienstleister oder Kundinnen schreiben von Adressen, die Sie noch nicht kennen.
- **Externe Dienstleister:** Unternehmen lassen Umfragen, Newsletter, Rechnungsportale oder Bewerbermanagement über Drittanbieter laufen. Dann kommt die Mail von einer fremden Domain.
- **Automatische Systeme:** Sicherheitsbenachrichtigungen, Ticketsysteme und Freigabedienste schreiben knapp, technisch und oft von „noreply“-Adressen.
- **Eile und Fehler:** Auch Kolleginnen, Kunden und Führungskräfte schreiben mal hastig, ohne Anrede oder mit Tippfehlern.
- **Fremdsprachen:** Internationale Partner schreiben auf Englisch oder in gemischter Sprache.
- **Echte Sicherheitsrückfragen:** Banken oder die IT melden sich tatsächlich, wenn etwas auffällig ist – und das wirkt naturgemäß alarmierend.
- **Echte Änderungen:** Firmen wechseln die Domain, die Bank oder Ansprechpartner.

## Indizien, die Vertrauen stützen

Keines dieser Merkmale ist allein ein Beweis, aber zusammen ergeben sie ein belastbares Bild:

- **Bezug auf Ihre eigene Handlung:** Eine Bestellung, ein Ticket, ein Reset, den Sie angefordert haben, ein Gespräch, das stattgefunden hat.
- **Konkrete, überprüfbare Details:** Bestellnummer, Vertragsnummer, Raum, Projektname.
- **Keine riskante Handlung:** Kein Passwort, keine Zahlung, keine Bankdatenänderung, keine Makros.
- **Verweis auf bekannte Wege:** „Melden Sie sich wie gewohnt im Intranet an“, „rufen Sie die Ihnen bekannte Nummer an“.
- **Unterstützung der Prüfung:** Der Absender bietet selbst einen Rückruf an oder bittet ausdrücklich, Daten nicht allein aus der Mail zu übernehmen.
- **Unabhängige Bestätigung:** Die Information findet sich auch im Intranet, im Kalender oder im Kundenkonto.

## Erkennungsmerkmale und ihre Grenzen

Warnsignale bleiben auch bei legitim wirkenden Nachrichten ernst zu nehmen, etwa ein abweichendes Linkziel, eine neue Bankverbindung oder die Bitte um Zugangsdaten. **Grenzen:** Vertrauensindizien können gefälscht sein. Ein Angreifer mit Zugriff auf ein echtes Postfach kennt echte Bestellnummern und Projektnamen. Deshalb gilt: Je riskanter die verlangte Handlung, desto wichtiger ist die unabhängige Prüfung – unabhängig davon, wie echt die Nachricht wirkt.

## Prüfen über einen unabhängigen Kontaktweg

Ein **unabhängiger Kontaktweg** ist ein Weg, den Sie selbst kennen und der nicht aus der fraglichen Nachricht stammt:

- Telefonnummer aus dem internen Verzeichnis, dem Lieferantenstamm oder dem CRM.
- Nummer auf der Rückseite Ihrer Bankkarte.
- Eigenes Lesezeichen oder die offizielle App eines Dienstes.
- Persönliches Gespräch oder ein bekannter interner Kanal.
- Eine bereits bekannte, alte E-Mail-Adresse, an die Sie eine **neue** Mail schreiben.

So gehen Sie vor: Sie lassen die fragliche Nachricht beiseite, kontaktieren den Absender über den unabhängigen Weg und fragen nach dem Vorgang. Ist die Nachricht echt, wird das bestätigt. Ist sie gefälscht, haben Sie einen Angriff verhindert. In beiden Fällen kostet das meist nur wenige Minuten.

## Ein fiktives Beispiel

> **Absender:** Firmenkundenbetreuung Regionalbank <firmenkunden@regionalbank-sued.example>
> „Zu der heute angelegten Auslandsüberweisung über 12.400 EUR haben wir eine Rückfrage. Bitte rufen Sie uns unter der Ihnen bekannten Nummer an. Aus Sicherheitsgründen senden wir weder Links noch Telefonnummern.“

Die Nachricht wirkt alarmierend. Sie verlangt aber nichts außer einem Rückruf über einen Weg, den Sie selbst kennen. Selbst wenn sie gefälscht wäre, würde dieser Weg Sie schützen. Wer sie ungeprüft löscht, riskiert dagegen, dass eine betrügerische Überweisung ausgeführt wird.

## Schutzmaßnahmen

- Bewerten Sie nicht einzelne Merkmale, sondern das Gesamtbild aus Anlass, Absender, Aufforderung und Prüfbarkeit.
- Fragen Sie sich: Was passiert schlimmstenfalls, wenn ich der Nachricht folge? Je höher das Risiko, desto gründlicher die Prüfung.
- Nutzen Sie bekannte Wege statt Links.
- Melden Sie unsichere Fälle: Die IT gibt Ihnen Rückmeldung, und mit der Zeit entwickeln Sie ein sicheres Gespür.

## Im Ernstfall

Haben Sie eine echte Nachricht fälschlich gelöscht oder gemeldet, ist das kein Problem: Kontaktieren Sie den Absender über einen bekannten Weg und klären Sie den Vorgang. Haben Sie dagegen eine riskante Handlung ausgeführt, folgen Sie den Schritten im Artikel „Nach dem Klick: Was jetzt zu tun ist“.

## Zusammengefasst

Ungewöhnlich heißt nicht automatisch gefährlich. Vertrauen entsteht aus Kontext, Bezug zur eigenen Handlung, fehlender riskanter Aufforderung und unabhängiger Bestätigung. Im Zweifel prüfen Sie über einen Weg, den Sie selbst kennen – das schützt in beide Richtungen.`,
    checklist: [
      'Bezieht sich die Nachricht auf etwas, das ich selbst getan oder vereinbart habe?',
      'Gibt es konkrete, überprüfbare Details?',
      'Wird eine riskante Handlung verlangt?',
      'Verweist die Nachricht auf bekannte Wege?',
      'Über einen unabhängigen Kontaktweg bestätigt?',
      'Gesamtbild statt einzelner Merkmale bewertet?',
    ],
    relatedArticleIds: ['phishing-grundlagen', 'sicher-melden', 'rechnungsbetrug'],
  },
  {
    id: 'sicher-melden',
    title: 'Verdächtige Nachrichten sicher melden',
    summary: 'Warum jede Meldung hilft, wie Sie richtig melden, ohne Spuren zu zerstören, und was nach einer Meldung passiert.',
    category: 'Richtig reagieren',
    audience: 'alle',
    level: 'leicht',
    tags: ['Melden', 'Meldekultur', 'IT-Sicherheit'],
    body: `## Worum geht es?

Eine verdächtige Nachricht einfach zu löschen schützt nur Sie selbst – und das auch nur, wenn Sie nicht bereits reagiert haben. Eine **Meldung** schützt dagegen alle: Die IT kann dieselbe Nachricht in anderen Postfächern finden und entfernen, Absender und Links sperren und andere warnen. Phishing-Kampagnen gehen oft an viele Personen gleichzeitig. Die erste Meldung kann entscheidend sein, bevor jemand anderes klickt.

## Warum Melden so wichtig ist

- **Geschwindigkeit:** Je früher die IT von einer Kampagne erfährt, desto weniger Menschen sind betroffen.
- **Lernen:** Gemeldete Mails verbessern Filter und Schulungen.
- **Früherkennung:** Gezielte Angriffe zeigen sich oft zuerst in einzelnen, auffälligen Mails.
- **Schadensbegrenzung:** Wer nach einem Klick schnell meldet, ermöglicht der IT schnelles Handeln.

## Wie Sie richtig melden

### Mit dem Melde-Button

Viele Mailprogramme haben einen Button wie „Phishing melden“ oder „Verdächtige Nachricht melden“. Er leitet die Nachricht mit allen technischen Informationen an die IT weiter und entfernt sie meist aus Ihrem Posteingang. Das ist der beste Weg.

### Ohne Melde-Button

- Leiten Sie die Mail **als Anlage** an die von Ihrer IT genannte Adresse weiter. So bleiben die technischen Kopfzeilen (Header) erhalten, die für die Analyse wichtig sind. Eine normale Weiterleitung verliert diese Informationen.
- Klicken Sie dabei keine Links an und öffnen Sie keine Anhänge.
- Ergänzen Sie kurz, was Ihnen aufgefallen ist und ob Sie bereits reagiert haben.

### SMS, Messenger und Anrufe

Machen Sie einen Screenshot, auf dem Absender, Uhrzeit und Inhalt zu sehen sind, und schicken Sie ihn auf dem vereinbarten Weg an die IT. Bei Anrufen notieren Sie Uhrzeit, angezeigte Nummer, Namen und Inhalt.

## Was Sie besser nicht tun

- **Nicht auf die Nachricht antworten** – auch nicht, um den Absender zur Rede zu stellen. Das bestätigt nur, dass Ihre Adresse aktiv ist.
- **Nicht an Kolleginnen weiterleiten**, um sie zu warnen. Dabei kann jemand versehentlich klicken. Warnungen verschickt die IT.
- **Links nicht „zum Testen“ öffnen**, auch nicht auf dem privaten Handy.
- **Nicht aus Scham schweigen**, wenn Sie bereits geklickt haben.

## Erkennungsmerkmale und ihre Grenzen

Sie müssen nicht sicher sein, dass eine Nachricht Phishing ist, um sie zu melden. Ein begründeter Verdacht genügt. **Grenzen:** Nicht jede ungewöhnliche Nachricht muss gemeldet werden – alltägliche, erkennbar harmlose Mails ohne Link, Anhang oder Aufforderung können Sie normal bearbeiten. Wenn Sie unsicher sind, ist eine Meldung aber immer die bessere Wahl als ein Klick.

## Was nach einer Meldung passiert

Typischerweise prüft die IT die Nachricht und gibt Ihnen eine kurze Rückmeldung, etwa „Danke, das war Phishing – die Nachricht wurde aus allen Postfächern entfernt“ oder „Danke, die Nachricht ist legitim“. Beides ist ein Gewinn: Im ersten Fall haben Sie geholfen, einen Angriff zu stoppen, im zweiten haben Sie gelernt, eine echte Nachricht sicher zu erkennen. Eine gute IT bedankt sich für jede Meldung – auch für Fehlalarme.

## Ein fiktives Beispiel

> Sie erhalten eine Mail „Ihr Postfach ist zu 99 % voll“ mit Link zu einer fremden Seite. Sie klicken auf „Phishing melden“. Eine Stunde später erhalten Sie eine Rückmeldung: Die Mail ging an 140 Mitarbeitende, wurde aus allen Postfächern entfernt, und der Link wurde gesperrt.

Ihre Meldung hat möglicherweise verhindert, dass jemand anderes sein Passwort eingibt.

## Schutzmaßnahmen

- Kennen Sie den Meldeweg in Ihrem Unternehmen, bevor Sie ihn brauchen.
- Führungskräfte loben Meldungen sichtbar – auch Fehlalarme.
- Wer nach einem Klick meldet, wird nicht bestraft. Nur so erfährt die IT rechtzeitig davon.
- Die IT gibt zeitnah Rückmeldung und erklärt kurz, warum eine Nachricht gefährlich oder harmlos war.

## Im Ernstfall

Haben Sie bereits geklickt, Daten eingegeben oder eine Datei geöffnet, melden Sie das **zusätzlich telefonisch** an den Helpdesk – nicht nur per Melde-Button. Sagen Sie klar, was passiert ist: „Ich habe auf den Link geklickt und mein Passwort eingegeben.“ Dann kann die IT sofort handeln.

## Zusammengefasst

Melden schützt alle. Nutzen Sie den Melde-Button oder leiten Sie als Anlage weiter, antworten Sie nicht und leiten Sie nicht an Kolleginnen weiter. Fehlalarme sind kein Problem, verschwiegene Klicks schon.`,
    checklist: [
      'Melde-Button genutzt oder als Anlage weitergeleitet?',
      'Keine Links geöffnet, keinen Anhang geöffnet?',
      'Nicht geantwortet und nicht an Kollegen weitergeleitet?',
      'Bei bereits erfolgtem Klick zusätzlich telefonisch gemeldet?',
      'Kurz beschrieben, was aufgefallen ist?',
    ],
    relatedArticleIds: ['nach-dem-klick', 'phishing-grundlagen', 'awareness-schulungen'],
  },
  {
    id: 'nach-dem-klick',
    title: 'Nach dem Klick: Was jetzt zu tun ist',
    summary: 'Konkrete Schritte für Mitarbeitende, wenn sie auf einen Link geklickt, Daten eingegeben, einen Anhang geöffnet oder Geld überwiesen haben.',
    category: 'Richtig reagieren',
    audience: 'alle',
    level: 'leicht',
    tags: ['Notfall', 'Passwort ändern', 'Schadensbegrenzung'],
    body: `## Worum geht es?

Es kann jedem passieren: Ein Moment der Unaufmerksamkeit, eine besonders gut gemachte Mail – und schon ist es geschehen. Wichtig ist jetzt nicht die Frage nach der Schuld, sondern **schnelles, ruhiges Handeln**. Je früher Sie reagieren und melden, desto besser lässt sich ein Schaden verhindern oder begrenzen. Dieser Artikel zeigt Ihnen Schritt für Schritt, was je nach Situation zu tun ist.

## Erste Grundregel: Ruhe bewahren und melden

Melden Sie den Vorfall **sofort** der IT, am besten telefonisch über die bekannte Helpdesk-Nummer. Sagen Sie offen, was passiert ist. Die IT braucht diese Information, um handeln zu können. Niemand erwartet, dass Sie nie einen Fehler machen – erwartet wird, dass Sie ihn schnell melden.

## Situation 1: Link geklickt, nichts eingegeben

- Schließen Sie die Seite.
- Geben Sie nichts ein und laden Sie nichts herunter.
- Melden Sie die Nachricht und dass Sie geklickt haben.

Das Risiko ist meist gering, weil moderne Browser und Systeme gut geschützt sind. Die IT kann aber prüfen, ob die Seite versucht hat, etwas herunterzuladen, und den Link für andere sperren.

## Situation 2: Zugangsdaten eingegeben

1. **Passwort sofort ändern** – über den bekannten Weg, nicht über einen Link aus der Mail.
2. Wenn Sie dasselbe Passwort auch woanders verwenden, ändern Sie es auch dort.
3. **IT sofort informieren.** Sie kann laufende Sitzungen beenden, Anmeldungen prüfen und kontrollieren, ob Angreifer Postfachregeln oder eigene MFA-Methoden eingerichtet haben.
4. Achten Sie in den nächsten Tagen auf ungewöhnliche Aktivitäten, etwa unerwartete MFA-Anfragen oder Mails in „Gesendet“, die Sie nicht geschrieben haben.

## Situation 3: Anhang geöffnet oder Programm ausgeführt

1. **Netzwerk trennen:** LAN-Kabel ziehen, WLAN ausschalten. So kann sich Schadsoftware nicht weiter ausbreiten.
2. **Gerät eingeschaltet lassen.** Ausschalten kann wichtige Spuren im Arbeitsspeicher zerstören. Folgen Sie hier aber den Vorgaben Ihrer IT.
3. **IT sofort telefonisch informieren.**
4. Nicht weiterarbeiten, keine USB-Sticks anschließen, keine Dateien kopieren.

## Situation 4: MFA-Anfrage bestätigt oder Code weitergegeben

1. Helpdesk sofort über die bekannte Nummer anrufen.
2. Passwort ändern, sobald die IT das freigibt.
3. Die IT beendet Sitzungen und prüft registrierte Anmeldemethoden.

## Situation 5: Geld überwiesen oder Zahlungsdaten eingegeben

1. **Bank sofort anrufen** – über die Nummer auf der Karte oder aus dem Online-Banking, nicht aus der Mail. Bei Überweisungen kann ein schneller Rückruf manchmal noch gelingen.
2. Karte sperren lassen, wenn Kartendaten betroffen sind.
3. Führungskraft, Buchhaltung und IT informieren.
4. Anzeige bei der Polizei erstatten.

## Situation 6: Vertrauliche Informationen weitergegeben

Informieren Sie Ihre Führungskraft und die IT. Je nach Art der Daten können weitere Stellen eingebunden werden müssen, etwa die oder der Datenschutzbeauftragte, wenn personenbezogene Daten betroffen sind.

## Erkennungsmerkmale und ihre Grenzen

Woran merken Sie, dass etwas schiefgelaufen sein könnte? Hinweise sind etwa: Die Seite hat nach der Eingabe eine Fehlermeldung gezeigt oder Sie auf die echte Seite weitergeleitet; ein Dokument hat sich nicht wie erwartet geöffnet; Ihr Gerät verhält sich anders; Kolleginnen erhalten seltsame Mails von Ihnen. **Grenzen:** Viele Angriffe bleiben für Sie unsichtbar. Deshalb gilt: Auch wenn „scheinbar nichts passiert ist“, melden Sie den Vorfall.

## Ein fiktives Beispiel

> Sie öffnen eine angebliche Rechnung, die sich als HTML-Datei entpuppt, und geben Ihr Passwort auf der angezeigten Seite ein. Danach erscheint eine Fehlermeldung. Ihnen wird klar, dass das Phishing war.

Richtig: sofort das Passwort über den bekannten Weg ändern, den Helpdesk anrufen und die Mail melden. Die IT beendet Ihre Sitzungen, prüft Ihre Anmeldungen und sucht nach weiteren Empfängern der Mail.

## Schutzmaßnahmen

- Für jeden Dienst ein eigenes Passwort, am besten mit Passwortmanager.
- MFA aktivieren, wo möglich mit Passkeys oder Sicherheitsschlüssel.
- Die Helpdesk-Nummer griffbereit haben – nicht erst im Notfall suchen.
- Aus dem Vorfall lernen, ohne sich Vorwürfe zu machen.

## Im Ernstfall

Melden, Passwort ändern, Netzwerk trennen bei geöffneten Dateien, Bank anrufen bei Geld. Und: Schnelligkeit ist wichtiger als Perfektion.

## Zusammengefasst

Fehler passieren. Entscheidend ist, schnell und offen zu reagieren: IT informieren, betroffene Zugangsdaten ändern, bei Schadsoftware das Netzwerk trennen und bei finanziellen Schäden sofort die Bank kontaktieren.`,
    checklist: [
      'IT sofort (telefonisch) informiert?',
      'Betroffenes Passwort über den bekannten Weg geändert?',
      'Bei geöffneter Datei: Netzwerk getrennt, Gerät eingeschaltet gelassen?',
      'Bei Geld- oder Kartendaten: Bank sofort angerufen?',
      'Weiterverwendete Passwörter ebenfalls geändert?',
      'Auf ungewöhnliche Aktivitäten in den Folgetagen geachtet?',
    ],
    relatedArticleIds: ['incident-response', 'sicher-melden', 'mfa-betrug'],
  },
];
