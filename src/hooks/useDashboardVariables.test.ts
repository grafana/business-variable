import { EventBusSrv } from '@grafana/data';
import { RefreshEvent } from '@grafana/runtime';
import { act, renderHook } from '@testing-library/react';

import { useDashboardVariables } from './useDashboardVariables';

/**
 * Inlined from @volkovlabs/components useDashboardVariables.test.ts
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/hooks/useDashboardVariables.test.ts).
 */

/**
 * Variable
 */
interface Variable {
  /**
   * Name
   *
   * @type {string}
   */
  name: string;
}

/**
 * Mock @grafana/runtime
 */
const getVariablesMock = jest.fn((): Variable[] => []);

jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
  getTemplateSrv: jest.fn(() => ({
    getVariables: getVariablesMock,
  })),
}));

/**
 * Mock Timers
 */
jest.useFakeTimers();

describe('Use Dashboard Variables', () => {
  /**
   * Event Bus
   */
  const eventBus = new EventBusSrv();

  /**
   * Create Variable
   */
  const createVariable = (item: Partial<Variable>): Variable => ({
    name: '',
    ...item,
  });

  beforeEach(() => {
    /**
     * Mock Variables
     */
    getVariablesMock.mockReset();
    getVariablesMock.mockReturnValue([]);
  });

  it('Should return variable', () => {
    /**
     * Mock Variables
     */
    getVariablesMock.mockReturnValue([createVariable({ name: 'device' })]);

    const { result } = renderHook(() =>
      useDashboardVariables<Variable, Variable[]>({
        eventBus,
        variableName: 'device',
        getOne: (state, variableName) => state.find((item) => item.name === variableName),
        toState: (variables) => variables,
        initial: [],
      })
    );

    expect(result.current.variable).toEqual(
      expect.objectContaining({
        name: 'device',
      })
    );
  });

  it('Should return variable by name', () => {
    /**
     * Mock Variables
     */
    getVariablesMock.mockReturnValue([createVariable({ name: 'device' }), createVariable({ name: 'country' })]);

    const { result } = renderHook(() =>
      useDashboardVariables<Variable, Variable[]>({
        eventBus,
        variableName: 'device',
        getOne: (state, variableName) => state.find((item) => item.name === variableName),
        toState: (variables) => variables,
        initial: [],
      })
    );

    expect(result.current.getVariable('device')).toEqual(
      expect.objectContaining({
        name: 'device',
      })
    );
    expect(result.current.getVariable('country')).toEqual(
      expect.objectContaining({
        name: 'country',
      })
    );
  });

  it('Should update state on refresh event', async () => {
    /**
     * Mock Variables
     */
    getVariablesMock.mockReturnValue([createVariable({ name: 'device' })]);

    const { result } = renderHook(() =>
      useDashboardVariables<Variable, Variable[]>({
        eventBus,
        variableName: 'device',
        getOne: (state, variableName) => state.find((item) => item.name === variableName),
        toState: (variables) => variables,
        initial: [],
      })
    );

    expect(result.current.getVariable('device')).toEqual(
      expect.objectContaining({
        name: 'device',
      })
    );

    /**
     * Mock Variables
     */
    getVariablesMock.mockReturnValue([]);

    /**
     * Publish Refresh
     */
    await act(async () => eventBus.publish(new RefreshEvent()));

    /**
     * Check Updated State
     */
    expect(result.current.getVariable('device')).not.toBeDefined();
  });

  describe('Scene', () => {
    /**
     * Create Use State Result
     * @param variables
     */
    const createUseStateResult = (variables: Array<{ state: { loading: boolean } }>) => ({
      $variables: {
        state: {
          variables,
        },
      },
    });

    const useStateMock = jest.fn(() => createUseStateResult([]));

    beforeEach(() => {
      useStateMock.mockReturnValue(createUseStateResult([]));

      Object.defineProperty(global, '__grafanaSceneContext', {
        writable: true,
        value: {
          useState: useStateMock,
        },
      });
    });

    afterAll(() => {
      Object.defineProperty(global, '__grafanaSceneContext', {
        writable: true,
        value: undefined,
      });
    });

    it('Should update state after all vars loaded', async () => {
      /**
       * Mock Variables
       */
      getVariablesMock.mockReturnValue([]);

      /**
       * Mock Scene Variables
       */
      useStateMock.mockReturnValue(createUseStateResult([{ state: { loading: true } }]));

      const { result } = renderHook(() =>
        useDashboardVariables<Variable, Variable[]>({
          eventBus,
          variableName: 'device',
          getOne: (state, variableName) => state.find((item) => item.name === variableName),
          toState: (variables) => variables,
          initial: [],
          refreshCheckCount: 3,
        })
      );

      expect(result.current.variable).not.toBeDefined();

      /**
       * Mock Variables
       */
      getVariablesMock.mockReturnValue([{ name: 'device' }]);

      /**
       * Run Check Timer
       */
      await act(async () => jest.runOnlyPendingTimersAsync());

      /**
       * Check if state is not updated
       */
      expect(result.current.variable).not.toBeDefined();

      /**
       * Mock Scene Variables
       */
      useStateMock.mockReturnValue(createUseStateResult([{ state: { loading: false } }]));

      /**
       * Run Check Timer
       */
      await act(async () => jest.runOnlyPendingTimersAsync());

      /**
       * Check if state updated
       */
      expect(result.current.variable).toEqual(
        expect.objectContaining({
          name: 'device',
        })
      );
    });

    it('Should stop checking if check count exceeded', async () => {
      /**
       * Mock Variables
       */
      getVariablesMock.mockReturnValue([]);

      /**
       * Mock Scene Variables
       */
      useStateMock.mockReturnValue(createUseStateResult([{ state: { loading: true } }]));

      const { result } = renderHook(() =>
        useDashboardVariables<Variable, Variable[]>({
          eventBus,
          variableName: 'device',
          getOne: (state, variableName) => state.find((item) => item.name === variableName),
          toState: (variables) => variables,
          initial: [],
          refreshCheckCount: 2,
        })
      );

      expect(result.current.variable).not.toBeDefined();

      /**
       * Mock Variables
       */
      getVariablesMock.mockReturnValue([{ name: 'device' }]);

      /**
       * Run Check Timer
       */
      await act(async () => jest.runOnlyPendingTimersAsync());
      await act(async () => jest.runOnlyPendingTimersAsync());
      await act(async () => jest.runOnlyPendingTimersAsync());

      /**
       * Mock Scene Variables
       */
      useStateMock.mockReturnValue(createUseStateResult([{ state: { loading: false } }]));

      /**
       * Run Check Timer
       */
      await act(async () => jest.runOnlyPendingTimersAsync());

      /**
       * Check if state updated
       */
      expect(result.current.variable).not.toBeDefined();
    });
  });
});
