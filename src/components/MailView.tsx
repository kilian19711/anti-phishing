import { useState, type ReactNode } from 'react';
import { allSegments, bodySegments, hintsForSegment, hostname, registeredDomain, type Segment } from '../lib/marking';
import type { Scenario } from '../types/content';
import { IconAlert, IconFlask, IconPaperclip, IconShield } from './Icons';
import { SimDialog } from './SimDialog';

interface Props {
  scenario: Scenario;
  /** Markier-Modus aktiv (vor der Antwort) */
  markMode?: boolean;
  marks?: string[];
  onToggleMark?: (segmentId: string) => void;
  /** Nach der Antwort: Markierungen farblich auswerten */
  revealMarks?: boolean;
  /** Lösung bekannt – Simulationen dürfen die Einordnung verraten */
  answered?: boolean;
  headingLevel?: 2 | 3;
}

const CHANNEL_LABEL = { email: 'Simulierte E-Mail', sms: 'Simulierte SMS', messenger: 'Simulierte Messenger-Nachricht' } as const;
const BRANDED_TYPES = new Set(['benachrichtigung', 'rechnung', 'sicherheit', 'freigabe']);
const INTERNAL_DOMAIN = 'nordwerk.example';

function initials(name: string): string {
  const clean = name.replace(/\(.*?\)|\|.*$/g, '').trim();
  const parts = clean.split(/\s+/).filter((p) => /[\p{L}]/u.test(p));
  return ((parts[0]?.[0] ?? '?') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

function hue(text: string): number {
  let h = 0;
  for (const c of text) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}

function brandName(s: Scenario): string {
  return s.sender.name.split('|').pop()!.replace(/\(.*?\)/g, '').trim();
}

export function MailView({ scenario, markMode = false, marks = [], onToggleMark, revealMarks = false, answered = false, headingLevel = 2 }: Props) {
  const [dialog, setDialog] = useState<'link' | 'attachment' | null>(null);
  const [hoverUrl, setHoverUrl] = useState<string | null>(null);
  const segIndex = new Map(allSegments(scenario).map((s) => [s.id, s]));
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const isEmail = scenario.channel === 'email';
  const domain = scenario.sender.address.split('@')[1] ?? '';
  const branded = isEmail && domain !== INTERNAL_DOMAIN && BRANDED_TYPES.has(scenario.messageType);
  const avatarHue = hue(scenario.sender.address);

  const resultClass = (seg?: Segment) => {
    if (!seg || !revealMarks || !marks.includes(seg.id)) return '';
    const hs = hintsForSegment(scenario, seg);
    if (hs.some((h) => h.signal === 'warnung')) return 'marked-result-warnung';
    if (hs.some((h) => h.signal === 'vertrauen')) return 'marked-result-vertrauen';
    return 'marked-result-neutral';
  };

  const renderSeg = (id: string, children: ReactNode, label?: string) => {
    const seg = segIndex.get(id);
    if (!seg) return children;
    if (markMode && onToggleMark) {
      return (
        <button type="button" className="markable" aria-pressed={marks.includes(id)} aria-label={label ? `${label} markieren` : undefined} onClick={() => onToggleMark(id)}>
          {children}
        </button>
      );
    }
    const cls = resultClass(seg);
    return cls ? <mark className={cls}>{children}</mark> : children;
  };

  const link = scenario.link;
  const linkEl = link && (
    markMode ? (
      renderSeg('link', <span className="mail-cta" role="presentation">{link.label}</span>, 'Link')
    ) : (
      <a
        href={link.target}
        className={`mail-cta ${resultClass(segIndex.get('link'))}`}
        title={link.target}
        onClick={(e) => { e.preventDefault(); setDialog('link'); }}
        onMouseEnter={() => setHoverUrl(link.target)}
        onMouseLeave={() => setHoverUrl(null)}
        onFocus={() => setHoverUrl(link.target)}
        onBlur={() => setHoverUrl(null)}
        rel="nofollow noopener noreferrer"
      >
        {link.label}
        <span className="visually-hidden"> (simulierter Link – öffnet nur eine Simulation in PhishLab, Ziel: {link.target})</span>
      </a>
    )
  );

  const attachment = scenario.attachment;
  const ext = attachment?.name.split('.').pop()?.toLowerCase() ?? '';

  return (
    <article className={`mailclient ${scenario.channel}`} aria-label={`${CHANNEL_LABEL[scenario.channel]}: ${scenario.title}`}>
      <div className="mail-banner">
        <IconFlask />
        <span>{CHANNEL_LABEL[scenario.channel]} · Lernübung – alle Absender und Adressen sind erfunden</span>
      </div>

      {isEmail ? (
        <div className="mc-frame">
          <div className="mc-toolbar" aria-hidden="true">
            <span className="mc-app">Posteingang</span>
            <span className="mc-search">Suchen</span>
          </div>
          <div className="mc-reading">
            <Heading className="mc-subject">{renderSeg('subject', scenario.subject, 'Betreff')}</Heading>
            <div className="mc-sender">
              <span className="mc-avatar" aria-hidden="true" style={{ background: `hsl(${avatarHue} 55% 32%)` }}>{initials(scenario.sender.name)}</span>
              <div className="mc-sender-text">
                {renderSeg(
                  'sender',
                  <>
                    <span className="mc-name">{scenario.sender.name}</span>{' '}
                    <span className="mc-address">&lt;{scenario.sender.address}&gt;</span>
                  </>,
                  'Absender',
                )}
                <span className="mc-to">An: Sie</span>
              </div>
              <time className="mc-time">{scenario.receivedAt}</time>
            </div>

            {attachment && (
              <div className="mc-attachments">
                {markMode ? (
                  renderSeg('attachment', <span className="mc-attachment" role="presentation"><span className={`mc-fileicon ext-${ext}`} aria-hidden="true">{ext.slice(0, 4)}</span><span><span className="mc-filename">{attachment.name}</span><span className="mc-filesize">{attachment.size}</span></span></span>, 'Anhang')
                ) : (
                  <button type="button" className={`mc-attachment ${resultClass(segIndex.get('attachment'))}`} onClick={() => setDialog('attachment')}>
                    <span className={`mc-fileicon ext-${ext}`} aria-hidden="true">{ext.slice(0, 4)}</span>
                    <span>
                      <span className="mc-filename">{attachment.name}</span>
                      <span className="mc-filesize">{attachment.size}</span>
                    </span>
                    <span className="visually-hidden"> (simulierter Anhang – wird nicht geöffnet)</span>
                    <IconPaperclip className="mc-clip" />
                  </button>
                )}
              </div>
            )}

            <div className={`mc-body${branded ? ' branded' : ''}`}>
              {branded && (
                <div className="mc-brand" aria-hidden="true" style={{ ['--brand-h' as string]: avatarHue }}>
                  <span className="mc-brand-logo">{initials(brandName(scenario))}</span>
                  <span>{brandName(scenario)}</span>
                </div>
              )}
              <div className="mc-content">
                {bodySegments(scenario).map((sentences, pi) => (
                  <p key={pi}>
                    {sentences.map((s, si) => (
                      <span key={s.id}>{si > 0 && ' '}{renderSeg(s.id, s.text)}</span>
                    ))}
                  </p>
                ))}
                {linkEl && <p className="mc-cta-row">{linkEl}</p>}
              </div>
            </div>
          </div>
          <div className="mc-status" aria-hidden="true">{hoverUrl ? hoverUrl : ' '}</div>
        </div>
      ) : (
        <div className="phone">
          <div className="phone-head">
            <span className="mc-avatar small" aria-hidden="true" style={{ background: `hsl(${avatarHue} 50% 30%)` }}>{initials(scenario.sender.name)}</span>
            <div>
              <Heading className="phone-title">{renderSeg('sender', <>{scenario.sender.name}<span className="phone-sub">{scenario.sender.address}</span></>, 'Absender')}</Heading>
            </div>
          </div>
          <div className="phone-thread">
            <p className="phone-time">{scenario.receivedAt}</p>
            {bodySegments(scenario).map((sentences, pi) => (
              <p key={pi} className="bubble">
                {sentences.map((s, si) => <span key={s.id}>{si > 0 && ' '}{renderSeg(s.id, s.text)}</span>)}
                {pi === scenario.body.length - 1 && linkEl && <> {linkEl}</>}
              </p>
            ))}
          </div>
          {hoverUrl && <div className="mc-status" aria-hidden="true">{hoverUrl}</div>}
        </div>
      )}

      {link && (
        <SimDialog open={dialog === 'link'} onClose={() => setDialog(null)} title={answered ? (scenario.classification === 'phishing' ? 'Hier wäre es gefährlich geworden' : 'Diese Seite wäre echt gewesen') : 'Sie haben auf den Link geklickt'} url={link.target} highlight={registeredDomain(link.target)}>
          <p>Dieser Link führt nirgendwohin – PhishLab öffnet niemals externe Seiten. In einer echten Nachricht wäre jetzt diese Adresse geladen worden:</p>
          <p className="mono sim-url">{link.target}</p>
          <p>Hostname: <span className="mono">{hostname(link.target)}</span> · Registrierte Domain (von rechts gelesen): <strong className="mono">{registeredDomain(link.target)}</strong></p>
          {answered ? (
            scenario.classification === 'phishing' ? (
              <div className="notice notice-error"><IconAlert /><div><p>Auf dieser Seite hätten Angreifer typischerweise Zugangs- oder Zahlungsdaten abgefragt oder eine Datei angeboten.</p><p>{scenario.afterMistake}</p></div></div>
            ) : (
              <div className="notice notice-success"><IconShield /><div><p>Die Domain gehört zum erwarteten Dienst. Noch sicherer ist trotzdem der Weg über ein eigenes Lesezeichen oder die offizielle App.</p></div></div>
            )
          ) : (
            <p><strong>Prüfen Sie:</strong> Gehört diese Domain zum angeblichen Absender? In echten Mails sehen Sie das Ziel vor dem Klick per Mauszeiger (unten in der Statusleiste) oder durch langes Drücken.</p>
          )}
        </SimDialog>
      )}
      {attachment && (
        <SimDialog open={dialog === 'attachment'} onClose={() => setDialog(null)} title={`Anhang „${attachment.name}“`}>
          <p>Anhänge werden in PhishLab nie geöffnet oder heruntergeladen.</p>
          <p>Dateiendung: <strong className="mono">.{ext}</strong> – entscheidend ist immer die <em>letzte</em> Endung. Größe: <span className="mono">{attachment.size}</span>.</p>
          <p>Fragen Sie sich: Erwarte ich diese Datei? Passt der Dateityp zum Inhalt? Werde ich nach dem Öffnen zu einer Anmeldung oder zum Aktivieren von Makros aufgefordert?</p>
        </SimDialog>
      )}
    </article>
  );
}
