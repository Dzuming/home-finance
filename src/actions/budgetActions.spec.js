import * as actions from './budgetActions';
import expect from 'expect';

const budget = {
  budget: 50000,
};

describe('budget actions', () => {
  it('should create API_REQUEST_PENDING action with snapshot', () => {
    expect(actions.setBudget(budget)).toMatchSnapshot();
  });
});
