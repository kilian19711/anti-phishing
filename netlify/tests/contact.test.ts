import { afterEach, describe, expect, it, vi } from 'vitest';
import handler from '../functions/contact';

afterEach(() => vi.unstubAllEnvs());

describe('contact-Function (Einstiegspunkt)', () => {
  it('meldet fehlende Konfiguration per GET und POST', async () => {
    vi.stubEnv('CONTACT_RECIPIENT_EMAIL', '');
    vi.stubEnv('CONTACT_FROM_EMAIL', '');
    vi.stubEnv('RESEND_API_KEY', '');
    const get = await handler(new Request('http://x/.netlify/functions/contact'));
    expect(await get.json()).toEqual({ configured: false });
    const body = { email: 'a@b.example', topic: 'Sonstiges', subject: 'S', message: 'Lange genug Nachricht', startedAt: Date.now() - 10_000 };
    const post = await handler(new Request('http://x/', { method: 'POST', body: JSON.stringify(body) }));
    expect(post.status).toBe(503);
    expect(post.headers.get('Cache-Control')).toBe('no-store');
  });
});
