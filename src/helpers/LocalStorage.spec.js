import {
  setAuthToken,
  getAuthToken,
  setStorageUser,
  getStorageUser,
} from './LocalStorage';

describe('localStorage methods', () => {
  it('should get token from localStorage', () => {
    setAuthToken('testsToken123456');
    expect(getAuthToken()).toEqual('testsToken123456');
  });

  it('should get user from localStorage', () => {
    const user = {
      id: 1,
      name: 'test',
    };
    setStorageUser(user);
    expect(getStorageUser()).toEqual(user);
  });
});
