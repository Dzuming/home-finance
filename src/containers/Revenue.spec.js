import React from 'react';
import { create } from 'react-test-renderer';
import Reveue from './Revenue';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  revenue: 55,
  user: [],
  financeFlow: { selectedDate: '2018-03' },
  login: { isAuthenticated: true },
});
const component = create(
  <Provider store={store}>
    <Reveue />
  </Provider>,
);

describe('<Reveue />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
