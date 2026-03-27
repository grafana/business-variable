import { EventBus, InterpolateFunction } from '@grafana/data';
import { useEffect, useMemo } from 'react';

import { VARIABLE_REGEX } from '../constants';
import { useRuntimeVariables } from './useRuntimeVariables';

/**
 * useChangeTabTitle hook
 */
export const useChangeTabTitle = ({
  eventBus,
  replaceVariables,
  browserTabNamePattern,
}: {
  eventBus: EventBus;
  replaceVariables: InterpolateFunction;
  browserTabNamePattern: string;
}) => {
  /**
   * Derive variable name from pattern
   * Use variable instead subscribe to refresh event to make process seamless for scenes and non-scenes variables
   */
  const currentVariable = useMemo(() => {
    if (!browserTabNamePattern) {
      return '';
    }

    const matches = [...browserTabNamePattern.matchAll(VARIABLE_REGEX)]
      .map((match) => {
        /**
         * Return name inside ${}
         */
        return match[1];
      })
      /**
       * Remove dashboard variables
       */
      .filter((variable) => !variable.startsWith('__'));

    return matches[0] || '';
  }, [browserTabNamePattern]);

  /**
   * Dashboard variable
   */
  const { variable } = useRuntimeVariables(eventBus, currentVariable);

  /**
   * Update tab name on variable change event
   */
  useEffect(() => {
    if (variable) {
      document.title = replaceVariables(browserTabNamePattern).replace(/[{}]/g, '');
    }
  }, [browserTabNamePattern, replaceVariables, variable]);
};
