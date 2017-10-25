import {combineReducers} from 'redux';
import nav from './navReducer';
import login from './loginReducer';
import logout from './logoutReducer';
const rootReducer = combineReducers({nav, login, logout});

export default rootReducer;
