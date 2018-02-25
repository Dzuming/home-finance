import * as actions from './loginActions';
import fetchMock from 'fetch-mock';
import expect from 'expect';

describe('login actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should create authenticateUser action with snapshot', () => {
    expect(actions.authenticateUser()).toMatchSnapshot();
  });
});
