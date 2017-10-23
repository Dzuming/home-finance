import {combineReducers} from 'redux';
import nav from './navReducer';
import login from './loginReducer';
const rootReducer = combineReducers({nav, login});

export default rootReducer;
