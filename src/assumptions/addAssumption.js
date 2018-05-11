import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';

class AddAssumption extends Component {
  componentWillMount() {
    const assumption = {
      userId: 1,
      assumptionTypeId: 1,
      percentage: 20,
      isInitialValue: 0,
      period: '2018-04',
    };
    this.props.actions.createAssumption(assumption);
  }

  render() {
    return <div>test</div>;
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
