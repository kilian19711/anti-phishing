import { useEffect, useRef, type ReactNode } from 'react';
import { IconClose, IconLock } from './Icons';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Adresszeile des simulierten Browsers (optional) */
  url?: string;
  highlight?: string;
  children: ReactNode;
}

/** Modaler Dialog mit nativer <dialog>-Semantik (Fokusfalle, Escape) und Fallback für ältere Umgebungen. */
export function SimDialog({ open, onClose, title, url, highlight, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    } else if (!open && d.open) {
      if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
    }
  }, [open]);

  const parts = url && highlight && url.includes(highlight) ? url.split(highlight) : null;

  return (
    <dialog
      ref={ref}
      className="sim-dialog"
      aria-labelledby="sim-dialog-title"
      onClose={onClose}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
    >
      {open && (
        <div className="sim-window">
          <div className="sim-chrome">
            <span className="sim-dots" aria-hidden="true"><i /><i /><i /></span>
            {url ? (
              <div className="sim-address" aria-label={`Adresszeile: ${url}`}>
                <IconLock />
                <span className="mono">
                  {parts ? <>{parts[0]}<strong>{highlight}</strong>{parts.slice(1).join(highlight)}</> : url}
                </span>
              </div>
            ) : <span className="sim-address-placeholder">Dateivorschau</span>}
            <button type="button" className="sim-close" onClick={onClose} aria-label="Simulation schließen">
              <IconClose />
            </button>
          </div>
          <div className="sim-page">
            <p className="sim-tag">Simulation · in PhishLab, es wurde nichts geöffnet</p>
            <h2 id="sim-dialog-title">{title}</h2>
            {children}
            <div className="row" style={{ marginTop: 20 }}>
              <button type="button" className="btn btn-primary" onClick={onClose}>Zurück zur Nachricht</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
