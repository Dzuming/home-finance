export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setStorageUser = setS => {
  localStorage.setItem('user', JSON.stringify(setS));
};

export const getStorageUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
