import {createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = { 
  login: {isAuthenticated:  localStorage.getItem('token') ? true : false}
};
export default function configureStore() {
  return createStore(rootReducer, initialState,  composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
