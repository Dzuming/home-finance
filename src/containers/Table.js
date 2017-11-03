import React, { Component } from 'react';
import TableGrid from '../components/TableGrid';
import DeleteDialog from '../components/DeleteDialog';
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
          title: 'SPending'
        }, {
          name: 'dataCreated',
          title: 'Data created'
        },
      ],
      rows: [
      ],
      deletingRows: []
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
  render() {
    const { rows, columns, deletingRows } = this.state;
    this.props.actions.getFinanceFlow();
    return (
      <div>
        <TableGrid rows={rows} columns={columns} commitChanges={this.commitChanges} />
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
};
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(financeFlowActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);
