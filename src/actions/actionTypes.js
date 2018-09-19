const asyncActionType = type => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`
});

const crudActionType = type => ({
  CREATE: `CREATE_${type}`,
  READ: `READ_${type}`,
  UPDATE: `UPDATE_${type}`,
  DELETE: `DELETE_${type}`
});

const draggedElements = type => ({
  READ: `READ_${type}`,
  SELECT: `SELECT${type}`,
  RESET: `RESET_${type}`,
  REMOVE: `REMOVE_${type}`
});

export const OPEN_SIDENAV = 'OPEN_SIDENAV';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const SET_USER = 'SET_USER';
export const SET_DATE = 'SET_DATE';
export const API_REQUEST_GET = 'API_REQUEST_GET';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const API_REQUEST_POST = 'API_REQUEST_POST';
export const API_REQUEST_DELETE = 'API_REQUEST_DELETE';
export const API_REQUEST_PUT = 'API_REQUEST_PUT';
export const API_REQUEST = asyncActionType('API_REQUEST');
export const SPENDING_CRUD = crudActionType('SPENDING');
export const PROFIT_CRUD = crudActionType('PROFIT');
export const BUDGET_CRUD = crudActionType('BUDGET');
export const REVENUE_CRUD = crudActionType('REVENUE');
export const ASSUMPTION_CRUD = crudActionType('ASSUMPTION');
export const OVERALL_ASSUMPTIONS_CRUD = crudActionType('OVERALL_ASSUMPTIONS');
export const ASSUMPTION_TYPES = draggedElements('ASSUMPTION_TYPES');
export const CATEGORIES_DRAG = draggedElements('CATEGORIES');
