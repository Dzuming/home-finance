import React from 'react';
import { create } from 'react-test-renderer';
import MonthlyAssumption from './MonthlyAssumption';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  user: [],
  login: { isAuthenticated: true },
});
const component = create(
  <Provider store={store}>
    <MonthlyAssumption />
  </Provider>,
);

describe('<MonthlyAssumption  />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
