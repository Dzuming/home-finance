import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './userActions';
import * as types from './actionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import env from '../../environments/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates GET_USER when get user has been done', () => {
    const email = 'test@test.com';
    fetchMock
      .getOnce(`${env.api_url}/api/user/${email}`, {
        body: {id: '123',name: 'John Doe'},
        headers: {'content-type': 'application/json'}
      });
    const expectedActions = [
      {type: types.GET_USER, newUser: {id: '123', name: 'John Doe'}},
    ];
    const store = mockStore({user: '[]'});
    return store.dispatch(actions.getUser(email)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
