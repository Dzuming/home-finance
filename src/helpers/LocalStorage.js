export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  return localStorage.removeItem('token');
};
export const setStorageUserPromise = (user) => (
  new Promise((resolve) => {
    resolve(setStorageUser(user)
    );
  }));

export const setStorageUser = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getStorageUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const removeStorageUser = () => {
  return localStorage.removeItem('user');
};
