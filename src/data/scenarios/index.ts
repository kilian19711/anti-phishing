import type { Scenario } from '../../types/content';
import { scenariosPart1 } from './part1';
import { scenariosPart2 } from './part2';
import { scenariosPart3 } from './part3';
import { scenariosPart4 } from './part4';

export const builtInScenarios: Scenario[] = [...scenariosPart1, ...scenariosPart2, ...scenariosPart3, ...scenariosPart4];
