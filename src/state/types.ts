import type { Classification, Scenario } from '../types/content';
import type { RoundFilter, RoundMode } from '../lib/quiz';

export type Confidence = 'unsicher' | 'eher-sicher' | 'sicher';

export interface AnswerRecord {
  scenarioId: string;
  chosen: Classification;
  correct: boolean;
  confidence?: Confidence;
  at: number;
}

export interface RoundState {
  mode: RoundMode;
  filter: RoundFilter;
  order: string[];
  index: number;
  answers: Record<string, AnswerRecord>;
  markMode: boolean;
  /** Im Modus „Hinweise markieren“ gewählte Stellen je Szenario */
  marks: Record<string, string[]>;
  finished: boolean;
  startedAt: number;
}

export interface AppState {
  history: AnswerRecord[];
  round: RoundState | null;
  lastOrder: string[];
  customScenarios: Scenario[];
}

