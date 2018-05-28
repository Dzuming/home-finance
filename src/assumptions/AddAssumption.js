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
import DatePicker from '../commons/DatePicker';

class AddAssumption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assumption: {
        userId: 1,
        assumptionTypeId: 1,
        percentage: 20,
        isInitialValue: 0,
        period: '2018-05',
      },
      assumptionType: '',
      category: '',
    };
  }

  createAssumption(assumption) {
    this.props.actions.createAssumption(assumption);
  }

  handleDateChange = event => {
    const date = event.target.value;
    this.setState(state => (state.assumption.period = date));
  };

  handleDraggedElementChange = (key, value) => this.setState({ [key]: value });

  componentDidMount() {
    this.props.actions.fetchAssumptionTypes(this.state.assumption.period);
    this.props.actions.fetchCategories();
  }

  render() {
    const { assumption, assumptionType, category } = this.state;
    const { assumptionTypes, categories } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <DatePicker
            value={assumption.period}
            handleChange={this.handleDateChange}
          />
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            {assumptionTypes.map(assumptionType => (
              <DragAssumptionTypes
                key={assumptionType.id}
                name={assumptionType.name}
                s
              />
            ))}
          </Grid>
          <Grid item xs={6}>
            <DropBoard
              assumptionType={assumptionType}
              category={category}
              date={assumption.period}
              handleDraggedElementChange={this.handleDraggedElementChange}
            />
          </Grid>
          <Grid item xs={3}>
            {categories.map(category => (
              <DragCategories key={category.id} name={category.name} />
            ))}
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            this.createAssumption(assumption);
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
