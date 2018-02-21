import * as actions from './financeFlowActions';
import expect from 'expect';

const spending = {
  id: 1,
  name: 'Zakupy',
  value: 300,
  user_id: 1,
  created_at: '2018-01-01 12:12:12',
  category: {id: 1, name: 'jedzenie'}
};
const profit = {
  id: 1,
  name: 'Zakupy',
  value: 300,
  user_id: 1,
  created_at: '2018-01-01 12:12:12',
  category: {id: 1, name: 'jedzenie'}
};
describe('finance flow actions', () => {

  it('should create SET_CATEGORIES action with snapshot', () => {
    expect(actions.setCategories({id: 1, name: 'jedzenie'})).toMatchSnapshot();
  });
  it('should create setSpending action with snapshot', () => {
    expect(actions.setSpending([spending])).toMatchSnapshot();
  });

  it('should create setProfit action with snapshot', () => {
    expect(actions.setProfit([profit])).toMatchSnapshot();
  });

  it('should create addSpending action with snapshot', () => {
    expect(actions.addSpending([spending])).toMatchSnapshot();
  });

  it('should create removeSpending action with snapshot', () => {
    expect(actions.removeSpending([{
      id: 1,
    }])).toMatchSnapshot();
  });

  it('should create editSpending action with snapshot', () => {
    expect(actions.editSpending('test', 1, {data: {...spending}})).toMatchSnapshot();
  });
});
