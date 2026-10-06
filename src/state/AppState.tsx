import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { builtInScenarios } from '../lib/content';
import { clearStored } from '../lib/storage';
import type { Scenario } from '../types/content';
import { initialState, reducer, type Action } from './reducer';
import type { AppState } from './types';

interface AppContextValue {
  state: AppState;
  dispatch: (action: Action) => void;
  pool: Scenario[];
  getScenario: (id: string) => Scenario | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

/**
 * Der gesamte Zustand liegt nur im Arbeitsspeicher.
 * Beim Neuladen der Seite beginnt jede Person wieder bei null – nichts wird im Browser gespeichert.
 */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  // Entfernt Daten einer früheren Version, die optional im Browser gespeichert werden konnten.
  useEffect(() => { clearStored(); }, []);

  const pool = useMemo(() => [...builtInScenarios, ...state.customScenarios], [state.customScenarios]);
  const scenarioMap = useMemo(() => new Map(pool.map((s) => [s.id, s])), [pool]);
  const getScenario = useCallback((id: string) => scenarioMap.get(id), [scenarioMap]);

  const value = useMemo(() => ({ state, dispatch, pool, getScenario }), [state, pool, getScenario]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp muss innerhalb von AppStateProvider verwendet werden.');
  return ctx;
}
