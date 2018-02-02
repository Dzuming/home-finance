import { fetchFinanceFlow } from '../src/restApi/financeFlow';
import fetchMock from 'fetch-mock';
import env from '../environments/config';

describe('flow finance methods', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should get specific finance flow data', () => {
    let body = [{
      spending: 32,
      category: 'jedzenie'
    },
      {
        spending: 40,
        category: 'ubrania'
      },
      {
        spending: 0,
        category: 'rachunki'
      }];

    fetchMock
      .getOnce(`${env.api_url}/Spending/id/date`, {body, headers: {'content-type': 'application/json'}});
    return fetchFinanceFlow('id', 'date').then(response => {
      expect(response[1].spending).toBe(40);
      expect(response[2].spending).toBe(0);
      expect(response[2].category).toBe('rachunki');
    });

  });
});
