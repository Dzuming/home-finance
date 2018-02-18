import {combineReducers} from 'redux';
import nav from './navReducer';
import user from './userReducer';
import auth from './authReducer';
import financeFlow from './financeFlowReducer';
import api from './apiReducer';

const rootReducer = combineReducers({nav, auth, user, financeFlow, api});

export default rootReducer;
