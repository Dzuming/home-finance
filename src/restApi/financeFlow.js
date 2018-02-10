import env from '../../environments/config';
import { getAuthToken } from '../helpers/LocalStorage';
import { financeFlowSpendingToServerMapper } from '../helpers/Mappers';

export function fetchFinanceSpendingFromServer (userId, selectedDate) {
  const url = `${env.api_url}/api/spending/${userId}/${selectedDate}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    }
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

export function postFinanceSpendingToServer (data) {
  const url = `${env.api_url}/api/spending`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(financeFlowSpendingToServerMapper(data))
  }).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

export function deleteFinanceSpendingFromServer (id) {
  const url = `${env.api_url}/api/spending/${id}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

export function editFinanceSpendingFromServer (payload) {
  const url = `${env.api_url}/api/spending/${payload.id}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(financeFlowSpendingToServerMapper(payload.items))
  }).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}


