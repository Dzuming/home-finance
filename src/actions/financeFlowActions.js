import * as types from './actionTypes';
import env from '../../environments/config';

function successFinanceFlow(data) {
  return {type: types.SUCCESS_FINANCE_FLOW, data};
}

function fetchFinanceFlow(userId, selectedDate) {
  const url = `${env.api_url}/Spending/${userId}/${selectedDate}`;
  return dispatch => {
    return fetch(url, {method: 'GET'}).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(successFinanceFlow(data));
    }).catch((error => error));
  };
}
export function getFinanceFlow() {
  // Note that the function also receives getState() which lets you choose what to
  // dispatch next. This is useful for avoiding a network request if a cached
  // value is already available.
  return (dispatch, getState) => {

    const userId = getState().user.id;
    const selectedDate = getState().financeFlow.selectedDate;
    // Dispatch a thunk from thunk!
    return dispatch(fetchFinanceFlow(userId, selectedDate));
  };
}
export function setDate(date) {
  return {type: types.SET_DATE, date};
}
