import React from 'react';
import { create } from 'react-test-renderer';
import Homepage from './Homepage';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { theme } from '../style/muiTheme';
import { MuiThemeProvider } from 'material-ui';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  budget: 123,
  revenue: 44,
  user: [],
  financeFlow: { selectedDate: '2018-03' },
  login: { isAuthenticated: true },
});
const component = create(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Homepage />
    </Provider>
  </MuiThemeProvider>,
);

describe('<Homepage />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
