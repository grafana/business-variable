import React from 'react';

const actual = jest.requireActual('@volkovlabs/components');

/**
 * Mock DatasourcePayloadEditor
 */
const DatasourcePayloadEditorMock = ({ onChange, ...restProps }: any) => {
  return (
    <>
      <input
        data-testid="data-testid query-editor"
        value={restProps.value}
        onChange={(event) => {
          if (onChange) {
            onChange(event.target.value);
          }
        }}
      />
      <span data-testid="data-testid datasourceUID-key">{restProps.datasourceUid}</span>
    </>
  );
};

const DatasourcePayloadEditor = jest.fn(DatasourcePayloadEditorMock);

/**
 * Mock useDatasourceRequest hook
 */
const useDatasourceRequest = jest.fn();

/**
 * Set mocks
 */
beforeEach(() => {
  DatasourcePayloadEditor.mockImplementation(DatasourcePayloadEditorMock);
});

module.exports = {
  ...actual,
  DatasourcePayloadEditor,
  useDatasourceRequest,
};
