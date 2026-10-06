import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { ARTICLE_IDS, builtInScenarios } from '../lib/content';
import { clearStored, isStorageAvailable, readStored, writeStored } from '../lib/storage';
import { validateScenario } from '../lib/validation';
import type { Scenario } from '../types/content';
import { initialState, isPersistedData, reducer, toPersisted, type Action } from './reducer';
import type { AppState } from './types';

interface AppContextValue {
  state: AppState;
  dispatch: (action: Action) => void;
  pool: Scenario[];
  getScenario: (id: string) => Scenario | undefined;
  enablePersist: () => boolean;
  disablePersistAndDelete: () => void;
  exportData: () => string;
}

const AppContext = createContext<AppContextValue | null>(null);

function init(): AppState {
  const available = isStorageAvailable();
  const base = initialState(available);
  if (!available) return base;
  // Daten existieren nur, wenn Nutzer das Speichern früher ausdrücklich aktiviert haben.
  const stored = readStored<unknown>();
  if (!isPersistedData(stored)) return base;
  const customScenarios = stored.customScenarios.filter((s) => validateScenario(s, ARTICLE_IDS).length === 0);
  return reducer(base, { type: 'loadPersisted', data: { ...stored, customScenarios } });
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    if (state.persist) writeStored(toPersisted(state));
  }, [state]);

  const pool = useMemo(() => [...builtInScenarios, ...state.customScenarios], [state.customScenarios]);
  const scenarioMap = useMemo(() => new Map(pool.map((s) => [s.id, s])), [pool]);
  const getScenario = useCallback((id: string) => scenarioMap.get(id), [scenarioMap]);

  const enablePersist = useCallback(() => {
    if (!state.storageAvailable) return false;
    dispatch({ type: 'setPersist', persist: true });
    return writeStored(toPersisted(state));
  }, [state]);

  const disablePersistAndDelete = useCallback(() => {
    clearStored();
    dispatch({ type: 'setPersist', persist: false });
  }, []);

  const exportData = useCallback(() => JSON.stringify(toPersisted(state), null, 2), [state]);

  const value = useMemo(
    () => ({ state, dispatch, pool, getScenario, enablePersist, disablePersistAndDelete, exportData }),
    [state, pool, getScenario, enablePersist, disablePersistAndDelete, exportData],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp muss innerhalb von AppStateProvider verwendet werden.');
  return ctx;
}
