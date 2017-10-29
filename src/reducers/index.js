import {combineReducers} from 'redux';
import nav from './navReducer';
import login from './loginReducer';
import logout from './logoutReducer';
import user from './userReducer';
import financeFlow from './financeFlowReducer';

const rootReducer = combineReducers({nav, login, logout, user, financeFlow});

export default rootReducer;
