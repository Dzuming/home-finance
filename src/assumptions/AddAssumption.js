import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';
import { Button, Grid } from 'material-ui';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropBoard from './DropBoard';
import DragAssumptionCategory from './DragAssumptionCategory';
import { makeGetAssumptionTypes } from '../helpers/selectors';

class AddAssumption extends Component {
  state = {
    assumption: {
      userId: 1,
      assumptionTypeId: 1,
      percentage: 20,
      isInitialValue: 0,
      period: '2018-04',
    },
  };

  createAssumption(assumption) {
    this.props.actions.createAssumption(assumption);
  }

  componentDidMount() {
    this.props.actions.fetchAssumptionTypes('2018-05');
  }

  render() {
    const { assumption } = this.state;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <DragAssumptionCategory />
          </Grid>
          <Grid item xs={6}>
            <DropBoard />
          </Grid>
          <Grid item xs={3}>
            <DragAssumptionCategory />
          </Grid>
        </Grid>
        <Button
          onClick={() => {
            this.createAssumption(assumption);
          }}
        >
          Add assumption
        </Button>
      </div>
    );
  }
}

AddAssumption.propTypes = {
  actions: PropTypes.shape({
    createAssumption: PropTypes.Func,
    fetchAssumptionTypes: PropTypes.Func,
  }),
};

const mapStateToProps = state => ({
  assumptionTypes: makeGetAssumptionTypes(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend),
)(AddAssumption);
