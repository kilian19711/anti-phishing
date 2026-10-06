/**
 * Kapselt localStorage mit Fallback.
 * Wird ausschließlich genutzt, wenn Nutzer das dauerhafte Speichern ausdrücklich aktiviert haben.
 */
export const STORAGE_KEY = 'phishlab:v1';

export function isStorageAvailable(): boolean {
  try {
    const k = '__phishlab_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function readStored<T>(): T | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeStored(value: unknown): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearStored(): boolean {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
