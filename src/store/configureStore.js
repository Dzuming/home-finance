import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const history = createHistory();
const middleware = routerMiddleware(history);

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
}
