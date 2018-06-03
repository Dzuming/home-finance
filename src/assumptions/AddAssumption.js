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
  makeGetAssumptionTypes,
  makeGetCategories,
} from '../helpers/selectors';
import DatePicker from '../components/commons/DatePicker';

class AddAssumption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assumptionType: {},
      category: {},
      isInitialValue: 0,
      percentage: 20,
      period: '2018-05',
    };
  }

  createAssumption(assumption) {
    this.props.actions.createAssumption(assumption);
  }

  handleDateChange = event => {
    const date = event.target.value;
    this.setState(state => (state.period = date));
  };

  handleDraggedElementChange = (key, value) => this.setState({ [key]: value });

  componentDidMount() {
    this.props.actions.fetchAssumptionTypes(this.state.period);
    this.props.actions.fetchCategories();
  }

  render() {
    const {
      assumptionType,
      category,
      isInitialValue,
      percentage,
      period,
    } = this.state;
    const { assumptionTypes, categories } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <div>Assumption type</div>
            {assumptionTypes.map(assumptionType => (
              <DragAssumptionTypes
                key={assumptionType.id}
                assumptionType={assumptionType}
              />
            ))}
          </Grid>
          <Grid item xs={6}>
            <DropBoard
              assumptionType={assumptionType}
              period={period}
              handleDateChange={this.handleDateChange}
              category={category}
              date={period}
              handleDraggedElementChange={this.handleDraggedElementChange}
            />
          </Grid>
          <Grid item xs={3}>
            <div>Categories</div>
            {categories.map(category => (
              <DragCategories key={category.id} category={category} />
            ))}
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            this.createAssumption({
              userId: 1,
              assumptionTypeId: assumptionType.id,
              percentage,
              isInitialValue,
              period,
            });
          }}
        >
          Add assumption
        </Button>
      </React.Fragment>
    );
  }
}

AddAssumption.propTypes = {
  actions: PropTypes.shape({
    createAssumption: PropTypes.Func,
    fetchAssumptionTypes: PropTypes.Func,
    fetchCategories: PropTypes.Func,
  }),
  assumptionTypes: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  assumptionTypes: makeGetAssumptionTypes(state),
  categories: makeGetCategories(state),
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