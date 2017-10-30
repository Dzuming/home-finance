import {combineReducers} from 'redux';
import nav from './navReducer';
import user from './userReducer';
import auth from './authReducer';
import financeFlow from './financeFlowReducer';

const rootReducer = combineReducers({nav, auth, user, financeFlow});

export default rootReducer;
