import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from 'material-ui';
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
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import DeleteIcon from 'material-ui-icons/Delete';
const commandTemplates = {
  edit: onClick => (
    <IconButton onClick={onClick} title="Edit row">
      <EditIcon/>
    </IconButton>
  ),
  delete: onClick => (
    <IconButton onClick={onClick} title="Delete row">
      <DeleteIcon/>
    </IconButton>
  ),
  commit: onClick => (
    <IconButton onClick={onClick} title="Save changes">
      <SaveIcon/>
    </IconButton>
  ),
  cancel: onClick => (
    <IconButton color="accent" onClick={onClick} title="Cancel changes">
      <CancelIcon/>
    </IconButton>
  )
};
const TableGrid = ({
  rows,
  columns,
  commitChanges
}) => {
  return (
    <Grid rows={rows} columns={columns} getRowId={row => row.id}>
      <FilteringState defaultFilters={[]}/>
      <PagingState defaultCurrentPage={0} pageSize={10}/>
      <SortingState/>
      <EditingState
        onCommitChanges={commitChanges}/>
      <LocalFiltering/>
      <LocalPaging/>
      <LocalSorting/>
      <TableView/>
      <TableHeaderRow allowSorting/>
      <TableFilterRow/>
      <TableEditRow/>
      <TableEditColumn
        allowEditing
        allowDeleting
        commandTemplate={({executeCommand, id}) => {
          const template = commandTemplates[id];
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
}
TableGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  commitChanges: PropTypes.func.isRequired,
};
export default TableGrid;
