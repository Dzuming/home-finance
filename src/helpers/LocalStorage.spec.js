import { setAuthToken, getAuthToken, setUser, getUser } from './LocalStorage';

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
    setUser(user);
    expect(getUser()).toEqual(user);
  });
});
