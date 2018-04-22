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

describe('budget actions', () => {
  it('should create setAssumption action with snapshot', () => {
    expect(actions.setAssumption(assumptions)).toMatchSnapshot();
  });
});
