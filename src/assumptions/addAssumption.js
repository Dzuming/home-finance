import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

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

  render() {
    const { assumption } = this.state;
    return (
      <Button onClick={this.createAssumption(assumption)}>
        Add assumption
      </Button>
    );
  }
}

AddAssumption.propTypes = {
  actions: PropTypes.shape({
    createAssumption: PropTypes.Func,
  }),
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default connect(null, mapDispatchToProps)(AddAssumption);
