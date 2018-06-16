import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import * as financeFlowActions from '../actions/financeFlowActions';
import { connect } from 'react-redux';
import { Button, Grid } from 'material-ui';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropBoard from './DropBoard';
import DragAssumptionTypes from './DragAssumptionTypes';
import DragCategories from './DragCategories';
import {
  makeGetDraggedAssumptionTypes,
  makeGetDraggedCategories,
} from '../helpers/selectors';
import { yearMonthFormatDate } from '../helpers/format';

class AddAssumption extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState = () => ({
    assumptionType: {},
    categories: [],
    isInitialValue: 0,
    percentage: 0,
    period: yearMonthFormatDate,
  });

  handleSubmit = event => {
    event.preventDefault();
    const {
      assumptionType,
      categories,
      percentage,
      isInitialValue,
      period,
    } = this.state;
    if (!this.validate()) {
      return;
    }
    new Promise(resolve => {
      resolve(
        this.props.actions.createAssumption({
          userId: 1,
          assumptionTypeId: assumptionType.id,
          categoryIds: categories.map(category => category.id),
          percentage,
          isInitialValue,
          period,
        }),
      );
    }).then(() => {
      this.resetAddAssumptionForm();
    });
  };

  validate = () => {
    let error = [];
    if (!this.state.percentage > 0) {
      error.push('Percentage value must be more than 0');
    }
    if (Object.getOwnPropertyNames(this.state.assumptionType).length === 0) {
      error.push('Assumption type value must be filled');
    }
    if (error.length > 0) {
      alert(error.join('\n'));
      return;
    }
    return true;
  };

  handleDateChange = event => {
    const date = event.target.value;
    this.setState(state => (state.period = date));
  };

  handleAssumptionTypeChange = (key, value, callback) =>
    this.setState({ [key]: value }, callback);

  handleCategoryChange = (value, callback) =>
    this.setState(
      {
        categories: value,
      },
      callback,
    );

  resetAddAssumptionForm = () => {
    this.setState(this.initialState());
    this.props.actions.resetDraggedAssumptionTypes();
    this.props.actions.resetDraggedCategories();
  };

  componentDidMount() {
    this.props.actions.fetchAssumptionTypes();
    this.props.actions.fetchCategories();
  }

  componentWillUnmount() {
    this.resetAddAssumptionForm();
  }

  render() {
    const { assumptionType, categories, period } = this.state;
    const { draggedAssumptionTypes, draggedCategories, actions } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={0}>
          <Grid
            container
            spacing={0}
            xs={12}
            direction={'row'}
            alignItems={'center'}
          >
            <div>Assumption type:</div>
            {draggedAssumptionTypes.map(assumptionType => (
              <DragAssumptionTypes
                key={assumptionType.id}
                assumptionType={assumptionType}
              />
            ))}
          </Grid>
          <Grid
            container
            spacing={0}
            xs={12}
            direction={'row'}
            alignItems={'center'}
          >
            <div>Categories:</div>
            {draggedCategories.map(category => (
              <DragCategories key={category.id} category={category} />
            ))}
          </Grid>
          <Grid item xs={12}>
            <DropBoard
              assumptionType={assumptionType}
              period={period}
              handleDateChange={this.handleDateChange}
              categories={categories}
              date={period}
              handleAssumptionTypeChange={this.handleAssumptionTypeChange}
              handleCategoryChange={this.handleCategoryChange}
              reduceAssumptionTypes={actions.reduceAssumptionTypes}
              reduceCategories={actions.reduceCategories}
            />
          </Grid>
        </Grid>
        <Button type={'submit'} fullWidth>
          Add assumption
        </Button>
      </form>
    );
  }
}

AddAssumption.propTypes = {
  actions: PropTypes.shape({
    createAssumption: PropTypes.Func,
    fetchAssumptionTypes: PropTypes.Func,
    fetchCategories: PropTypes.Func,
    reduceAssumptionTypes: PropTypes.Func,
  }),
  assumptionTypes: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  draggedAssumptionTypes: makeGetDraggedAssumptionTypes(state),
  draggedCategories: makeGetDraggedCategories(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, financeFlowActions, assumptionActions),
    dispatch,
  ),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend),
)(AddAssumption);
