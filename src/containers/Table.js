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
import {TableCell, IconButton} from 'material-ui';
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
          sex: "Female",
          name: "Sandra",
          city: "Las Vegas",
          car: "Audi A4"
        }, {
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          sex: "Male",
          name: "Mark",
          city: "Paris",
          car: "Honda Accord"
        }, {
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          sex: "Female",
          name: "Linda",
          city: "Austin",
          car: "Toyota Corolla"
        }, {
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Chevrolet Cruze"
        }, {
          sex: "Female",
          name: "Lisa",
          city: "London",
          car: "BMW 750"
        }, {
          sex: "Male",
          name: "Mark",
          city: "Chicago",
          car: "Toyota Corolla"
        }, {
          sex: "Male",
          name: "Thomas",
          city: "Rio de Janeiro",
          car: "Honda Accord"
        }, {
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Honda Civic"
        }, {
          sex: "Female",
          name: "Betty",
          city: "Paris",
          car: "Honda Civic"
        }, {
          sex: "Male",
          name: "Robert",
          city: "Los Angeles",
          car: "Honda Accord"
        }, {
          sex: "Male",
          name: "William",
          city: "Los Angeles",
          car: "Honda Civic"
        }, {
          sex: "Male",
          name: "Mark",
          city: "Austin",
          car: "Nissan Altima"
        }
      ],
      editingRows: []
    };
    this.changeEditingRows = editingRows => this.setState({editingRows})
  }
  render() {
    const {rows, columns} = this.state;

    return (
      <Grid rows={rows} columns={columns}>
        <FilteringState defaultFilters={[]}/>
        <PagingState defaultCurrentPage={0} pageSize={10}/>
        <SortingState/>
        <EditingState onCommitChanges={this.commitChanges}/>
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
}

export default withStyles(styles, {name: 'ControlledModeDemo'})(Table);
