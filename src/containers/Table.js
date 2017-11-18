import React, { Component } from 'react';
import TableGrid from '../components/TableGrid';
import DeleteDialog from '../components/DeleteDialog';
import LookupEditCell from '../components/LookupEditCell';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as financeFlowActions from '../actions/financeFlowActions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'description',
          title: 'Description'
        }, {
          name: 'spending',
          title: 'Spending',
          dataType: 'number'
        }, {
          name: 'category',
          title: 'Category'
        },
        {
          name: 'dateCreated',
          title: 'Data created',
          dataType: 'date'
        },
      ],
      rows: [],
      deletingRows: [],
      sorting: [{ columnName: 'dateCreated', direction: 'desc' }],
    };

    this.commitChanges = ({ added, changed, deleted }) => {
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
        this.props.actions.setFinanceFlow(...added);
      }

      this.cancelDelete = () => this.setState({ deletingRows: [] });
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

    this.editCellTemplate = ({ column, value, onValueChange }) => {

      if (column.name !== 'category') {
        return;
      }
      const columnValues = ['jedzenie', 'ubrania'];
      if (columnValues) {
        return (
          <LookupEditCell
            column={column}
            value={value ? value : ''}
            onValueChange={onValueChange}
            availableValues={columnValues}
          />
        );
      }
      return undefined;
    };
    this.filterCellTemplate = ({ column, filter, setFilter }) => {
      if (column.name !== 'category') {
        return;
      }
      const columnValues = ['Jedzenie', 'Ubrania'];

      if (columnValues) {
        this.value = this.state.value ? this.value : columnValues[0];
        return (
          <LookupEditCell
            column={column}
            value={filter ? filter.value : ''}
            onValueChange={e => setFilter(e ? { value: e } : null)}
            availableValues={columnValues}
          />
        );
      }
      return undefined;
    };
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
      this.setState({ rows, deletingRows: [] });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
  }

  componentDidMount() {
    this.props.actions.getFinanceFlow().then(() => {
      this.setState({
        rows: this.props.spending
      });
    });
  }

  render() {
    const { rows, columns, sorting, deletingRows } = this.state;
    return (
      <div>
        <TableGrid rows={rows} columns={columns} commitChanges={this.commitChanges} sorting={sorting} editCellTemplate={this.editCellTemplate} filterCellTemplate={this.filterCellTemplate} />
        <DeleteDialog
          rows={rows}
          columns={columns}
          deletingRows={deletingRows}
          deleteRows={this.deleteRows}
          cancelDelete={this.cancelDelete} />
      </div>
    );
  }
}
Table.propTypes = {
  actions: PropTypes.object,
  spending: PropTypes.array
};
function mapStateToProps(state) {
  return { spending: state.financeFlow.spending };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(financeFlowActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);
