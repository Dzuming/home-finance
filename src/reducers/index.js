import {combineReducers} from 'redux';
import nav from './navReducer';
import user from './userReducer';
import login from './loginReducer';
import financeFlow from './financeFlowReducer';
import api from './apiReducer';
import budget from './budgetReducer';

const rootReducer = combineReducers({nav, login, user, financeFlow, api, budget});

export default rootReducer;
