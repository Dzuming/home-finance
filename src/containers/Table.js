import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
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
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui';
import {
  Grid,
  TableView,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  DropDownMenu
} from '@devexpress/dx-react-grid-material-ui';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import DeleteIcon from 'material-ui-icons/Delete';
const styles = theme => ({
  commandButton: {
    minWidth: '40px'
  },
  lookupEditCell: {
    verticalAlign: 'middle',
    paddingRight: theme.spacing.unit,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit
    }
  },
  dialog: {
    width: 'calc(100% - 16px)'
  }
});
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
const LookupEditCellBase = (({value, onValueChange, availableValues, classes}) => (
  <TableCell className={classes.lookupEditCell}>
    <DropDownMenu
      onItemClick={newValue => onValueChange(newValue)}
      defaultTitle={value}
      items={availableValues}/>
  </TableCell>
));
LookupEditCellBase.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
LookupEditCellBase.defaultProps = {
  value: undefined
};

export const LookupEditCell = withStyles(styles, {name: 'ControlledModeDemo'})(LookupEditCellBase);
const availableValues = {
  // product: globalSalesValues.product, region: globalSalesValues.region,
  // customer: globalSalesValues.customer,
};
class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'name',
          title: 'Name'
        }, {
          name: 'sex',
          title: 'Sex'
        }, {
          name: 'city',
          title: 'City'
        }, {
          name: 'car',
          title: 'Car'
        }
      ],
      rows: [
        {
          id: 1,
          sex: "Female",
          name: "Sandra",
          city: "Las Vegas",
          car: "Audi A4"
        }, {
          id: 2,
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          id: 3,
          sex: "Male",
          name: "Mark",
          city: "Paris",
          car: "Honda Accord"
        }, {
          id: 4,
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          id: 5,
          sex: "Female",
          name: "Linda",
          city: "Austin",
          car: "Toyota Corolla"
        }, {
          id: 6,
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Chevrolet Cruze"
        }, {
          id: 7,
          sex: "Female",
          name: "Lisa",
          city: "London",
          car: "BMW 750"
        }, {
          id: 8,
          sex: "Male",
          name: "Mark",
          city: "Chicago",
          car: "Toyota Corolla"
        }, {
          id: 9,
          sex: "Male",
          name: "Thomas",
          city: "Rio de Janeiro",
          car: "Honda Accord"
        }, {
          id: 10,
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Honda Civic"
        }, {
          id: 11,
          sex: "Female",
          name: "Betty",
          city: "Paris",
          car: "Honda Civic"
        }, {
          id: 12,
          sex: "Male",
          name: "Robert",
          city: "Los Angeles",
          car: "Honda Accord"
        }, {
          id: 13,
          sex: "Male",
          name: "William",
          city: "Los Angeles",
          car: "Honda Civic"
        }, {
          id: 14,
          sex: "Male",
          name: "Mark",
          city: "Austin",
          car: "Nissan Altima"
        }
      ],
      editingRows: [],
      deletingRows: [],
      changedRows: {}
    };
    this.changeSorting = sorting => this.setState({sorting});
    this.changeEditingRows = editingRows => this.setState({editingRows});
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length
        ? row
        : {
          amount: 0,
          discount: 0,
          saleDate: new Date()
            .toISOString()
            .split('T')[0],
          product: availableValues.product[0],
          region: availableValues.region[0],
          customer: availableValues.customer[0]
        }))
    });
    this.changeChangedRows = changedRows => this.setState({changedRows});
    this.changeFilters = filters => this.setState({filters});
    this.changeCurrentPage = currentPage => this.setState({currentPage});
    this.changePageSize = pageSize => this.setState({pageSize});

    this.commitChanges = ({added, changed, deleted}) => {
      let rows = this.state.rows;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0
          ? rows[rows.length - 1].id + 1
          : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
          }))
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id]
          ? {
            ...row,
            ...changed[row.id]
          }
          : row));
      }
      this.setState({
        rows,
        deletingRows: deleted || this.state.deletingRows
      });
    };
    this.cancelDelete = () => this.setState({deletingRows: []});
    this.deleteRows = () => {
      const rows = this
        .state
        .rows
        .slice();
      this
        .state
        .deletingRows
        .forEach((rowId) => {
          const index = rows.findIndex(row => row.id === rowId);
          if (index > -1) {
            rows.splice(index, 1);
          }
        });
      this.setState({rows, deletingRows: []});
    };
    this.changeColumnOrder = (order) => {
      this.setState({columnOrder: order});
    };
  }
  render() {
    const {classes} = this.props;
    const {
      rows,
      columns,
      editingRows,
      addedRows,
      changedRows,
      deletingRows
    } = this.state;

    return (
      <div>
        <Grid rows={rows} columns={columns} getRowId={row => row.id}>
          <FilteringState defaultFilters={[]}/>
          <PagingState defaultCurrentPage={0} pageSize={10}/>
          <SortingState/>
          <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}/>
          <LocalFiltering/>
          <LocalPaging/>
          <LocalSorting/>
          <TableView/>
          <TableHeaderRow allowSorting/>
          <TableFilterRow/>
          <TableEditRow
            editCellTemplate={(props) => {
            const {column} = props;
            const columnValues = availableValues[column.name];
            if (columnValues) {
              return <LookupEditCell {...props} availableValues={columnValues}/>;
            }
            return undefined;
          }}/>
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

        <Dialog
          open={!!deletingRows.length}
          onRequestClose={this.cancelDelete}
          classes={{
          paper: classes.dialog
        }}>
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the following row?
            </DialogContentText>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}>
              <TableView tableCellTemplate={this.tableCellTemplate}/>
              <TableHeaderRow/>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
            <Button onClick={this.deleteRows} color="accent">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Table.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, {name: 'ControlledModeDemo'})(Table);
