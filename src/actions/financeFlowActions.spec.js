import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './financeFlowActions';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import env from '../../environments/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates SUCCESS_FINANCE_FLOW when fetchFinanceFlow has been done', () => {
    const userId = 1;
    const selectedDate = '2018-01';
    fetchMock
      .getOnce(`${env.api_url}/api/spending/${userId}/${selectedDate}`, {
        body: {description: '12345', value: 'John Doe', category: {id: 1}},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: 'SUCCESS_FINANCE_FLOW', data: {description: '12345', value: 'John Doe', category: {id: 1}}},
    ];
    const store = mockStore({user: {id: 1}, financeFlow: {selectedDate: '2018-01'}});
    return store.dispatch(actions.getFinanceFlow()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SUCCESS_FINANCE_FLOW when postFinanceFlow has been done', () => {
    const user = {
      id: 1,
      name: 'test',
    };
    localStorage.setItem('user', JSON.stringify(user));
    fetchMock
      .postOnce(`${env.api_url}/api/spending`, {
        body: {description: '12345', value: 'John Doe', category: {id: 1}},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: 'SUCCESS_FINANCE_FLOW', data: {description: '12345', value: 'John Doe', category: {id: 1}}},
    ];
    const store = mockStore({user: {id: 1}, financeFlow: {selectedDate: '2018-01'}});
    const data = {
      id: 1
    };
    return store.dispatch(actions.setFinanceFlow(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});