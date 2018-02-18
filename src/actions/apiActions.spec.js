import * as actions from './apiActions';
import expect from 'expect';

describe('api actions', () => {
  it('should create API_REQUEST_PENDING action with snapshot', () => {
    expect(actions.apiRequestPending()).toMatchSnapshot();
  });

  it('should create API_REQUEST_SUCCESS action with snapshot', () => {
    expect(actions.apiRequestSuccess()).toMatchSnapshot();
  });
});
