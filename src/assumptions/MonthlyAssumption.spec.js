import React from 'react';
import { create } from 'react-test-renderer';
import MonthlyAssumption from './MonthlyAssumption';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { theme } from '../style/muiTheme';
import { MuiThemeProvider } from 'material-ui';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  assumptions: {
    monthly: [],
  },
  user: [],
  login: { isAuthenticated: true },
});
const component = create(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <MonthlyAssumption />
    </Provider>
  </MuiThemeProvider>,
);

describe('<MonthlyAssumption  />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
