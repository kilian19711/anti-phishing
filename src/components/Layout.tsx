import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconBook, IconChart, IconClose, IconEdit, IconHome, IconLibrary, IconMail, IconMenu, IconTarget, Logo } from './Icons';

const NAV = [
  { to: '/', label: 'Dashboard', icon: IconHome, end: true },
  { to: '/training', label: 'Training', icon: IconTarget },
  { to: '/wissen', label: 'Wissen', icon: IconBook },
  { to: '/szenarien', label: 'Szenarien', icon: IconLibrary },
  { to: '/fortschritt', label: 'Fortschritt', icon: IconChart },
  { to: '/editor', label: 'Szenario-Editor', icon: IconEdit },
  { to: '/kontakt', label: 'Kontakt', icon: IconMail },
];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Bei Seitenwechsel: Menü schließen, nach oben scrollen und Fokus auf den Hauptbereich setzen,
  // damit Screenreader den neuen Inhalt ankündigen.
  useEffect(() => {
    setOpen(false);
    if (firstRender.current) { firstRender.current = false; return; }
    if (location.hash) return;
    window.scrollTo?.(0, 0);
    const h1 = mainRef.current?.querySelector('h1');
    (h1 ?? mainRef.current)?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <header className="topbar">
        <button
          type="button"
          className="btn btn-ghost menu-button"
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconMenu />}
          <span>Menü</span>
        </button>
        <Link to="/" className="wordmark" aria-label="PhishLab – zur Startseite">
          <Logo className="wordmark-mark" />
          <span className="wordmark-text"><span>Phish<span className="accent">Lab</span></span><span className="wordmark-sub">Ausbildungsprojekt bei L-mobile</span></span>
        </Link>
        <span className="topbar-note">Lernportal mit simulierten Nachrichten · keine echten Daten</span>
      </header>
      <div className="shell">
        <nav id="hauptnavigation" className={`sidebar${open ? ' open' : ''}`} aria-label="Hauptnavigation">
          <ul className="nav-list">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className="nav-link">
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="nav-section">Informationen</p>
          <ul className="nav-list">
            <li><NavLink to="/datenschutz" className="nav-link">Datenschutzhinweise</NavLink></li>
            <li><NavLink to="/ueber" className="nav-link">Über das Projekt</NavLink></li>
          </ul>
          <p className="sidebar-foot">
            Beim Neuladen startet alles wieder bei null – nichts wird gespeichert.
          </p>
        </nav>
        <main id="main" ref={mainRef} tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <p style={{ margin: 0 }}>
            PhishLab · Ausbildungsprojekt bei L-mobile – Lern- und Portfolio-Projekt, kein offizielles L-mobile-Produkt.
          </p>
          <nav aria-label="Rechtliches und Informationen">
            <ul>
              <li><Link to="/datenschutz">Datenschutzhinweise</Link></li>
              <li><Link to="/ueber">Über das Projekt</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
}
