import React, { Component } from 'react';
import TableGrid from '../components/TableGrid';
import DeleteDialog from '../components/DeleteDialog';
import LookupEditCell from '../components/LookupEditCell';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeGetProfit } from '../selectors/profits';
import { makeGetCategoryTypes } from '../selectors/categories';
import {createProfit, fetchProfit, putProfit} from "../actions/financeFlowActions";
import {fetchCategories} from "../actions/categoryActions";
import {fetchBudget} from "../actions/budgetActions";

class Profit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      columns: [
        {
          name: 'description',
          title: 'Description',
        },
        {
          name: 'profit',
          title: 'Value',
          dataType: 'number',
        },
        {
          name: 'category',
          title: 'Category',
        },
        {
          name: 'period',
          title: 'Period',
          dataType: 'date',
        },
      ],
      deletingRows: [],
      sorting: [{ columnName: 'period', direction: 'desc' }],
    };

    this.commitChanges = ({ added, changed, deleted }) => {
      const {createProfit, categories, putProfit} = this.props;
      if (added) {
        const { id } = categories.find(
          category => category.name === Object.assign({}, ...added)['category'],
        );
        const data = Object.assign({}, ...added, { category: id });
        createProfit(data);
      }
      this.cancelDelete = () => this.setState({ deletingRows: [] });
      if (changed) {
        let profit = {
          id: Object.keys(changed)[0],
          items: Object.assign({}, Object.values(changed)[0]),
        };
        if (profit.items.category) {
          const { id } = categories.find(
            category => category.name === profit.items.category,
          );
          profit = Object.assign(
            {},
            {
              ...profit,
              items: { ...profit.items, category: id },
            },
          );
        }
        putProfit(profit);
      }

      this.setState({
        deletingRows: deleted || this.state.deletingRows,
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
    this.editCellTemplate = ({ column, value, onValueChange }) => {
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
    this.filterCellTemplate = ({ column, filter, setFilter }) => {
      const filterMethod = () => {
        return (
          <LookupEditCell
            column={column}
            value={filter ? filter.value : ''}
            onValueChange={e => setFilter(e ? { value: e } : null)}
            availableValues={this.state.availableValues}
          />
        );
      };
      return this.baseCellTemplate(column, filterMethod);
    };
    this.columnToAddSelect = columnName => {
      const columnToAddSelectList = ['category'];
      let addSelectToColumn = false;
      columnToAddSelectList.map(columnWithSelectName => {
        if (columnName === columnWithSelectName) {
          addSelectToColumn = true;
        }
      });
      return addSelectToColumn;
    };
    this.deleteRows = () => {
      this.state.deletingRows.forEach(rowId => {
        this.props.actions.deleteProfit(rowId);
      });
      this.setState({ deletingRows: [] });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
  }

  componentDidMount() {
    const {fetchProfit, fetchCategories} = this.props
    fetchProfit();
    fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const {profit, fetchBudget} = this.props
    if (profit !== nextProps.profit) {
      fetchBudget();
    }
  }

  render() {
    const { columns, sorting, deletingRows } = this.state;
    const { categories, profit } = this.props;
    return (
      <div>
        <TableGrid
          rows={profit}
          columns={columns}
          commitChanges={this.commitChanges}
          sorting={sorting}
          editCellTemplate={this.editCellTemplate}
          categories={categories}
          filterCellTemplate={this.filterCellTemplate}
        />
        <DeleteDialog
          rows={profit}
          columns={columns}
          deletingRows={deletingRows}
          deleteRows={this.deleteRows}
          cancelDelete={this.cancelDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profit: makeGetProfit(state),
    categories: makeGetCategoryTypes(state),
  };
};

const mapDispatchToProps = ({
  createProfit, putProfit, fetchProfit, fetchCategories, fetchBudget
});

export default connect(mapStateToProps, mapDispatchToProps)(Profit);
