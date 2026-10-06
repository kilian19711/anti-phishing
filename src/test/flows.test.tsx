import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEY } from '../lib/storage';
import { renderApp } from './renderApp';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ configured: false }), { status: 200 })));
  window.scrollTo = vi.fn() as never;
});

describe('Vertikaler Ablauf', () => {
  it('Dashboard → Runde → Antwort → Feedback → Artikel → zurück zum Quiz → Ergebnis', async () => {
    const user = userEvent.setup();
    renderApp('/');
    expect(screen.getByRole('heading', { level: 1, name: /Phishing erkennen/ })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Training starten' }));
    await user.click(screen.getByLabelText('Kurze Runde (5 Fälle)'));
    await user.click(screen.getByRole('button', { name: /Runde starten/ }));

    expect(screen.getByRole('heading', { level: 1, name: 'Fall 1 von 5' })).toBeInTheDocument();
    expect(screen.getAllByText(/Lernübung – alle Absender und Adressen sind erfunden/).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /^Phishing$/ }));
    const feedback = screen.getByRole('region', { name: /eingeordnet/ });
    expect(within(feedback).getByText('Sichere nächste Handlung')).toBeInTheDocument();
    expect(within(feedback).getByText(/Warum nicht/)).toBeInTheDocument();

    const articleLink = within(feedback).getAllByRole('link', { name: /^Mehr dazu:/ })[0];
    await user.click(articleLink);
    expect(screen.getByRole('navigation', { name: 'Brotkrümelnavigation' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Zurück zum Quiz' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Fall 1 von 5' })).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole('button', { name: /Nächster Fall|Überspringen/ }));
    }
    await user.click(screen.getByRole('button', { name: /Überspringen und auswerten/ }));
    expect(screen.getByRole('heading', { level: 1, name: 'Auswertung der Runde' })).toBeInTheDocument();
    expect(screen.getByText(/von 1/)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Dashboard' }));
    expect(screen.getByText('bearbeitete Übungen').previousSibling).toHaveTextContent('1');
  });

  it('simulierter Link öffnet nur eine interne Erklärung', async () => {
    const user = userEvent.setup();
    renderApp('/szenarien/sc-001');
    const link = screen.getByRole('link', { name: /Gebühr jetzt bezahlen/ });
    expect(link).toHaveAttribute('title', 'https://paket-zahlung.example/verify');
    await user.click(link);
    expect(screen.getByText(/Dieser Link führt nirgendwohin/)).toBeInTheDocument();
    expect(screen.getByText('Hier wäre es gefährlich geworden')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Zurück zur Nachricht' }));
    expect(screen.queryByText(/Dieser Link führt nirgendwohin/)).not.toBeInTheDocument();
  });

  it('Abbruch einer Runde mit Bestätigung', async () => {
    const user = userEvent.setup();
    renderApp('/training');
    await user.click(screen.getByRole('button', { name: /Runde starten/ }));
    await user.click(screen.getByRole('button', { name: 'Abbrechen' }));
    await user.click(screen.getByRole('button', { name: 'Ja, abbrechen' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Training starten' })).toBeInTheDocument();
  });

  it('Hinweise-markieren-Modus wertet Markierungen aus', async () => {
    const user = userEvent.setup();
    renderApp('/training');
    await user.click(screen.getByLabelText(/Hinweise markieren/));
    await user.click(screen.getByRole('button', { name: /Runde starten/ }));
    await user.click(screen.getByRole('button', { name: 'Absender markieren' }));
    expect(screen.getByRole('button', { name: 'Absender markieren' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: /^Legitim$/ }));
    expect(screen.getByText('Ihre Markierungen')).toBeInTheDocument();
  });

  it('Artikel startet thematische Runde', async () => {
    const user = userEvent.setup();
    renderApp('/wissen/qr-phishing');
    await user.click(screen.getAllByRole('link', { name: /Quiz zu diesem Thema starten/ })[0]);
    expect(screen.getByText(/Thematische Runde/)).toBeInTheDocument();
  });
});

describe('Wissen und Bibliothek', () => {
  it('Suche filtert Artikel und zeigt leeren Zustand', async () => {
    const user = userEvent.setup();
    renderApp('/wissen');
    await user.type(screen.getByLabelText('Suche'), 'DMARC');
    expect(screen.getByRole('link', { name: /SPF, DKIM und DMARC/ })).toBeInTheDocument();
    await user.clear(screen.getByLabelText('Suche'));
    await user.type(screen.getByLabelText('Suche'), 'xyzunbekannt');
    expect(screen.getByText(/passt kein Artikel/)).toBeInTheDocument();
  });

  it('Bibliothek filtert nach Ergebnis', async () => {
    const user = userEvent.setup();
    renderApp('/szenarien');
    await user.selectOptions(screen.getByLabelText('Ergebnis'), 'legitim');
    expect(screen.getByText('30 Szenarien gefunden.')).toBeInTheDocument();
  });

  it('unbekannte Routen zeigen 404', () => {
    renderApp('/gibt-es-nicht');
    expect(screen.getByRole('heading', { level: 1, name: 'Seite nicht gefunden' })).toBeInTheDocument();
    renderApp('/wissen/unbekannt');
    expect(screen.getAllByText(/Dieser Artikel existiert nicht/).length).toBeGreaterThan(0);
  });
});

describe('Fortschritt und Speicherung', () => {
  it('speichert nichts ohne Zustimmung, speichert nach Aktivierung, stellt wieder her und löscht', async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp('/training');
    await user.click(screen.getByRole('button', { name: /Runde starten/ }));
    await user.click(screen.getByRole('button', { name: /^Phishing$/ }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    await user.click(screen.getByRole('link', { name: 'Fortschritt' }));
    await user.click(screen.getByRole('button', { name: 'Dauerhaftes Speichern aktivieren' }));
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!);
    expect(stored.history).toHaveLength(1);
    expect(Object.keys(stored.history[0]).sort()).toEqual(['at', 'chosen', 'correct', 'scenarioId']);
    unmount();

    renderApp('/fortschritt');
    expect(screen.getByText(/Gespeichert sind 1 Antworten/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Gespeicherte Daten löschen/ }));
    await user.click(screen.getByRole('button', { name: 'Ja, endgültig löschen' }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(screen.getByText(/aus diesem Browser gelöscht/)).toBeInTheDocument();
  });
});

describe('Editor', () => {
  it('validiert, speichert und zeigt eigenes Szenario in der Bibliothek', async () => {
    const user = userEvent.setup();
    renderApp('/editor');
    await screen.findByRole('heading', { level: 1, name: 'Szenario-Editor' });
    await user.click(screen.getByRole('button', { name: 'Szenario speichern' }));
    expect(screen.getByText(/Das Szenario enthält \d+ Fehler/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^ID/)).toHaveAttribute('aria-invalid', 'true');

    await user.type(screen.getByLabelText(/^ID/), 'eigen-test');
    await user.type(screen.getByLabelText(/^Titel/), 'Mein Testfall');
    await user.type(screen.getByLabelText(/^Absendername/), 'Test GmbH');
    await user.type(screen.getByLabelText(/^Absenderadresse/), 'info@test.example');
    await user.type(screen.getByLabelText(/^Betreff/), 'Hallo');
    await user.type(screen.getByLabelText(/^Nachricht\s*\*?$/), 'Bitte melden Sie sich an.');
    await user.type(screen.getByLabelText(/^Lernziel/), 'Testen');
    await user.type(screen.getByLabelText('Erklärung'), 'Fremde Domain.');
    await user.type(screen.getByLabelText(/^Erklärung der richtigen/), 'Weil.');
    await user.type(screen.getByLabelText(/^Warum die andere/), 'Darum.');
    await user.type(screen.getByLabelText(/^Empfohlene Handlung/), 'Melden.');
    await user.type(screen.getByLabelText(/^Verhalten nach/), 'IT anrufen.');
    await user.click(screen.getByLabelText('Phishing und Social Engineering verstehen'));
    expect(screen.getByRole('article', { name: /Mein Testfall/ })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Szenario speichern' }));
    expect(screen.getByText(/gespeichert/)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Szenarien' }));
    expect(screen.getByText('61 Szenarien gefunden.')).toBeInTheDocument();
    expect(screen.getByText('Eigenes Szenario')).toBeInTheDocument();
  });
});

describe('Kontaktformular', () => {
  it('zeigt fehlende Konfiguration, validiert im Browser und verliert keine Eingaben bei Fehlern', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ configured: false }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ code: 'not_configured', message: 'Der E-Mail-Versand ist noch nicht eingerichtet. Ihre Nachricht wurde nicht versendet.' }), { status: 503 }));
    vi.stubGlobal('fetch', fetchMock);
    renderApp('/kontakt');
    expect(await screen.findByText('E-Mail-Versand noch nicht eingerichtet')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Nachricht senden' }));
    expect(screen.getByLabelText(/E-Mail-Adresse/)).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await user.type(screen.getByLabelText(/E-Mail-Adresse/), 'a@b.example');
    await user.selectOptions(screen.getByLabelText(/^Thema/), 'Sonstiges');
    await user.type(screen.getByLabelText(/^Betreff/), 'Test');
    await user.type(screen.getByLabelText(/^Nachricht/), 'Eine ausreichend lange Nachricht.');
    await user.click(screen.getByRole('button', { name: 'Nachricht senden' }));
    await waitFor(() => expect(screen.getByText(/wurde nicht versendet/, { selector: 'p' })).toBeInTheDocument());
    expect(screen.queryByText('Nachricht angenommen')).not.toBeInTheDocument();
    expect(screen.getByLabelText(/^Nachricht/)).toHaveValue('Eine ausreichend lange Nachricht.');
  });

  it('zeigt Erfolg erst nach Bestätigung', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ configured: true }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ code: 'sent', message: 'Ihre Nachricht wurde vom E-Mail-Dienst angenommen.' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    renderApp('/kontakt');
    await user.type(screen.getByLabelText(/E-Mail-Adresse/), 'a@b.example');
    await user.selectOptions(screen.getByLabelText(/^Thema/), 'Sonstiges');
    await user.type(screen.getByLabelText(/^Betreff/), 'Test');
    await user.type(screen.getByLabelText(/^Nachricht/), 'Eine ausreichend lange Nachricht.');
    await user.click(screen.getByRole('button', { name: 'Nachricht senden' }));
    expect(await screen.findByText('Nachricht angenommen')).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(body.website).toBe('');
    expect(typeof body.startedAt).toBe('number');
  });
});
