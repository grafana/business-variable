import { getDataSourceSrv } from '@grafana/runtime';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { DatasourceEditor } from './DatasourceEditor';

/**
 * Inlined from @volkovlabs/components DatasourceEditor.test.tsx
 * (https://github.com/grafana/volkov-packages/blob/main/packages/components/src/components/DatasourceEditor/DatasourceEditor.test.tsx).
 *
 * Upstream mocks the package-internal `useDatasources` hook directly.
 * The inlined `DatasourceEditor` keeps that hook private, so this port
 * drives it via the underlying `@grafana/runtime` `getDataSourceSrv()`
 * mock instead. Behaviour observed (the `onChange` contract) is
 * identical.
 *
 * The repo-wide `@grafana/ui` Select mock in src/__mocks__ only
 * forwards `aria-label` (not `data-testid`), so this port locates the
 * rendered `<select>` via its role/value rather than via the local
 * jest-selectors.
 */

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getDataSourceSrv: jest.fn(),
}));

describe('Select Datasource Editor', () => {
  const onChange = jest.fn();

  /**
   * Get Tested Component
   */
  const getComponent = ({ value = null, ...restProps }: any) => {
    return <DatasourceEditor onChange={onChange} {...restProps} value={value} />;
  };

  beforeEach(() => {
    onChange.mockClear();
  });

  it('Should update value', async () => {
    jest.mocked(getDataSourceSrv).mockReturnValue({
      getList: jest.fn(() => [
        { name: '123', uid: 'ds1' },
        { name: 'abc', uid: 'ds2' },
      ]),
    } as any);

    await act(async () => {
      render(getComponent({}));
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ds1' } });

    expect(onChange).toHaveBeenCalledWith('ds1');
  });
});
