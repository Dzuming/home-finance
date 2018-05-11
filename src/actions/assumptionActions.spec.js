import * as actions from './assumptionActions';
import expect from 'expect';

const assumptions = [
  {
    id: 1,
    name: 'Poduszka bezpieczeństwa',
    percentage: 20,
    value: 66.6,
  },
  {
    id: 2,
    name: 'Wakacje',
    percentage: 10,
    value: 33.3,
  },
  {
    id: 3,
    name: 'Wakacje',
    percentage: 50,
    value: 695,
  },
];

const overallAssumptions = [
  {
    name: 'Poduszka bezpieczeństwa',
    value: 66.6,
  },
  {
    name: 'Wakacje',
    value: 33.3,
  },
  {
    name: 'Wakacje',
    value: 695,
  },
];

describe('assumption actions', () => {
  it('should create setAssumption action with snapshot', () => {
    expect(actions.setAssumption(assumptions)).toMatchSnapshot();
  });
  it('should create setOverallAssumptiona action with snapshot', () => {
    expect(actions.setOverallAssumptions(overallAssumptions)).toMatchSnapshot();
  });
  it('should create addAssumption action with snapshot', () => {
    const assumption = {
      userId: 1,
      assumptionTypeId: 1,
      percentage: 20,
      isInitialValue: 0,
      period: '2018-04',
    };
    expect(actions.addAssumption(assumption)).toMatchSnapshot();
  });
});
