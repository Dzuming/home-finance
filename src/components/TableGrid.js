import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
  FilteringState,
  EditingState,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';
import CommandTemplate from '../helpers/CommandTemplates';
import TextField from 'material-ui/TextField';

const TableGrid = ({rows, columns, sorting, commitChanges, editCellTemplate, filterCellTemplate}) => {
  return (
    <Grid rows={rows} columns={columns} getRowId={row => row.id}>
      <FilteringState defaultFilters={[]}/>
      <PagingState defaultCurrentPage={0} pageSize={10}/>
      <SortingState defaultSorting={sorting}/>
      <IntegratedSorting/>
      <EditingState onCommitChanges={commitChanges}/>
      <Table/>
      <TableHeaderRow showSortingControls/>

      <TableFilterRow filterCellTemplate={filterCellTemplate}/>
      <TableEditRow editCellTemplate={editCellTemplate}/>
      <TableEditColumn
        showAddCommand
        showEditCommand
        showDeleteCommand
        commandComponent={
          ({id, onExecute}) => {
            const CommandButton = CommandTemplate[id];
            return (
              <CommandButton
                onExecute={onExecute}
              />
            );
          }
        }
      />
      {/*<PagingPanel/>*/}
      <DataTypeProvider
        for={['dateCreated']}
        type="date"
        editorTemplate={({onValueChange}) => (
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
        for={['spending']}
        type="number"
        editorTemplate={({onValueChange}) => (
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
