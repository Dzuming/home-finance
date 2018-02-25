import {combineReducers} from 'redux';
import nav from './navReducer';
import user from './userReducer';
import login from './loginReducer';
import financeFlow from './financeFlowReducer';
import api from './apiReducer';

const rootReducer = combineReducers({nav, login, user, financeFlow, api});

export default rootReducer;
