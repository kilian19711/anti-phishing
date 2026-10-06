import { describe, expect, it, vi } from 'vitest';
import { createResendProvider, handleContact, sanitizeLine, type MailProvider } from '../lib/contact-core';

const config = { recipient: 'team@empfaenger.example', from: 'kontakt@phishlab.example', apiKey: 'test-key' };
const NOW = 1_000_000;
const valid = {
  name: 'Alex Beispiel',
  email: 'alex@beispiel.example',
  topic: 'Feedback zu Inhalten',
  subject: 'Tolles Projekt',
  message: 'Ich habe eine Frage zu Artikel 3.',
  website: '',
  startedAt: NOW - 10_000,
};
const post = (body: unknown, deps: Partial<Parameters<typeof handleContact>[2]> = {}) =>
  handleContact('POST', JSON.stringify(body), { config, now: () => NOW, ...deps });

function mockProvider(result: Awaited<ReturnType<MailProvider['send']>>) {
  const send = vi.fn().mockResolvedValue(result);
  return { send, factory: () => ({ name: 'Mock', send }) as MailProvider };
}

describe('Kontakt-Function', () => {
  it('meldet Erfolg erst nach Bestätigung durch den Provider (Mock)', async () => {
    const p = mockProvider({ ok: true, id: 'abc' });
    const res = await post(valid, { createProvider: p.factory });
    expect(res.status).toBe(200);
    expect(res.body.code).toBe('sent');
    const mail = p.send.mock.calls[0][0];
    expect(mail.to).toBe(config.recipient);
    expect(mail.replyTo).toBe(valid.email);
    expect(mail.text).toContain(valid.message);
  });

  it('lehnt ungültige Eingaben mit Feldfehlern ab', async () => {
    const p = mockProvider({ ok: true, id: 'x' });
    const res = await post({ ...valid, email: 'keine-adresse', message: 'kurz', topic: 'Hack' }, { createProvider: p.factory });
    expect(res.status).toBe(422);
    expect(Object.keys(res.body.errors as object)).toEqual(expect.arrayContaining(['email', 'message', 'topic']));
    expect(p.send).not.toHaveBeenCalled();
  });

  it('begrenzt Eingabelängen', async () => {
    const res = await post({ ...valid, message: 'x'.repeat(5001), subject: 'y'.repeat(151) });
    expect(res.status).toBe(422);
    expect(Object.keys(res.body.errors as object)).toEqual(expect.arrayContaining(['message', 'subject']));
  });

  it('verwirft Anfragen mit ausgefülltem Honeypot', async () => {
    const p = mockProvider({ ok: true, id: 'x' });
    const res = await post({ ...valid, website: 'https://spam.example' }, { createProvider: p.factory });
    expect(res.body.code).toBe('spam');
    expect(p.send).not.toHaveBeenCalled();
  });

  it('verwirft zu schnell abgeschickte Formulare', async () => {
    const res = await post({ ...valid, startedAt: NOW - 500 });
    expect(res.body.code).toBe('spam');
  });

  it('täuscht bei fehlender Konfiguration keinen Erfolg vor', async () => {
    const res = await handleContact('POST', JSON.stringify(valid), { config: { recipient: '', from: '', apiKey: '' }, now: () => NOW });
    expect(res.status).toBe(503);
    expect(res.body.code).toBe('not_configured');
    const status = await handleContact('GET', null, { config: {} });
    expect(status.body).toEqual({ configured: false });
  });

  it('meldet Providerfehler', async () => {
    const p = mockProvider({ ok: false, reason: 'provider_status_500' });
    const res = await post(valid, { createProvider: p.factory });
    expect(res.status).toBe(502);
    expect(res.body.code).toBe('provider_error');
  });

  it('verhindert Header-Injection in einzeiligen Feldern', async () => {
    const p = mockProvider({ ok: true, id: 'x' });
    await post({ ...valid, subject: 'Hallo\r\nBcc: opfer@x.example', name: 'A\nB' }, { createProvider: p.factory });
    const mail = p.send.mock.calls[0][0];
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(sanitizeLine('a\r\nb')).toBe('a b');
  });

  it('protokolliert keine Inhalte oder Adressen', async () => {
    const log = vi.fn();
    const p = mockProvider({ ok: false, reason: 'provider_status_500' });
    await post(valid, { createProvider: p.factory, log });
    await post({ ...valid, email: 'kaputt' }, { log });
    const logged = log.mock.calls.flat().join(' ');
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.message);
    expect(logged).not.toContain(valid.name);
  });

  it('lehnt andere HTTP-Methoden und kaputtes JSON ab', async () => {
    expect((await handleContact('PUT', null, { config })).status).toBe(405);
    expect((await handleContact('POST', '{x', { config })).status).toBe(400);
  });
});

describe('Resend-Provider', () => {
  it('sendet korrekt aufgebaute Anfrage und wertet die ID aus (ohne echte E-Mail)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'msg_1' }), { status: 200 }));
    const provider = createResendProvider('key123', fetchMock as unknown as typeof fetch);
    const r = await provider.send({ from: 'a@x.example', to: 'b@x.example', replyTo: 'c@x.example', subject: 'S', text: 'T' });
    expect(r).toEqual({ ok: true, id: 'msg_1' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer key123');
    expect(JSON.parse(init.body)).toMatchObject({ to: ['b@x.example'], reply_to: 'c@x.example', text: 'T' });
  });

  it('wertet HTTP-Fehler und Netzwerkfehler als Fehlschlag', async () => {
    const bad = createResendProvider('k', vi.fn().mockResolvedValue(new Response('{}', { status: 422 })) as unknown as typeof fetch);
    expect(await bad.send({ from: '', to: '', replyTo: '', subject: '', text: '' })).toEqual({ ok: false, reason: 'provider_status_422' });
    const down = createResendProvider('k', vi.fn().mockRejectedValue(new Error('x')) as unknown as typeof fetch);
    expect((await down.send({ from: '', to: '', replyTo: '', subject: '', text: '' })).ok).toBe(false);
  });
});
