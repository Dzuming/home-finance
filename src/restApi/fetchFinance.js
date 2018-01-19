import env from '../../environments/config'

export function fetchFinanceFlow (userId, selectedDate) {
  const url = `${env.api_url}/Spending/${userId}/${selectedDate}`
  return fetch(url, {method: 'GET'}).then(response => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
}
