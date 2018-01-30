import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './loginActions';
import * as types from './actionTypes';
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

  it('creates SUCCESS_LOGIN when authentication has been done', () => {
    const credentials = {
      email: 'test@test.com',
      password: 'secret'
    };
    fetchMock
      .postOnce(`${env.api_url}/oauth/token`, {
        body: {token: '12345'},
        headers: {'content-type': 'application/json'}
      })
    fetchMock
      .getOnce(`${env.api_url}/api/user/${credentials.email}`, {
        body: {id: '12345', name: 'John Doe'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: types.REQUEST_LOGIN},
      {type: types.SUCCESS_LOGIN},
      {type: types.AUTH_USER}
    ];
    const store = mockStore({token: '', user: []});
    return store.dispatch(actions.login(credentials)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
