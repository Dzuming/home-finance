import env from '../../environments/config';
import { getAuthToken } from '../helpers/LocalStorage';
import { financeFlowSpendingToServerMapper } from '../helpers/Mappers';


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


