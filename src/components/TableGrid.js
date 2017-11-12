import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  LocalSorting,
  PagingState,
  LocalPaging,
  FilteringState,
  LocalFiltering,
  EditingState,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';
import CommandTemplate from '../helpers/CommandTemplates';
import TextField from 'material-ui/TextField';
const TableGrid = ({ rows, columns, commitChanges }) => {
  return (
    <Grid rows={rows} columns={columns} getRowId={row => row.id}>
      <FilteringState defaultFilters={[]} />
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <SortingState />
      <EditingState onCommitChanges={commitChanges} />
      <LocalFiltering />
      <LocalPaging />
      <LocalSorting />
      <TableView />
      <TableHeaderRow allowSorting />
      <TableFilterRow />
      <TableEditRow />
      <TableEditColumn
        allowAdding
        allowEditing
        allowDeleting
        commandTemplate={({ executeCommand, id }) => {
          const template = CommandTemplate[id];
          if (template) {
            const onClick = (e) => {
              executeCommand();
              e.stopPropagation();
            };
            return template(onClick, );
          }
          return undefined;
        }} />
      <PagingPanel />
      <DataTypeProvider
        type="date"
        editorTemplate={({ onValueChange }) => (
          <TextField
            id="date"
            label="data created"
            type="date"
            onChange={e => onValueChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <DataTypeProvider
        type="number"
        editorTemplate={({ onValueChange }) => (
          <TextField
            id="date"
            label="spending"
            type="number"
            onChange={e => onValueChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Grid>
  );
};
TableGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  commitChanges: PropTypes.func.isRequired
};
export default TableGrid;
