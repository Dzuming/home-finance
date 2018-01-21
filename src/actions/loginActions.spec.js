import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './loginActions';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import env from '../../environments/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates SUCCESS_LOGIN when authentication has been done', () => {
    fetchMock
      .postOnce(`${env.api_url}/oauth/token`, {
        body: {token: '12345', user: 'John Doe'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: types.REQUEST_LOGIN},
      {type: types.SUCCESS_LOGIN},
      {type: types.AUTH_USER},
      {type: types.SET_USER, user: 'John Doe'},
    ];
    const store = mockStore({token: '', user: []});
    const credentials = {
      email: 'test@test.com',
      password: 'secret'
    };
    return store.dispatch(actions.login(credentials)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
