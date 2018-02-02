import * as types from './actionTypes';
import env from '../../environments/config';
import { fetchFinanceSpendingFromServer } from '../restApi/financeFlow';

function successFinanceFlow (data) {
  return {type: types.SUCCESS_FINANCE_FLOW, data};
}

function fetchFinanceFlow (userId, selectedDate) {
  return dispatch => {
    return fetchFinanceSpendingFromServer(userId, selectedDate)
      .then((data) => {
        dispatch(successFinanceFlow(data));
      }).catch((error => error));
  };
}

function postFinanceFlow (data) {
  const url = `${env.api_url}/api/spending`;
  return dispatch => {
    return fetch(url, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(getFinanceFlowToSend(data))
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(successFinanceFlow(data));
    }).catch((error => error));
  };
}

const getFinanceFlowToSend = (data) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  return {
    categoryId: '59f0efc7407b78332878b47a',
    userId: currentUser.id,
    spending: data.spending,
    description: data.description,
    dateCreated: data.dateCreated
  };
};

export function getFinanceFlow () {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    const selectedDate = getState().financeFlow.selectedDate;
    return dispatch(fetchFinanceFlow(userId, selectedDate));
  };
}

export function setFinanceFlow (data) {
  return (dispatch) => {
    return dispatch(postFinanceFlow(data));
  };
}

export function setDate (date) {
  return {type: types.SET_DATE, date};
}
