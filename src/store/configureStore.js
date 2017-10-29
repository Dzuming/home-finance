import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const currentYearAndMonth = () => {
  const Today = new Date()
  const currentYear = Today.getFullYear();
  const currentMonth = Today.getMonth() + 1;
  return `${currentYear}-${currentMonth}`;
}
const initialState = {
  login: {
    isAuthenticated: localStorage.getItem('token')
      ? true
      : false
  },
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  financeFlow: {
    selectedDate: currentYearAndMonth()
  }
};
export default function configureStore() {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
