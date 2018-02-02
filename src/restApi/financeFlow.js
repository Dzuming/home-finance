import env from '../../environments/config';
import { getAuthToken } from '../helpers/LocalStorage';
import {getFinanceFlowToSend} from '../helpers/Mappers'

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
    method: 'POST', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(getFinanceFlowToSend(data))
  }).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}


