import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from '../middlewares/apiMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { yearMonthFormatDate } from '../helpers/format';

const initialState = {
  login: {
    isAuthenticated: !!localStorage.getItem('token'),
  },
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  financeFlow: {
    categories: [],
    spending: [],
    profit: [],
  },
  api: {
    loading: 0,
  },
  budget: 0,
  revenue: 0,
  period: yearMonthFormatDate,
  assumptions: {
    monthly: [],
    overall: [],
  },
};
export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, apiMiddleware, authMiddleware),
    ),
  );
}
