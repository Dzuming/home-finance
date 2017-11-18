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
const TableGrid = ({ rows, columns, sorting, commitChanges, editCellTemplate, filterCellTemplate }) => {
  return (
    <Grid rows={rows} columns={columns} getRowId={row => row.id}>
      <FilteringState defaultFilters={[]} />
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <SortingState sorting={sorting} />
      <EditingState onCommitChanges={commitChanges} />
      <LocalFiltering />
      <LocalPaging />
      <LocalSorting />
      <TableView />
      <TableHeaderRow allowSorting />
      <TableFilterRow filterCellTemplate={filterCellTemplate} />
      <TableEditRow editCellTemplate={editCellTemplate} />
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
            id="number"
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
  commitChanges: PropTypes.func.isRequired,
  editCellTemplate: PropTypes.func.isRequired,
  filterCellTemplate: PropTypes.func.isRequired,
  sorting: PropTypes.array.isRequired
};
export default TableGrid;
