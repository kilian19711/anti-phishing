import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { IconAlert, IconMail } from '../components/Icons';
import { Notice, PageHeader } from '../components/ui';
import { LIMITS, TOPICS, validateContact, type FieldErrors } from '../../netlify/lib/contact-core';

export const CONTACT_ENDPOINT = '/.netlify/functions/contact';
type Status = 'idle' | 'sending' | 'sent' | 'error';
type Config = 'unknown' | 'configured' | 'missing';

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', topic: '', subject: '', message: '', website: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [config, setConfig] = useState<Config>('unknown');
  const startedAt = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch(CONTACT_ENDPOINT, { method: 'GET', headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { configured?: boolean } | null) => { if (active) setConfig(d && typeof d.configured === 'boolean' ? (d.configured ? 'configured' : 'missing') : 'unknown'); })
      .catch(() => { if (active) setConfig('unknown'); });
    return () => { active = false; };
  }, []);

  const update = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as keyof FieldErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { errors: errs } = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('error');
      setServerMessage('Bitte prüfen Sie die markierten Felder.');
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setStatus('sending');
    setServerMessage('');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { code?: string; message?: string; errors?: FieldErrors };
      if (res.ok && data.code === 'sent') {
        setStatus('sent');
        setServerMessage(data.message ?? 'Ihre Nachricht wurde angenommen.');
        setValues({ name: '', email: '', topic: '', subject: '', message: '', website: '' });
      } else {
        setStatus('error');
        if (data.errors) setErrors(data.errors);
        if (data.code === 'not_configured') setConfig('missing');
        setServerMessage(data.message ?? (res.status === 404
          ? 'Der Versanddienst ist nicht erreichbar. In der lokalen Entwicklung ohne Netlify gibt es keinen Versand. Ihre Nachricht wurde nicht versendet.'
          : 'Die Nachricht konnte nicht versendet werden. Bitte versuchen Sie es später erneut.'));
      }
    } catch {
      setStatus('error');
      setServerMessage('Keine Verbindung zum Server. Ihre Eingaben bleiben erhalten – bitte versuchen Sie es erneut.');
    }
    setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const fieldProps = (k: keyof FieldErrors) => ({
    id: `kontakt-${k}`,
    'aria-invalid': errors[k] ? (true as const) : undefined,
    'aria-describedby': [`kontakt-${k}-hint`, errors[k] ? `kontakt-${k}-error` : ''].filter(Boolean).join(' '),
  });
  const Err = ({ k }: { k: keyof FieldErrors }) => errors[k] ? <p id={`kontakt-${k}-error`} className="field-error"><IconAlert />{errors[k]}</p> : null;

  return (
    <div className="page-narrow">
      <PageHeader title="Kontakt">
        <p>Fragen, Fehler oder Feedback zu PhishLab? Schreiben Sie dem Projektteam bei L-mobile. Pflichtfelder sind mit <span className="required">*</span> gekennzeichnet.</p>
      </PageHeader>

      {config === 'missing' && (
        <Notice kind="warning" title="E-Mail-Versand noch nicht eingerichtet">
          <p>Auf dieser Installation ist der E-Mail-Versand nicht konfiguriert. Das Formular kann ausgefüllt werden, Nachrichten werden aber <strong>nicht versendet</strong>.</p>
        </Notice>
      )}
      {config === 'unknown' && (
        <Notice kind="info" title="Versandstatus unbekannt">
          <p>Der Versanddienst konnte nicht abgefragt werden (z. B. in der lokalen Entwicklung ohne Netlify). Ob eine Nachricht ankommt, sehen Sie nach dem Absenden.</p>
        </Notice>
      )}

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" style={{ marginTop: 16 }}>
        {status === 'sent' && <Notice kind="success" title="Nachricht angenommen"><p>{serverMessage} Wir melden uns an die angegebene Adresse.</p></Notice>}
        {status === 'error' && (
          <Notice kind="error" title="Nicht versendet">
            <p>{serverMessage}</p>
            {Object.values(errors).some(Boolean) && (
              <ul>{(Object.entries(errors) as [keyof FieldErrors, string | undefined][]).filter(([, v]) => v).map(([k, v]) => <li key={k}><a href={`#kontakt-${k}`}>{v}</a></li>)}</ul>
            )}
          </Notice>
        )}
      </div>

      <form className="card" onSubmit={submit} noValidate style={{ marginTop: 16 }} aria-describedby="datenschutz-kurz">
        <div className="field">
          <label htmlFor="kontakt-name">Name (optional)</label>
          <input type="text" autoComplete="name" maxLength={LIMITS.name} value={values.name} onChange={(e) => update('name', e.target.value)} {...fieldProps('name')} />
          <p id="kontakt-name-hint" className="hint">Nur, wenn Sie persönlich angesprochen werden möchten.</p>
          <Err k="name" />
        </div>
        <div className="field">
          <label htmlFor="kontakt-email">E-Mail-Adresse für die Antwort <span className="required" aria-hidden="true">*</span></label>
          <input type="email" autoComplete="email" required maxLength={LIMITS.email} value={values.email} onChange={(e) => update('email', e.target.value)} {...fieldProps('email')} />
          <p id="kontakt-email-hint" className="hint">Wird nur verwendet, um Ihnen zu antworten.</p>
          <Err k="email" />
        </div>
        <div className="field">
          <label htmlFor="kontakt-topic">Thema <span className="required" aria-hidden="true">*</span></label>
          <select required value={values.topic} onChange={(e) => update('topic', e.target.value)} {...fieldProps('topic')}>
            <option value="">Bitte wählen …</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <p id="kontakt-topic-hint" className="hint">Hilft uns, Ihre Anfrage einzuordnen.</p>
          <Err k="topic" />
        </div>
        <div className="field">
          <label htmlFor="kontakt-subject">Betreff <span className="required" aria-hidden="true">*</span></label>
          <input type="text" required maxLength={LIMITS.subject} value={values.subject} onChange={(e) => update('subject', e.target.value)} {...fieldProps('subject')} />
          <p id="kontakt-subject-hint" className="hint">Höchstens {LIMITS.subject} Zeichen.</p>
          <Err k="subject" />
        </div>
        <div className="field">
          <label htmlFor="kontakt-message">Nachricht <span className="required" aria-hidden="true">*</span></label>
          <textarea required maxLength={LIMITS.message} value={values.message} onChange={(e) => update('message', e.target.value)} {...fieldProps('message')} />
          <p id="kontakt-message-hint" className="hint">
            {LIMITS.minMessage}–{LIMITS.message} Zeichen, aktuell <span className="mono">{values.message.length}</span>.
            Bitte keine Passwörter, Zugangsdaten oder vertraulichen Unternehmensinformationen eintragen.
          </p>
          <Err k="message" />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="kontakt-website">Website (bitte leer lassen)</label>
          <input id="kontakt-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update('website', e.target.value)} />
        </div>

        <div id="datenschutz-kurz" className="notice notice-info" style={{ marginTop: 20 }}>
          <IconMail />
          <div className="small">
            <p><strong>Datenschutz in Kürze:</strong> Ihre Angaben werden erst beim Absenden übertragen – über eine Serverfunktion bei unserem Hoster Netlify an den E-Mail-Dienstleister Resend, der die Nachricht an das Postfach des PhishLab-Projektteams bei L-mobile zustellt. Zweck ist ausschließlich die Beantwortung Ihrer Anfrage.</p>
            <p>PhishLab speichert die Anfrage nicht in einer Datenbank und protokolliert weder Text noch Adresse. Die E-Mail verbleibt im Empfängerpostfach, bis sie nach Erledigung gelöscht wird; beim Dienstleister gelten dessen Aufbewahrungsfristen. <Link to="/datenschutz#kontakt">Ausführliche Datenschutzhinweise</Link></p>
          </div>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'} aria-describedby="datenschutz-kurz">
            {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
          </button>
          {status === 'sending' && <span role="status" className="muted">Nachricht wird übermittelt …</span>}
        </div>
      </form>
    </div>
  );
}
