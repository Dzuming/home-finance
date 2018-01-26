import { setAuthToken, getAuthToken } from './LocalStorage';

describe('localStorage methods', () => {
  it('should get token from localStorage', () => {
    setAuthToken('testsToken123456');
    expect(getAuthToken()).toEqual('testsToken123456');
  });
});
