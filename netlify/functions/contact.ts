import { handleContact } from './lib/contact-core';

/**
 * Netlify Function: POST /.netlify/functions/contact
 * Konfiguration ausschließlich über Umgebungsvariablen (siehe .env.example).
 */
export default async (req: Request): Promise<Response> => {
  const result = await handleContact(req.method, req.method === 'POST' ? await req.text() : null, {
    config: {
      recipient: process.env.CONTACT_RECIPIENT_EMAIL,
      from: process.env.CONTACT_FROM_EMAIL,
      apiKey: process.env.RESEND_API_KEY,
    },
    // Nur anonyme Ereigniscodes – niemals Inhalte oder Adressen.
    log: (event) => console.info(`[contact] ${event}`),
  });
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
};
