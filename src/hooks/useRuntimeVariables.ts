import { EventBus, TypedVariableModel } from '@grafana/data';
import { getTemplateSrv, RefreshEvent } from '@grafana/runtime';
import { useCallback, useEffect, useRef, useState } from 'react';

import { REQUEST_LATENCY_MODE_OPTIONS } from '../constants';
import { RequestLatencyMode, RuntimeVariable } from '../types';
import { getRuntimeVariable } from '../utils';

/**
 * Minimal view of a Scenes variable object (duck-typed, no @grafana/scenes import)
 */
interface SceneVariableLike {
  state: { name: string; loading?: boolean };
  subscribeToState: (handler: (newState: unknown, prevState: unknown) => void) => { unsubscribe: () => void };
}

/**
 * Find the Scenes variable object by name, if the dashboard runs on Scenes
 */
const findSceneVariable = (variableName: string): SceneVariableLike | undefined => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const root = (window as unknown as { __grafanaSceneContext?: { state?: { $variables?: unknown } } })
    .__grafanaSceneContext;
  const set = root?.state?.$variables as
    | { getByName?: (name: string) => SceneVariableLike | undefined; state?: { variables?: SceneVariableLike[] } }
    | undefined;
  if (!set) {
    return undefined;
  }
  if (typeof set.getByName === 'function') {
    return set.getByName(variableName) ?? undefined;
  }
  return set.state?.variables?.find((item) => item?.state?.name === variableName);
};

/**
 * Find one dashboard variable by name and convert only that one.
 * Converting the whole list on every event is what made dashboards with hundreds of variables unusable.
 */
const findRuntimeVariable = (
  variables: TypedVariableModel[],
  variableName: string
): RuntimeVariable | undefined => {
  const model = variables.find((item) => item.name === variableName);
  return model ? getRuntimeVariable(model) : undefined;
};

/**
 * Runtime Variables
 * @param eventBus
 * @param variableName
 * @param requestLatency
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

  const [variable, setVariable] = useState<RuntimeVariable>();

  /**
   * Cache of the raw variable list, refreshed on each reload and reused by getVariable()
   */
  const listRef = useRef<TypedVariableModel[]>([]);

  const reload = useCallback(() => {
    listRef.current = getTemplateSrv().getVariables();
    setVariable(findRuntimeVariable(listRef.current, variableName));
  }, [variableName]);

  /**
   * Load on mount, on dashboard refresh and whenever this variable (only this one) changes
   */
  useEffect(() => {
    reload();

    const refreshSubscriber = eventBus.getStream(RefreshEvent).subscribe(() => {
      reload();
    });

    const sceneVariable = findSceneVariable(variableName);
    const sceneSubscriber = sceneVariable?.subscribeToState(() => {
      reload();
    });

    /**
     * Non-scene dashboards: variable may still be loading, re-check a few times
     */
    let checks = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const check = () => {
      if (sceneVariable || checks >= latencyOptions.refreshCheckCount) {
        return;
      }
      checks += 1;
      timer = setTimeout(() => {
        reload();
        check();
      }, latencyOptions.refreshCheckInterval);
    };
    check();

    return () => {
      refreshSubscriber.unsubscribe();
      sceneSubscriber?.unsubscribe();
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [eventBus, variableName, reload, latencyOptions.refreshCheckCount, latencyOptions.refreshCheckInterval]);

  /**
   * Any other variable by name (tree view levels), from the cached list
   */
  const getVariable = useCallback((name: string) => {
    if (!listRef.current.length) {
      listRef.current = getTemplateSrv().getVariables();
    }
    return findRuntimeVariable(listRef.current, name);
  }, []);

  return {
    variable,
    getVariable,
  };
};
