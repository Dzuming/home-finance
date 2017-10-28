import {combineReducers} from 'redux';
import nav from './navReducer';
import login from './loginReducer';
import logout from './logoutReducer';
import user from './userReducer';

const rootReducer = combineReducers({nav, login, logout, user});

export default rootReducer;
