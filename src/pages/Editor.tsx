import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { IconAlert, IconDownload, IconTrash, IconUpload } from '../components/Icons';
import { MailView } from '../components/MailView';
import { Notice, PageHeader } from '../components/ui';
import { articles, ARTICLE_IDS, builtInScenarios } from '../lib/content';
import { parseScenarioImport, validateScenario, type FieldError } from '../lib/validation';
import { useApp } from '../state/AppState';
import { MESSAGE_TYPES, TOPICS, type Hint, type Scenario } from '../types/content';
import { downloadText } from './Progress';

interface Draft {
  id: string; title: string; topic: string; difficulty: string; channel: string; messageType: string;
  senderName: string; senderAddress: string; subject: string; receivedAt: string; body: string;
  linkLabel: string; linkTarget: string; attachmentName: string; attachmentSize: string;
  classification: string; learningGoal: string; hints: Hint[]; explanation: string; counterArguments: string;
  safeAction: string; afterMistake: string; articleIds: string[];
}

const EMPTY: Draft = {
  id: '', title: '', topic: 'paket', difficulty: 'mittel', channel: 'email', messageType: 'benachrichtigung',
  senderName: '', senderAddress: '', subject: '', receivedAt: 'Mo, 09:00', body: '',
  linkLabel: '', linkTarget: '', attachmentName: '', attachmentSize: '',
  classification: 'phishing', learningGoal: '', hints: [{ location: 'sender', signal: 'warnung', text: '' }],
  explanation: '', counterArguments: '', safeAction: '', afterMistake: '', articleIds: [],
};

function toScenario(d: Draft): Scenario {
  return {
    id: d.id.trim(), title: d.title.trim(), topic: d.topic as Scenario['topic'], difficulty: d.difficulty as Scenario['difficulty'],
    channel: d.channel as Scenario['channel'], messageType: d.messageType as Scenario['messageType'],
    sender: { name: d.senderName.trim(), address: d.senderAddress.trim() }, subject: d.subject.trim(), receivedAt: d.receivedAt.trim(),
    body: d.body.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean),
    ...(d.linkLabel || d.linkTarget ? { link: { label: d.linkLabel.trim(), target: d.linkTarget.trim() } } : {}),
    ...(d.attachmentName || d.attachmentSize ? { attachment: { name: d.attachmentName.trim(), size: d.attachmentSize.trim() } } : {}),
    classification: d.classification as Scenario['classification'], learningGoal: d.learningGoal.trim(),
    hints: d.hints.map((h) => ({ ...h, text: h.text.trim(), ...(h.location === 'body' ? { excerpt: (h.excerpt ?? '').trim() } : { excerpt: undefined }) })).map((h) => { if (!h.excerpt) delete h.excerpt; return h; }),
    explanation: d.explanation.trim(), counterArguments: d.counterArguments.trim(), safeAction: d.safeAction.trim(),
    afterMistake: d.afterMistake.trim(), articleIds: d.articleIds,
  };
}

function fromScenario(s: Scenario): Draft {
  return {
    id: s.id, title: s.title, topic: s.topic, difficulty: s.difficulty, channel: s.channel, messageType: s.messageType,
    senderName: s.sender.name, senderAddress: s.sender.address, subject: s.subject, receivedAt: s.receivedAt, body: s.body.join('\n\n'),
    linkLabel: s.link?.label ?? '', linkTarget: s.link?.target ?? '', attachmentName: s.attachment?.name ?? '', attachmentSize: s.attachment?.size ?? '',
    classification: s.classification, learningGoal: s.learningGoal, hints: s.hints.map((h) => ({ ...h })), explanation: s.explanation,
    counterArguments: s.counterArguments, safeAction: s.safeAction, afterMistake: s.afterMistake, articleIds: [...s.articleIds],
  };
}

const FIELD_FOR: Record<string, string> = { 'sender.name': 'senderName', 'sender.address': 'senderAddress', 'link.label': 'linkLabel', 'link.target': 'linkTarget', 'attachment.name': 'attachmentName', 'attachment.size': 'attachmentSize' };

export default function Editor() {
  const { state, dispatch } = useApp();
  const [params] = useSearchParams();
  const editId = params.get('id');
  const existing = editId ? state.customScenarios.find((s) => s.id === editId) : undefined;
  const [draft, setDraft] = useState<Draft>(existing ? fromScenario(existing) : EMPTY);
  const [editing, setEditing] = useState<string | null>(existing?.id ?? null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string; list?: string[] } | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scenario = useMemo(() => toScenario(draft), [draft]);
  const previewOk = scenario.body.length > 0 && scenario.sender.name;

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const errFor = (field: string) => errors.filter((e) => (FIELD_FOR[e.field] ?? e.field) === field);
  const takenIds = [...builtInScenarios.map((s) => s.id), ...state.customScenarios.filter((s) => s.id !== editing).map((s) => s.id)];

  const save = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateScenario(scenario, ARTICLE_IDS);
    if (takenIds.includes(scenario.id)) errs.push({ field: 'id', message: `Die ID „${scenario.id}“ ist bereits vergeben.` });
    setErrors(errs);
    if (errs.length) {
      setMessage({ kind: 'error', text: `Das Szenario enthält ${errs.length} Fehler. Bitte korrigieren Sie die markierten Felder.` });
    } else {
      if (editing && editing !== scenario.id) dispatch({ type: 'deleteCustomScenario', id: editing });
      dispatch({ type: 'saveCustomScenario', scenario });
      setEditing(scenario.id);
      setMessage({ kind: 'success', text: `Szenario „${scenario.title}“ gespeichert. Es erscheint jetzt in der Bibliothek und im Training (nur in dieser Sitzung).` });
    }
    setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const onImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 1_000_000) { setMessage({ kind: 'error', text: 'Die Datei ist größer als 1 MB.' }); return; }
    const text = await file.text();
    const res = parseScenarioImport(text, ARTICLE_IDS, [...builtInScenarios.map((s) => s.id), ...state.customScenarios.map((s) => s.id)]);
    if (res.scenarios.length) dispatch({ type: 'importCustomScenarios', scenarios: res.scenarios });
    setMessage({
      kind: res.errors.length ? 'error' : 'success',
      text: `${res.scenarios.length} Szenario(s) importiert${res.errors.length ? `, ${res.errors.length} Problem(e) gefunden:` : '.'}`,
      list: res.errors.slice(0, 20),
    });
    setTimeout(() => summaryRef.current?.focus(), 0);
  };

  const input = (k: keyof Draft, label: string, opts: { required?: boolean; hint?: string; textarea?: boolean; max?: number } = {}) => {
    const id = `ed-${k}`;
    const errs = errFor(k);
    const describedBy = [opts.hint ? `${id}-hint` : '', errs.length ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined;
    const common = { id, value: draft[k] as string, 'aria-invalid': errs.length ? (true as const) : undefined, 'aria-describedby': describedBy, maxLength: opts.max };
    return (
      <div className="field">
        <label htmlFor={id}>{label}{opts.required && <span className="required" aria-hidden="true"> *</span>}</label>
        {opts.textarea ? <textarea {...common} onChange={(e) => set(k, e.target.value as never)} /> : <input type="text" {...common} onChange={(e) => set(k, e.target.value as never)} />}
        {opts.hint && <p id={`${id}-hint`} className="hint">{opts.hint}</p>}
        {errs.length > 0 && <div id={`${id}-err`}>{errs.map((er, i) => <p key={i} className="field-error"><IconAlert />{er.message}</p>)}</div>}
      </div>
    );
  };
  const select = (k: keyof Draft, label: string, options: [string, string][]) => (
    <div className="field">
      <label htmlFor={`ed-${k}`}>{label}</label>
      <select id={`ed-${k}`} value={draft[k] as string} onChange={(e) => set(k, e.target.value as never)}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
  const hintErrors = errFor('hints');

  return (
    <div className="page">
      <PageHeader title="Szenario-Editor">
        <p>Erstellen und bearbeiten Sie eigene, <strong>synthetische</strong> Übungsfälle. Verwenden Sie nur erfundene Namen und <code>.example</code>-Adressen.</p>
      </PageHeader>
      <Notice kind="warning" title="Lokale Demo-Funktion">
        <p>Der Editor hat kein Backend und keine Benutzerverwaltung. Eigene Szenarien liegen nur in Ihrem Browser (nur bis zum Neuladen oder Schließen der Seite – sichern Sie sie bei Bedarf über „Eigene Szenarien exportieren“) und sind für niemanden sonst sichtbar.</p>
      </Notice>

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" style={{ marginTop: 16 }}>
        {message && (
          <Notice kind={message.kind}>
            <p>{message.text}</p>
            {message.list && message.list.length > 0 && <ul>{message.list.map((m, i) => <li key={i}>{m}</li>)}</ul>}
            {message.kind === 'error' && errors.length > 0 && <ul>{errors.map((e, i) => <li key={i}><a href={`#ed-${FIELD_FOR[e.field] ?? e.field}`}>{e.message}</a></li>)}</ul>}
          </Notice>
        )}
      </div>

      <section className="card" style={{ marginTop: 16 }} aria-labelledby="eigene">
        <h2 id="eigene" style={{ marginTop: 0 }}>Eigene Szenarien ({state.customScenarios.length})</h2>
        {state.customScenarios.length === 0 ? <p className="muted">Noch keine eigenen Szenarien. Legen Sie unten eines an oder importieren Sie eine JSON-Datei.</p> : (
          <ul>
            {state.customScenarios.map((s) => (
              <li key={s.id} className="row">
                <Link to={`/szenarien/${s.id}`}>{s.title}</Link> <span className="mono small muted">{s.id}</span>
                <button type="button" className="btn btn-small" onClick={() => { setDraft(fromScenario(s)); setEditing(s.id); setErrors([]); setMessage(null); }}>Bearbeiten<span className="visually-hidden">: {s.title}</span></button>
                <button type="button" className="btn btn-small btn-danger" onClick={() => { dispatch({ type: 'deleteCustomScenario', id: s.id }); if (editing === s.id) { setEditing(null); setDraft(EMPTY); } setMessage({ kind: 'success', text: `„${s.title}“ gelöscht.` }); }}><IconTrash />Löschen<span className="visually-hidden">: {s.title}</span></button>
              </li>
            ))}
          </ul>
        )}
        <div className="row">
          <button type="button" className="btn" onClick={() => { setDraft(EMPTY); setEditing(null); setErrors([]); setMessage(null); }}>Neues Szenario</button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}><IconUpload />JSON importieren</button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="visually-hidden" aria-label="JSON-Datei zum Importieren wählen" onChange={onImport} tabIndex={-1} />
          <button type="button" className="btn" disabled={state.customScenarios.length === 0} onClick={() => downloadText('phishlab-szenarien.json', JSON.stringify(state.customScenarios, null, 2))}><IconDownload />Eigene Szenarien exportieren</button>
          <button type="button" className="btn btn-ghost" onClick={() => downloadText('phishlab-beispielszenario.json', JSON.stringify([{ ...builtInScenarios[0], id: 'eigen-beispiel' }], null, 2))}>Beispieldatei herunterladen</button>
        </div>
      </section>

      <div className="editor-layout" style={{ marginTop: 16 }}>
        <form className="card stack" onSubmit={save} noValidate aria-labelledby="formtitel">
          <h2 id="formtitel" style={{ marginTop: 0 }}>{editing ? `Szenario bearbeiten: ${editing}` : 'Neues Szenario'}</h2>
          <p className="small muted">Pflichtfelder sind mit <span className="required">*</span> gekennzeichnet.</p>
          {input('id', 'ID', { required: true, hint: 'Eindeutig, nur Kleinbuchstaben, Ziffern und Bindestriche, z. B. eigen-rechnung-01.', max: 40 })}
          {input('title', 'Titel', { required: true, max: 120 })}
          <div className="filters">
            {select('topic', 'Thema', Object.entries(TOPICS))}
            {select('difficulty', 'Schwierigkeit', [['leicht', 'Leicht'], ['mittel', 'Mittel'], ['schwer', 'Schwer']])}
            {select('channel', 'Kanal', [['email', 'E-Mail'], ['sms', 'SMS'], ['messenger', 'Messenger']])}
            {select('messageType', 'Nachrichtentyp', Object.entries(MESSAGE_TYPES))}
          </div>
          {input('senderName', 'Absendername', { required: true, max: 120 })}
          {input('senderAddress', 'Absenderadresse', { required: true, hint: 'Bei E-Mails nur erfundene Adressen mit .example, z. B. service@firma.example. Bei SMS z. B. „Absenderkennung „Info““.', max: 160 })}
          {input('subject', 'Betreff', { hint: 'Bei E-Mails Pflicht, bei SMS/Messenger leer lassen.', max: 200 })}
          {input('receivedAt', 'Zeitpunkt', { required: true, hint: 'Z. B. „Mo, 08:14“.', max: 40 })}
          {input('body', 'Nachricht', { required: true, textarea: true, hint: 'Jede Zeile wird ein Absatz.', max: 6000 })}
          <fieldset>
            <legend>Simulierter Link (optional)</legend>
            {input('linkLabel', 'Linktext', { max: 200 })}
            {input('linkTarget', 'Linkziel', { hint: 'Nur .example-Domains, z. B. https://portal.example/login. Wird nie aufgerufen.', max: 300 })}
          </fieldset>
          <fieldset>
            <legend>Simulierter Anhang (optional)</legend>
            {input('attachmentName', 'Dateiname', { max: 120 })}
            {input('attachmentSize', 'Größe', { hint: 'Z. B. „84 KB“.', max: 20 })}
          </fieldset>
          <fieldset>
            <legend>Typ <span className="required" aria-hidden="true">*</span></legend>
            <label className="choice"><input type="radio" name="klass" checked={draft.classification === 'phishing'} onChange={() => set('classification', 'phishing')} />Phishing</label>
            <label className="choice"><input type="radio" name="klass" checked={draft.classification === 'legitim'} onChange={() => set('classification', 'legitim')} />Legitim</label>
          </fieldset>
          {input('learningGoal', 'Lernziel', { required: true, max: 400 })}
          <fieldset aria-describedby={hintErrors.length ? 'ed-hints-err' : undefined}>
            <legend id="ed-hints">Hinweise <span className="required" aria-hidden="true">*</span></legend>
            {draft.hints.map((h, i) => (
              <div key={i} className="hint-row" role="group" aria-label={`Hinweis ${i + 1}`}>
                <div className="field"><label htmlFor={`h-loc-${i}`}>Fundstelle</label>
                  <select id={`h-loc-${i}`} value={h.location} onChange={(e) => set('hints', draft.hints.map((x, j) => j === i ? { ...x, location: e.target.value as Hint['location'] } : x))}>
                    <option value="sender">Absender</option><option value="subject">Betreff</option><option value="body">Nachrichtentext</option><option value="link">Link</option><option value="attachment">Anhang</option>
                  </select></div>
                <div className="field"><label htmlFor={`h-sig-${i}`}>Einordnung</label>
                  <select id={`h-sig-${i}`} value={h.signal} onChange={(e) => set('hints', draft.hints.map((x, j) => j === i ? { ...x, signal: e.target.value as Hint['signal'] } : x))}>
                    <option value="warnung">Warnsignal</option><option value="vertrauen">Spricht für Echtheit</option><option value="neutral">Allein kein Beweis</option>
                  </select></div>
                {h.location === 'body' && (
                  <div className="field" style={{ gridColumn: '1 / -1' }}><label htmlFor={`h-ex-${i}`}>Wörtlicher Ausschnitt aus dem Text</label>
                    <input id={`h-ex-${i}`} type="text" value={h.excerpt ?? ''} onChange={(e) => set('hints', draft.hints.map((x, j) => j === i ? { ...x, excerpt: e.target.value } : x))} /></div>
                )}
                <div className="field" style={{ gridColumn: '1 / -1' }}><label htmlFor={`h-txt-${i}`}>Erklärung</label>
                  <input id={`h-txt-${i}`} type="text" value={h.text} onChange={(e) => set('hints', draft.hints.map((x, j) => j === i ? { ...x, text: e.target.value } : x))} /></div>
                <div><button type="button" className="btn btn-small btn-ghost" disabled={draft.hints.length === 1} onClick={() => set('hints', draft.hints.filter((_, j) => j !== i))}>Hinweis {i + 1} entfernen</button></div>
              </div>
            ))}
            <button type="button" className="btn btn-small" style={{ marginTop: 10 }} onClick={() => set('hints', [...draft.hints, { location: 'body', signal: 'warnung', text: '', excerpt: '' }])}>Hinweis hinzufügen</button>
            {hintErrors.length > 0 && <div id="ed-hints-err">{hintErrors.map((er, i) => <p key={i} className="field-error"><IconAlert />{er.message}</p>)}</div>}
          </fieldset>
          {input('explanation', 'Erklärung der richtigen Einordnung', { required: true, textarea: true })}
          {input('counterArguments', 'Warum die andere Einordnung nicht zutrifft', { required: true, textarea: true })}
          {input('safeAction', 'Empfohlene Handlung', { required: true, textarea: true })}
          {input('afterMistake', 'Verhalten nach einem Fehlklick', { required: true, textarea: true })}
          <fieldset aria-describedby={errFor('articleIds').length ? 'ed-articleIds-err' : undefined}>
            <legend id="ed-articleIds">Verknüpfte Artikel <span className="required" aria-hidden="true">*</span></legend>
            {articles.map((a) => (
              <label key={a.id} className="choice small">
                <input type="checkbox" checked={draft.articleIds.includes(a.id)} onChange={(e) => set('articleIds', e.target.checked ? [...draft.articleIds, a.id] : draft.articleIds.filter((x) => x !== a.id))} />
                {a.title}
              </label>
            ))}
            {errFor('articleIds').length > 0 && <div id="ed-articleIds-err">{errFor('articleIds').map((er, i) => <p key={i} className="field-error"><IconAlert />{er.message}</p>)}</div>}
          </fieldset>
          <div className="row">
            <button type="submit" className="btn btn-primary">Szenario speichern</button>
          </div>
        </form>
        <aside className="editor-preview stack" aria-labelledby="vorschau">
          <h2 id="vorschau" style={{ marginTop: 0 }}>Live-Vorschau</h2>
          {previewOk ? <MailView scenario={scenario} headingLevel={3} answered /> : <p className="card muted">Die Vorschau erscheint, sobald Absendername und Nachricht ausgefüllt sind.</p>}
        </aside>
      </div>
    </div>
  );
}
