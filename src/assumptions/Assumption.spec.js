import React from 'react';
import { create } from 'react-test-renderer';
import Assumption from './Assumption';
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
      <Assumption />
    </Provider>,
  </MuiThemeProvider>,
);

describe('<Assumption />', () => {
  it('should match snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
