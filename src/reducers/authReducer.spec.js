import authReducer from './authReducer';
import * as types from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      authReducer([], {
        type: types.AUTH_USER,
      })
    ).toEqual(
      {
        isAuthenticated: true
      });
  });
});
