import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './financeFlowActions';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import env from '../../environments/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('finance flow actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates CREATE_FINANCE_FLOW when postFinanceFlow has been done', () => {
    const user = {
      id: 1,
      name: 'test',
    };
    localStorage.setItem('user', JSON.stringify(user));
    fetchMock
      .postOnce(`${env.api_url}/api/spending`, {
        body: {message: 'test'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: 'CREATE_FINANCE_FLOW', data: {message: 'test'}},
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

  it('creates REMOVE_FINANCE_FLOW when removeFinanceFlow has been done', () => {
    const id = 1;
    fetchMock
      .deleteOnce(`${env.api_url}/api/spending/${id}`, {
        body: {message: 'test'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: 'REMOVE_FINANCE_FLOW', data: {'id': 1, message: 'test'}},
    ];
    const store = mockStore({user: {id: 1}, financeFlow: {selectedDate: '2018-01'}});

    return store.dispatch(actions.deleteFinanceFlowById(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates EDIT_FINANCE_FLOW when editFinanceFlow has been done', () => {
    const id = 1;
    fetchMock
      .putOnce(`${env.api_url}/api/spending/${id}`, {
        body: {message: 'test'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: 'EDIT_FINANCE_FLOW', data: {'id': 1, message: 'test'}},
    ];
    const store = mockStore({user: {id: 1}, financeFlow: {selectedDate: '2018-01'}});

    return store.dispatch(actions.editFinanceFlowById(id)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create SET_CATEGORIES action with snapshot', () => {
    expect(actions.setCategories({id: 1, name: 'jedzenie'})).toMatchSnapshot();
  });
  it('should create SET_SPENDING action with snapshot', () => {
    expect(actions.setSpending([{
      id: 1,
      name: 'Zakupy',
      value: 300,
      user_id: 1,
      created_at: '2018-01-01 12:12:12',
      category: {id: 1, name: 'jedzenie'}
    }])).toMatchSnapshot();
  });
});
