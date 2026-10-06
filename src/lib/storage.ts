/**
 * PhishLab speichert nichts dauerhaft im Browser.
 * Diese Funktion entfernt lediglich Daten, die eine frühere Version optional angelegt haben könnte.
 */
export const STORAGE_KEY = 'phishlab:v1';

export function clearStored(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Speicher nicht verfügbar – nichts zu tun */
  }
}
