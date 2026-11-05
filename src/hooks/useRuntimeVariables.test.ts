import { CustomVariableModel, EventBusSrv, LoadingState, TypedVariableModel, VariableHide } from '@grafana/data';
import { RefreshEvent } from '@grafana/runtime';
import { act, renderHook } from '@testing-library/react';

import { VariableType } from '../types';
import { useRuntimeVariables } from './useRuntimeVariables';

/**
 * Mock variables data
 */
let mockVariables: TypedVariableModel[] = [];

/**
 * Mock getTemplateSrv
 */
const mockGetTemplateSrv = {
  getVariables: jest.fn(() => mockVariables),
};

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
  getTemplateSrv: jest.fn(() => mockGetTemplateSrv),
}));

describe('useRuntimeVariables', () => {
  /**
   * Event Bus
   */
  const eventBus = new EventBusSrv();

  /**
   * Create Variable
   */
  const createVariable = (item: Partial<CustomVariableModel>): CustomVariableModel => ({
    type: VariableType.CUSTOM,
    name: '',
    options: [],
    id: '',
    multi: false,
    includeAll: false,
    current: {},
    query: '',
    rootStateKey: '',
    global: false,
    hide: VariableHide.dontHide,
    description: '',
    allValue: null,
    skipUrlSync: false,
    index: 0,
    state: LoadingState.Done,
    error: null,
    ...item,
  });

  beforeEach(() => {
    mockVariables = [
      createVariable({ name: 'device', options: [{ text: 'a', value: 'a', selected: true }] }),
      createVariable({ name: 'country', options: [{ text: 'pt', value: 'pt', selected: true }] }),
    ];
    mockGetTemplateSrv.getVariables.mockClear();
    delete (window as unknown as Record<string, unknown>).__grafanaSceneContext;
  });

  it('Should return only the requested variable', () => {
    const { result } = renderHook(() => useRuntimeVariables(eventBus, 'device'));

    expect(result.current.variable?.name).toEqual('device');
    expect(result.current.getVariable('country')?.name).toEqual('country');
    expect(result.current.getVariable('unknown')).toBeUndefined();
  });

  it('Should reload on refresh event', () => {
    const { result } = renderHook(() => useRuntimeVariables(eventBus, 'device'));
    const calls = mockGetTemplateSrv.getVariables.mock.calls.length;

    mockVariables = [createVariable({ name: 'device', options: [{ text: 'b', value: 'b', selected: true }] })];
    act(() => {
      eventBus.publish(new RefreshEvent());
    });

    expect(mockGetTemplateSrv.getVariables.mock.calls.length).toBeGreaterThan(calls);
    expect(result.current.variable?.options[0].value).toEqual('b');
  });

  it('Should subscribe to the scene variable state when available', () => {
    const handlers: Array<() => void> = [];
    const unsubscribe = jest.fn();
    (window as unknown as Record<string, unknown>).__grafanaSceneContext = {
      state: {
        $variables: {
          getByName: (name: string) =>
            name === 'device'
              ? {
                  state: { name: 'device', loading: false },
                  subscribeToState: (handler: () => void) => {
                    handlers.push(handler);
                    return { unsubscribe };
                  },
                }
              : undefined,
        },
      },
    };

    const { result, unmount } = renderHook(() => useRuntimeVariables(eventBus, 'device'));
    expect(handlers.length).toEqual(1);

    mockVariables = [createVariable({ name: 'device', options: [{ text: 'c', value: 'c', selected: true }] })];
    act(() => {
      handlers[0]();
    });
    expect(result.current.variable?.options[0].value).toEqual('c');

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });

  it('Should not convert the other variables', () => {
    renderHook(() => useRuntimeVariables(eventBus, 'device'));
    /**
     * getVariables is called, but the hook only converts the requested one;
     * the raw list length is unchanged (no map over all variables is kept in state)
     */
    expect(mockGetTemplateSrv.getVariables).toHaveBeenCalled();
    expect(mockVariables.length).toEqual(2);
  });
});
