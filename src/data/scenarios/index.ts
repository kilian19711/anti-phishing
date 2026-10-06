import type { Scenario } from '../../types/content';
import { scenariosPart1 } from './part1';
import { scenariosPart2 } from './part2';
import { scenariosPart3 } from './part3';
import { scenariosPart4 } from './part4';
import { scenariosPart5 } from './part5';
import { scenariosPart6 } from './part6';
import { scenariosPart7 } from './part7';
import { scenariosPart8 } from './part8';

export const builtInScenarios: Scenario[] = [
  ...scenariosPart1, ...scenariosPart2, ...scenariosPart3, ...scenariosPart4,
  ...scenariosPart5, ...scenariosPart6, ...scenariosPart7, ...scenariosPart8,
];
