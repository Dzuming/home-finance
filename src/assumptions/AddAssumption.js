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

  handleDraggedElementChange = (key, value, callback) =>
    this.setState({ [key]: value }, callback);

  componentDidMount() {
    this.props.actions.fetchAssumptionTypes();
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
    const { draggedAssumptionTypes, draggedCategories, actions } = this.props;
    return (
      <React.Fragment>
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
              category={category}
              date={period}
              handleDraggedElementChange={this.handleDraggedElementChange}
              reduceAssumptionTypes={actions.reduceAssumptionTypes}
              reduceCategories={actions.reduceCategories}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
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
