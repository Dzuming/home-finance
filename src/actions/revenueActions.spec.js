import * as actions from './revenueActions';
import expect from 'expect';

const revenue = {
  revenue: 50000
};

describe('revenue actions', () => {
  it('should create API_REQUEST_PENDING action with snapshot', () => {
    expect(actions.setRevenue(revenue)).toMatchSnapshot();
  });
});
