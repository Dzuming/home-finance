import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const history = createHistory();
const routerHistory = routerMiddleware(history);

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, routerHistory)));
}
