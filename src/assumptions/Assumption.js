// @flow
import * as React from 'react';
import Nav from './Nav';
import MonthlyAssumption from './MonthlyAssumption';
import OverallAssumptions from './OverallAssumptions';
import AddAssumption from './AddAssumption';

type State = {
  currentTab: number
};

const TABS = {
  '0': (): React.Node => <MonthlyAssumption />,
  '1': (): React.Node => <OverallAssumptions />,
  '2': (): React.Node => <AddAssumption />
};

class Assumption extends React.Component<{}, State> {
  state = {
    currentTab: 0
  };

  handleTabChange = (value: number): void =>
    this.setState({ currentTab: value });

  render(): React.Node {
    const { currentTab }: State = this.state;
    return (
      <React.Fragment>
        <Nav currentTab={currentTab} handleTabChange={this.handleTabChange} />
        {TABS[currentTab]()}
      </React.Fragment>
    );
  }
}

export default Assumption;
