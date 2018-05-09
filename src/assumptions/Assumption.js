import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Nav from './Nav';
import MonthlyAssumption from './MonthlyAssumption';
import OverallAssumptions from './OverallAssumptions';
import {
  makeGetMonthlyAssumption,
  makeGetOverallAssumption,
} from '../helpers/selectors';

const TABS = {
  0: () => <MonthlyAssumption />,
  1: ({ overallAssumptions }) => (
    <OverallAssumptions overallAssumptions={overallAssumptions} />
  ),
};

class Assumption extends Component {
  state = {
    currentTab: 0,
  };

  handleTabChange = (event, value) => this.setState({ currentTab: value });

  componentDidMount() {
    this.props.actions.fetchOverallAssumptions();
    this.setState({ date: moment().format('YYYY-MM') });
  }

  render() {
    const { currentTab } = this.state;
    return (
      <React.Fragment>
        <Nav currentTab={currentTab} handleTabChange={this.handleTabChange} />
        {TABS[currentTab]({
          ...this.props,
          ...this.state,
          changeAssumptionDate: this.changeAssumptionDate,
        })}
      </React.Fragment>
    );
  }
}

Assumption.propTypes = {
  actions: PropTypes.shape({
    fetchAssumptions: PropTypes.func.isRequired,
    fetchOverallAssumptions: PropTypes.func.isRequired,
  }),
  overallAssumptions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  overallAssumptions: makeGetOverallAssumption(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assumption);
