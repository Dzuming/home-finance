import * as React from 'react';
import Nav from './Nav';
import MonthlyAssumption from './monthlyAssumption/MonthlyAssumption';
import OverallAssumptions from './overallAssumptions/OverallAssumptions';
import AddAssumption from './addAssumption/AddAssumption';

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

  handleTabChange = (
    event: SyntheticEvent<HTMLButtonElement>,
    value: number
  ): void => this.setState({ currentTab: value });

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
