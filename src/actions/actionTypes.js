const asyncActionType = (type) => ({
  PENDING: `${type}_PENDING`,
  SUCCESS: `${type}_SUCCESS`,
  ERROR: `${type}_ERROR`,
});

export const OPEN_SIDENAV = 'OPEN_SIDENAV';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const AUTH_USER = 'AUTH_USER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT';
export const REQUEST_USER = 'SUCCESS_LOGOUT';
export const GET_USER = 'SET_USER';
export const SET_USER = 'SET_USER';
export const REMOVE_SPENDING = 'REMOVE_SPENDING';
export const REMOVE_PROFIT = 'REMOVE_PROFIT';
export const EDIT_SPENDING = 'EDIT_SPENDING';
export const SET_DATE = 'SET_DATE';
export const API_REQUEST_GET = 'API_REQUEST_GET';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SPENDING = 'SET_SPENDING';
export const SET_PROFIT = 'SET_PROFIT';
export const API_REQUEST_POST = 'API_REQUEST_POST';
export const API_REQUEST_DELETE = 'API_REQUEST_DELETE';
export const API_REQUEST_PUT = 'API_REQUEST_PUT';
export const ADD_SPENDING = 'ADD_SPENDING';
export const ADD_PROFIT = 'ADD_PROFIT';
export const API_REQUEST = asyncActionType('API_REQUEST');
