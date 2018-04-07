import React from 'react';
import { create } from 'react-test-renderer';
import Budget from './Budget';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({budget: 0, user: [], login: {isAuthenticated: true}});
const component = create(
  <Provider store={store}><Budget/></Provider>
);

describe('<Budget />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

