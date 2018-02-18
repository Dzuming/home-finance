import reducer from './apiReducer';
import { apiRequestPending, apiRequestSuccess } from '../actions/apiActions';

describe('api action', () => {
  it('should set api request pending', () => {
    expect(reducer([], apiRequestPending())).toMatchSnapshot();
  });

  it('should set api request success', () => {
    expect(reducer([], apiRequestSuccess())).toMatchSnapshot();
  });
});
