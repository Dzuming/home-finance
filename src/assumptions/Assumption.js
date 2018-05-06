import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as assumptionActions from '../actions/assumptionActions';
import { connect } from 'react-redux';
import moment from 'moment';
import Nav from './Nav';
import MonthlyAssumption from './MonthlyAssumption';

const TABS = {
  0: ({ assumptions, date, changeAssumptionDate }) => (
    <MonthlyAssumption
      assumptions={assumptions}
      date={date}
      changeAssumptionDate={changeAssumptionDate}
    />
  ),
};

class Assumption extends Component {
  state = {
    date: '',
    currentTab: 0,
  };

  changeAssumptionDate = event => {
    const date = event.target.value;
    this.setState({ date });
  };

  handleTabChange = (event, value) => this.setState({ currentTab: value });

  componentDidMount() {
    this.setState({ date: moment().format('YYYY-MM') });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.props.actions.fetchAssumptions(this.state.date);
    }
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
  }),
  assumptions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  assumptions: state.assumptions,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(assumptionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assumption);
