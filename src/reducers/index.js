import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import nav from './navReducer';
import login from './loginReducer';
const rootReducer = combineReducers({nav,login, router: routerReducer});

export default rootReducer;
