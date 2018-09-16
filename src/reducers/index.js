import { combineReducers } from 'redux';
import nav from './navReducer';
import user from './userReducer';
import login from './loginReducer';
import financeFlow from './financeFlowReducer';
import api from './apiReducer';
import budget from './budgetReducer';
import revenue from './revenueReducer';
import period from './periodReducer';
import assumptions from './assumptionReducer';

const rootReducer = combineReducers({
  nav,
  login,
  user,
  financeFlow,
  api,
  budget,
  revenue,
  period,
  assumptions
});

export default rootReducer;
