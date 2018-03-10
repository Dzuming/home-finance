import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as budgetActions from '../actions/budgetActions';
import { withStyles } from 'material-ui';

const styles = {
  budget: {
    fontSize: '1.5rem',
    paddingRight: '1rem'
  }
};

class Budget extends Component {

  componentDidMount () {
    this.props.actions.fetchBudget();
  }

  render () {
    const {budget, classes} = this.props;
    return (
      <div className={classes.budget}>{budget} zł</div>
    );
  }
}

Budget.propTypes = {
  actions: PropTypes.shape({
    fetchBudget: PropTypes.Func,
  }),
  budget: PropTypes.number,
  classes: PropTypes.object
};
const mapStateToProps = state => ({
  budget: state.budget
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(budgetActions, dispatch)
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Budget);
