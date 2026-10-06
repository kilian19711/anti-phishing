import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Classification, Difficulty, HintSignal } from '../types/content';
import { IconAlert, IconCheckCircle, IconInfo, IconMinus, IconShield, IconXCircle } from './Icons';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · PhishLab`;
  }, [title]);
}

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  usePageTitle(title);
  return (
    <header className="page-header">
      <h1 tabIndex={-1}>{title}</h1>
      {children}
    </header>
  );
}

export function ClassificationBadge({ value }: { value: Classification }) {
  return value === 'phishing' ? (
    <span className="badge badge-phishing"><IconAlert />Phishing</span>
  ) : (
    <span className="badge badge-legitim"><IconShield />Legitim</span>
  );
}

const DIFF_LABEL: Record<Difficulty, string> = { leicht: 'Leicht', mittel: 'Mittel', schwer: 'Schwer' };
export function DifficultyBadge({ value }: { value: Difficulty }) {
  return <span className="badge">Schwierigkeit: {DIFF_LABEL[value]}</span>;
}

export const SIGNAL_LABEL: Record<HintSignal, string> = {
  warnung: 'Warnsignal',
  vertrauen: 'Spricht für Echtheit',
  neutral: 'Allein kein Beweis',
};
export function SignalBadge({ value }: { value: HintSignal }) {
  if (value === 'warnung') return <span className="badge badge-phishing"><IconAlert />{SIGNAL_LABEL.warnung}</span>;
  if (value === 'vertrauen') return <span className="badge badge-legitim"><IconCheckCircle />{SIGNAL_LABEL.vertrauen}</span>;
  return <span className="badge"><IconMinus />{SIGNAL_LABEL.neutral}</span>;
}

type NoticeKind = 'info' | 'success' | 'error' | 'warning';
export function Notice({ kind = 'info', title, children, role }: { kind?: NoticeKind; title?: string; children: ReactNode; role?: 'status' | 'alert' }) {
  const Icon = kind === 'success' ? IconCheckCircle : kind === 'error' ? IconXCircle : kind === 'warning' ? IconAlert : IconInfo;
  return (
    <div className={`notice notice-${kind}`} role={role}>
      <Icon />
      <div>
        {title && <p style={{ fontWeight: 650, marginBottom: 4 }}>{title}</p>}
        {children}
      </div>
    </div>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value} von ${max}`}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
      <ol>
        {items.map((item, i) => (
          <li key={i}>
            {item.to && i < items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });
}
