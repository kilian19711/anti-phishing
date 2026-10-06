import type { Classification, Scenario } from '../types/content';
import type { RoundFilter, RoundMode } from '../lib/quiz';
import type { AnswerRecord, AppState, Confidence, PersistedData } from './types';

export type Action =
  | { type: 'startRound'; mode: RoundMode; filter: RoundFilter; order: string[]; markMode: boolean; now: number }
  | { type: 'answer'; scenarioId: string; chosen: Classification; correct: boolean; confidence?: Confidence; now: number }
  | { type: 'toggleMark'; scenarioId: string; segment: string }
  | { type: 'goTo'; index: number }
  | { type: 'finishRound' }
  | { type: 'abortRound' }
  | { type: 'setPersist'; persist: boolean }
  | { type: 'loadPersisted'; data: PersistedData }
  | { type: 'clearHistory' }
  | { type: 'saveCustomScenario'; scenario: Scenario }
  | { type: 'deleteCustomScenario'; id: string }
  | { type: 'importCustomScenarios'; scenarios: Scenario[] };

export function initialState(storageAvailable: boolean): AppState {
  return { history: [], round: null, lastOrder: [], customScenarios: [], persist: false, storageAvailable };
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'startRound':
      return {
        ...state,
        lastOrder: action.order,
        round: {
          mode: action.mode,
          filter: action.filter,
          order: action.order,
          index: 0,
          answers: {},
          markMode: action.markMode,
          marks: {},
          finished: false,
          startedAt: action.now,
        },
      };
    case 'answer': {
      if (!state.round || state.round.answers[action.scenarioId]) return state;
      const record: AnswerRecord = {
        scenarioId: action.scenarioId,
        chosen: action.chosen,
        correct: action.correct,
        confidence: action.confidence,
        at: action.now,
      };
      return {
        ...state,
        history: [...state.history, record],
        round: { ...state.round, answers: { ...state.round.answers, [action.scenarioId]: record } },
      };
    }
    case 'toggleMark': {
      if (!state.round || state.round.answers[action.scenarioId]) return state;
      const current = state.round.marks[action.scenarioId] ?? [];
      const next = current.includes(action.segment) ? current.filter((s) => s !== action.segment) : [...current, action.segment];
      return { ...state, round: { ...state.round, marks: { ...state.round.marks, [action.scenarioId]: next } } };
    }
    case 'goTo':
      if (!state.round) return state;
      return { ...state, round: { ...state.round, index: Math.max(0, Math.min(action.index, state.round.order.length - 1)) } };
    case 'finishRound':
      return state.round ? { ...state, round: { ...state.round, finished: true } } : state;
    case 'abortRound':
      return { ...state, round: null };
    case 'setPersist':
      return { ...state, persist: action.persist && state.storageAvailable };
    case 'loadPersisted':
      return {
        ...state,
        persist: true,
        history: action.data.history.map((h) => ({ ...h })),
        customScenarios: action.data.customScenarios,
      };
    case 'clearHistory':
      return { ...state, history: [] };
    case 'saveCustomScenario': {
      const exists = state.customScenarios.some((s) => s.id === action.scenario.id);
      return {
        ...state,
        customScenarios: exists
          ? state.customScenarios.map((s) => (s.id === action.scenario.id ? action.scenario : s))
          : [...state.customScenarios, action.scenario],
      };
    }
    case 'deleteCustomScenario':
      return { ...state, customScenarios: state.customScenarios.filter((s) => s.id !== action.id) };
    case 'importCustomScenarios':
      return { ...state, customScenarios: [...state.customScenarios, ...action.scenarios] };
    default:
      return state;
  }
}

export function toPersisted(state: AppState, now = new Date()): PersistedData {
  return {
    version: 1,
    savedAt: now.toISOString(),
    history: state.history.map(({ scenarioId, chosen, correct, at }) => ({ scenarioId, chosen, correct, at })),
    customScenarios: state.customScenarios,
  };
}

export function isPersistedData(value: unknown): value is PersistedData {
  const v = value as PersistedData;
  return Boolean(v && v.version === 1 && Array.isArray(v.history) && Array.isArray(v.customScenarios));
}
