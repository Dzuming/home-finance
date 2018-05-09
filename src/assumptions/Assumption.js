import React, { Component } from 'react';
import Nav from './Nav';
import MonthlyAssumption from './MonthlyAssumption';
import OverallAssumptions from './OverallAssumptions';

const TABS = {
  0: () => <MonthlyAssumption />,
  1: () => <OverallAssumptions />,
};

class Assumption extends Component {
  state = {
    currentTab: 0,
  };

  handleTabChange = (event, value) => this.setState({ currentTab: value });

  render() {
    const { currentTab } = this.state;
    return (
      <React.Fragment>
        <Nav currentTab={currentTab} handleTabChange={this.handleTabChange} />
        {TABS[currentTab]()}
      </React.Fragment>
    );
  }
}

export default Assumption;
