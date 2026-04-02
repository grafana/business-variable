import { DateTime, dateTime, EventBus } from '@grafana/data';
import { DateTimePicker } from '@grafana/ui';
import React, { useCallback } from 'react';

import { TEST_IDS } from '../../constants';
import { usePersistentStorage } from '../../hooks';
import { MinimizeOutputFormat, TextBoxVariable } from '../../types';
import { selectVariableValues } from '../../utils';

/**
 * Properties
 */
interface Props {
  /**
   * Variable
   *
   * @type {TextBoxVariable}
   */
  variable: TextBoxVariable;

  /**
   * Persistent
   *
   * @type {boolean}
   */
  persistent: boolean;

  /**
   * Panel Event Bus
   *
   * @type {EventBus}
   */
  panelEventBus: EventBus;

  /**
   * Time Zone
   *
   * @type {string}
   */
  timeZone: string;

  /**
   * Is Transform to UTC or use local
   *
   * @type {boolean}
   */
  isUseLocalTime: boolean;

  /**
   * Text box Variable display mode
   *
   * @type {MinimizeOutputFormat}
   */
  minimizeOutputFormat: MinimizeOutputFormat;
}

/**
 * Date Time selector
 * @param props
 */
export const DateTimeSelector: React.FC<Props> = ({
  variable,
  persistent,
  panelEventBus,
  isUseLocalTime,
  timeZone,
  minimizeOutputFormat,
}) => {
  /**
   * Persistent storage
   */
  const persistentStorage = usePersistentStorage(variable.name);

  const currentValue = variable.current.value;
  let value: string | number = '';
  if (currentValue) {
    value = !isNaN(Number(currentValue)) ? Number(currentValue) : currentValue.toString();
  }

  /**
   * On Change
   */
  const onChange = useCallback(
    (dateTime?: DateTime) => {
      /**
       * Clear saved values on override by user
       */
      if (dateTime) {
        if (persistent) {
          persistentStorage.remove();
        }

        let value = '';
        if (minimizeOutputFormat === MinimizeOutputFormat.DATETIME) {
          value = dateTime.toISOString(isUseLocalTime);
        } else {
          value = dateTime.valueOf().toString();
        }
        selectVariableValues({ values: [value], runtimeVariable: variable, panelEventBus });
      }
    },
    [isUseLocalTime, minimizeOutputFormat, panelEventBus, persistent, persistentStorage, variable]
  );

  return (
    <DateTimePicker
      onChange={onChange}
      timeZone={timeZone}
      date={dateTime(value)}
      data-testid={TEST_IDS.dateTimePicker.root}
    />
  );
};
