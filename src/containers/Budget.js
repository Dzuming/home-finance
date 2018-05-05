import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as budgetActions from '../actions/budgetActions';

class Budget extends Component {
  componentDidMount() {
    this.props.actions.fetchBudget();
  }

  render() {
    const { budget } = this.props;
    return <div>{budget} zł</div>;
  }
}

Budget.propTypes = {
  actions: PropTypes.shape({
    fetchBudget: PropTypes.Func,
  }),
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
const mapStateToProps = state => ({
  budget: state.budget,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(budgetActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
