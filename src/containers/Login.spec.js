import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  token: '',
  user: [],
  login: { isAuthenticated: true },
});
const component = create(
  <Provider store={store}>
    <Login />
  </Provider>,
);

describe('<Login />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
