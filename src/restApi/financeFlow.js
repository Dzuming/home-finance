import env from '../../environments/config';
import { getAuthToken } from '../helpers/LocalStorage';

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
