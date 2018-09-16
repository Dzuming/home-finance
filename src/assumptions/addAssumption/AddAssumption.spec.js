import React from 'react';
import { create } from 'react-test-renderer';
import AddAssumption from './AddAssumption';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  user: [],
  login: { isAuthenticated: true },
  assumptions: { types: [] },
  financeFlow: { categories: [] },
});
const component = create(
  <Provider store={store}>
    <AddAssumption />
  </Provider>,
);

describe('<AddAssumption  />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});