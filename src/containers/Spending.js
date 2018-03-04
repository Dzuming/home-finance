import React, { Component } from 'react';
import TableGrid from '../components/TableGrid';
import DeleteDialog from '../components/DeleteDialog';
import LookupEditCell from '../components/LookupEditCell';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as financeFlowActions from '../actions/financeFlowActions';
import * as budgetActions from '../actions/budgetActions';

class Spending extends Component {
  constructor (props) {
    super(props);
    this.state = {
      categories: [],
      columns: [
        {
          name: 'description',
          title: 'Description'
        }, {
          name: 'spending',
          title: 'Value',
          dataType: 'number'
        }, {
          name: 'category',
          title: 'Category'
        },
        {
          name: 'dateCreated',
          title: 'Create date',
          dataType: 'date'
        },
      ],
      deletingRows: [],
      sorting: [{columnName: 'dateCreated', direction: 'desc'}],
    };

    this.commitChanges = ({added, changed, deleted}) => {
      if (added) {
        const {id} = this.props.categories.find(category => category.name === Object.assign({}, ...added)['category']);
        const data = Object.assign({}, ...added, {category: id});
        this.props.actions.createSpending(data);
      }
      this.cancelDelete = () => this.setState({deletingRows: []});
      if (changed) {
        let spending = {id: Object.keys(changed)[0], items: Object.assign({}, Object.values(changed)[0])};
        if (spending.items.category) {
          const {id} = this.props.categories.find(category => category.name === spending.items.category);
          spending = Object.assign({}, {
            ...spending,
            items: {...spending.items, category: id}
          });
        }
        this.props.actions.putSpending(spending);
      }

      this.setState({
        deletingRows: deleted || this.state.deletingRows
      });
    };
    this.baseCellTemplate = (column, typeOfOperation) => {
      if (!this.columnToAddSelect(column.name)) {
        return;
      }
      if (typeOfOperation) {
        return typeOfOperation();
      }
      return undefined;
    };
    this.editCellTemplate = ({column, value, onValueChange}) => {
      const editMethod = () => {
        return (
          <LookupEditCell
            column={column}
            value={value ? value : ''}
            onValueChange={onValueChange}
            availableValues={this.state.availableValues}
          />
        );
      };
      return this.baseCellTemplate(column, editMethod);

    };
    this.filterCellTemplate = ({column, filter, setFilter}) => {
      const filterMethod = () => {
        return (
          <LookupEditCell
            column={column}
            value={filter ? filter.value : ''}
            onValueChange={e => setFilter(e ? {value: e} : null)}
            availableValues={this.state.availableValues}
          />
        );
      };
      return this.baseCellTemplate(column, filterMethod);
    };
    this.columnToAddSelect = (columnName) => {
      const columnToAddSelectList = ['category'];
      let addSelectToColumn = false;
      columnToAddSelectList.map((columnWithSelectName) => {
        if (columnName === columnWithSelectName) {
          addSelectToColumn = true;
        }
      });
      return addSelectToColumn;
    };
    this.deleteRows = () => {
      this.state.deletingRows.forEach((rowId) => {
        this.props.actions.deleteSpending(rowId);
      });
      this.setState({deletingRows: []});
    };
    this.cancelDelete = () => this.setState({deletingRows: []});
  }

  componentDidMount () {
    this.props.actions.fetchSpending();
    this.props.actions.fetchCategories();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.spending !== nextProps.spending) {
      this.props.actions.fetchBudget();

    }
  }

  render () {
    const {columns, sorting, deletingRows} = this.state;
    const {categories, spending} = this.props;
    return (
      <div>
        <TableGrid
          rows={spending}
          columns={columns}
          commitChanges={this.commitChanges}
          sorting={sorting}
          editCellTemplate={this.editCellTemplate}
          categories={categories}
          filterCellTemplate={this.filterCellTemplate}/>
        <DeleteDialog
          rows={spending}
          columns={columns}
          deletingRows={deletingRows}
          deleteRows={this.deleteRows}
          cancelDelete={this.cancelDelete}/>
      </div>
    );
  }
}

Spending.propTypes = {
  actions: PropTypes.shape({
    putSpending: PropTypes.Func,
    fetchCategories: PropTypes.Func,
    fetchSpending: PropTypes.Func,
    deleteSpending: PropTypes.Func,
    createSpending: PropTypes.Func,
    fetchBudget: PropTypes.Func

  }),
  spending: PropTypes.array,
  categories: PropTypes.array
};

function mapStateToProps (state) {
  return {
    spending: state.financeFlow.spending,
    categories: state.financeFlow.categories
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, financeFlowActions, budgetActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spending);
