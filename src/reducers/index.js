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
import draggedAssumptions from './draggedAssumptionsReducer';

const rootReducer = combineReducers({
  nav,
  login,
  user,
  financeFlow,
  api,
  budget,
  revenue,
  period,
  assumptions,
  draggedAssumptions
});

export default rootReducer;
