import env from '../../environments/config';
import { getAuthToken } from '../helpers/LocalStorage';

export function getCategories () {
  const url = `${env.api_url}/api/categories`;
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
