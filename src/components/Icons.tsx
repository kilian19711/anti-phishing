import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (props: P) => ({
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false, ...props,
});

export const IconHome = (p: P) => <svg {...base(p)}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>;
export const IconTarget = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
export const IconBook = (p: P) => <svg {...base(p)}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19V5" /></svg>;
export const IconLibrary = (p: P) => <svg {...base(p)}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const IconChart = (p: P) => <svg {...base(p)}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
export const IconEdit = (p: P) => <svg {...base(p)}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M14 6l4 4" /></svg>;
export const IconMail = (p: P) => <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const IconShield = (p: P) => <svg {...base(p)}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></svg>;
export const IconInfo = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg>;
export const IconCheck = (p: P) => <svg {...base(p)}><path d="M5 12l5 5 9-10" /></svg>;
export const IconCheckCircle = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>;
export const IconXCircle = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>;
export const IconAlert = (p: P) => <svg {...base(p)}><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18v.5" /></svg>;
export const IconMinus = (p: P) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></svg>;
export const IconMenu = (p: P) => <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const IconClose = (p: P) => <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const IconLink = (p: P) => <svg {...base(p)}><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" /></svg>;
export const IconPaperclip = (p: P) => <svg {...base(p)}><path d="M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L15 7" /></svg>;
export const IconArrowRight = (p: P) => <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const IconArrowLeft = (p: P) => <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const IconDownload = (p: P) => <svg {...base(p)}><path d="M12 4v11M7 10l5 5 5-5M4 20h16" /></svg>;
export const IconUpload = (p: P) => <svg {...base(p)}><path d="M12 20V9M7 14l5-5 5 5M4 4h16" /></svg>;
export const IconTrash = (p: P) => <svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>;
export const IconLock = (p: P) => <svg {...base(p)}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>;
export const IconPhone = (p: P) => <svg {...base(p)}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
export const IconFlask = (p: P) => <svg {...base(p)}><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" /></svg>;

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#1a1e2a" stroke="#353c50" />
      <path d="M7 10h18v12H7z" fill="none" stroke="#2aa9e0" strokeWidth="2" />
      <path d="M7 10l9 7 9-7" fill="none" stroke="#2aa9e0" strokeWidth="2" />
      <circle cx="24" cy="22" r="5" fill="#2aa9e0" />
      <path d="M21.8 22l1.6 1.6 2.8-3" fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
