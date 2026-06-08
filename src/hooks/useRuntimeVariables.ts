import { EventBus } from '@grafana/data';

import { REQUEST_LATENCY_MODE_OPTIONS } from '../constants';
import { RequestLatencyMode, RuntimeVariable } from '../types';
import { getVariablesMap } from '../utils';
import { useDashboardVariables } from './useDashboardVariables';

/**
 * Runtime Variables
 * @param eventBus
 * @param variableName
 */
export const useRuntimeVariables = (eventBus: EventBus, variableName: string, requestLatency?: RequestLatencyMode) => {
  const latencyOptions = requestLatency
    ? REQUEST_LATENCY_MODE_OPTIONS[requestLatency]
    : /**
       * Keep default if requestLatency is not specified
       * Current use only for tree view (useTable hook)
       */
      {
        refreshCheckCount: 5,
        refreshCheckInterval: 500,
      };

  const { variable, getVariable } = useDashboardVariables<RuntimeVariable, Record<string, RuntimeVariable>>({
    eventBus,
    variableName,
    toState: getVariablesMap,
    getOne: (variablesMap, variableName) => variablesMap[variableName],
    initial: {},
    refreshCheckCount: latencyOptions.refreshCheckCount,
    refreshCheckInterval: latencyOptions.refreshCheckInterval,
  });

  return {
    variable,
    getVariable,
  };
};
