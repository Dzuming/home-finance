import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  LocalSorting,
  PagingState,
  LocalPaging,
  FilteringState,
  LocalFiltering,
  EditingState
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
const TableGrid = ({rows, columns, commitChanges}) => {
  return (
    <Grid rows={rows} columns={columns} getRowId={row => row.id}>
      <FilteringState defaultFilters={[]}/>
      <PagingState defaultCurrentPage={0} pageSize={10}/>
      <SortingState/>
      <EditingState onCommitChanges={commitChanges}/>
      <LocalFiltering/>
      <LocalPaging/>
      <LocalSorting/>
      <TableView/>
      <TableHeaderRow allowSorting/>
      <TableFilterRow/>
      <TableEditRow/>
      <TableEditColumn
        allowAdding
        allowEditing
        allowDeleting
        commandTemplate={({executeCommand, id}) => {
          const template = CommandTemplate[id];
          if (template) {
            const onClick = (e) => {
              executeCommand();
              e.stopPropagation();
            };
            return template(onClick,);
          }
          return undefined;
        }}/>
      <PagingPanel/>
    </Grid>
  );
};
TableGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  commitChanges: PropTypes.func.isRequired
};
export default TableGrid;
