import { useId, useState } from 'react';
import { allSegments, bodySegments, hintsForSegment, hostname, registeredDomain, type Segment } from '../lib/marking';
import type { Scenario } from '../types/content';
import { IconFlask, IconLink, IconPaperclip } from './Icons';

interface Props {
  scenario: Scenario;
  /** Markier-Modus aktiv (vor der Antwort) */
  markMode?: boolean;
  marks?: string[];
  onToggleMark?: (segmentId: string) => void;
  /** Nach der Antwort: Markierungen farblich auswerten */
  revealMarks?: boolean;
  headingLevel?: 2 | 3;
}

const CHANNEL_LABEL = { email: 'Simulierte E-Mail', sms: 'Simulierte SMS', messenger: 'Simulierte Messenger-Nachricht' } as const;

export function MailView({ scenario, markMode = false, marks = [], onToggleMark, revealMarks = false, headingLevel = 2 }: Props) {
  const [showLink, setShowLink] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const linkInfoId = useId();
  const attInfoId = useId();
  const segIndex = new Map(allSegments(scenario).map((s) => [s.id, s]));
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const isEmail = scenario.channel === 'email';

  const resultClass = (seg: Segment) => {
    if (!revealMarks || !marks.includes(seg.id)) return '';
    const hs = hintsForSegment(scenario, seg);
    if (hs.some((h) => h.signal === 'warnung')) return ' marked-result-warnung';
    if (hs.some((h) => h.signal === 'vertrauen')) return ' marked-result-vertrauen';
    return ' marked-result-neutral';
  };

  const renderSeg = (id: string, children: React.ReactNode, label?: string) => {
    const seg = segIndex.get(id);
    if (!seg) return children;
    if (markMode && onToggleMark) {
      return (
        <button
          type="button"
          className="markable"
          aria-pressed={marks.includes(id)}
          aria-label={label ? `${label} markieren` : undefined}
          onClick={() => onToggleMark(id)}
        >
          {children}
        </button>
      );
    }
    const cls = resultClass(seg);
    return cls ? <mark className={cls.trim()}>{children}</mark> : children;
  };

  return (
    <article className={`mail ${scenario.channel}`} aria-label={`${CHANNEL_LABEL[scenario.channel]}: ${scenario.title}`}>
      <div className="mail-banner">
        <IconFlask />
        <span>{CHANNEL_LABEL[scenario.channel]} · Lernübung – alle Absender und Adressen sind erfunden</span>
      </div>
      <div className="mail-head">
        {isEmail && <Heading className="mail-subject">{renderSeg('subject', scenario.subject, 'Betreff')}</Heading>}
        {!isEmail && <Heading className="mail-subject">{scenario.channel === 'sms' ? 'SMS' : 'Chat-Nachricht'}</Heading>}
        <dl className="mail-meta">
          <dt>Von</dt>
          <dd>
            {renderSeg(
              'sender',
              <>
                <strong>{scenario.sender.name}</strong>{' '}
                <span className="mail-address">{isEmail ? `<${scenario.sender.address}>` : `· ${scenario.sender.address}`}</span>
              </>,
              'Absender',
            )}
          </dd>
          <dt>Zeit</dt>
          <dd className="mail-time">{scenario.receivedAt}</dd>
        </dl>
      </div>
      <div className="mail-body">
        {bodySegments(scenario).map((sentences, pi) => {
          const content = sentences.map((s, si) => (
            <span key={s.id}>
              {si > 0 && ' '}
              {renderSeg(s.id, s.text)}
            </span>
          ));
          return isEmail ? <p key={pi}>{content}</p> : <p key={pi} className="bubble">{content}</p>;
        })}
      </div>
      {(scenario.link || scenario.attachment) && (
        <div className="mail-extra">
          {scenario.link && (
            <div>
              {markMode ? (
                renderSeg('link', <span className="sim-link" role="presentation"><IconLink />{scenario.link.label}</span>, 'Link')
              ) : (
                <button
                  type="button"
                  className={`sim-link${resultClass(segIndex.get('link')!)}`}
                  aria-expanded={showLink}
                  aria-controls={linkInfoId}
                  onClick={() => setShowLink((v) => !v)}
                >
                  <IconLink />
                  <span>{scenario.link.label}</span>
                  <span className="visually-hidden"> (simulierter Link – öffnet nur eine Erklärung)</span>
                </button>
              )}
              {showLink && !markMode && (
                <div id={linkInfoId} className="sim-explain" role="status">
                  <p><strong>Simulation:</strong> Dieser Link führt nirgendwohin. In einer echten Nachricht würde er hierhin zeigen:</p>
                  <p className="mono">{scenario.link.target}</p>
                  <p>
                    Hostname: <span className="mono">{hostname(scenario.link.target)}</span> · Registrierte Domain (von rechts gelesen):{' '}
                    <strong className="mono">{registeredDomain(scenario.link.target)}</strong>
                  </p>
                  <p>Tipp: Prüfen Sie, ob diese Domain zum angeblichen Absender passt. In echten Nachrichten sehen Sie das Ziel per Mauszeiger oder langem Drücken – ohne zu klicken.</p>
                </div>
              )}
            </div>
          )}
          {scenario.attachment && (
            <div>
              {markMode ? (
                renderSeg('attachment', <span className="sim-attachment" role="presentation"><IconPaperclip />{scenario.attachment.name} ({scenario.attachment.size})</span>, 'Anhang')
              ) : (
                <button
                  type="button"
                  className={`sim-attachment${resultClass(segIndex.get('attachment')!)}`}
                  aria-expanded={showAttachment}
                  aria-controls={attInfoId}
                  onClick={() => setShowAttachment((v) => !v)}
                >
                  <IconPaperclip />
                  <span><span className="mono">{scenario.attachment.name}</span> · {scenario.attachment.size}</span>
                  <span className="visually-hidden"> (simulierter Anhang – wird nicht geöffnet)</span>
                </button>
              )}
              {showAttachment && !markMode && (
                <div id={attInfoId} className="sim-explain" role="status">
                  <p><strong>Simulation:</strong> Anhänge werden in PhishLab nie geöffnet oder heruntergeladen.</p>
                  <p>Dateiendung: <strong className="mono">.{scenario.attachment.name.split('.').pop()}</strong> – entscheidend ist immer die letzte Endung.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
