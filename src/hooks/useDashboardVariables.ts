/**
 * Use Dashboard Variables
 *
 * Manages Grafana dashboard variables with support for both
 * traditional and Scene-based dashboards.
 *
 * Inlined from @volkovlabs/components to remove the dependency.
 * Based on the same inlined implementation already shipped in
 * grafana/business-calendar.
 */
import { EventBus, TypedVariableModel } from '@grafana/data';
import { getTemplateSrv, RefreshEvent } from '@grafana/runtime';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

export const useDashboardVariables = <TVariable = TypedVariableModel, TState = TVariable[]>({
  eventBus,
  variableName,
  refreshCheckCount = 5,
  refreshCheckInterval = 500,
  getOne,
  toState,
  initial,
}: {
  eventBus: EventBus;
  variableName: string;
  refreshCheckCount?: number;
  refreshCheckInterval?: number;
  initial: TState;
  getOne: (state: TState, variableName: string) => TVariable | undefined;
  toState: (variables: TypedVariableModel[]) => TState;
}): {
  variable: TVariable | undefined;
  getVariable: (variableName: string) => TVariable | undefined;
  variables: TState;
} => {
  const functionsRef = useRef({ getOne, toState });
  functionsRef.current = { getOne, toState };
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [variables, setVariables] = useState<TState>(initial);
  const [variable, setVariable] = useState<TVariable | undefined>();

  /**
   * Scene context for Scene-based dashboards.
   * Note: this calls useState() from the scene context object, not React.useState().
   * The global is either always present or always absent for a given Grafana instance,
   * so the conditional access does not violate the rules of hooks in practice.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneContext = (window as unknown as Record<string, any>).__grafanaSceneContext?.useState();

  const [refreshCount, incrementRefreshCount] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    if (!sceneContext?.$variables?.state.variables || refreshCount >= refreshCheckCount) {
      return;
    }

    const sceneVariables = sceneContext.$variables?.state.variables;
    const isLoading = sceneVariables?.some((v: { state: { loading?: boolean } }) => v?.state.loading);

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (isLoading) {
      timerRef.current = setTimeout(() => {
        incrementRefreshCount();
      }, refreshCheckInterval);
    } else {
      clearTimer();
      setVariables(functionsRef.current.toState(getTemplateSrv().getVariables()));
    }

    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneContext?.$variables?.state.variables, refreshCount]);

  useEffect(() => {
    setVariables(functionsRef.current.toState(getTemplateSrv().getVariables()));

    const subscription = eventBus.getStream(RefreshEvent).subscribe(() => {
      setVariables(functionsRef.current.toState(getTemplateSrv().getVariables()));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [eventBus]);

  const getVariable = useCallback((name: string) => functionsRef.current.getOne(variables, name), [variables]);

  useEffect(() => {
    setVariable(getVariable(variableName));
  }, [getVariable, variableName]);

  return { variable, getVariable, variables };
};
