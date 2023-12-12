// usersService.js
import httpService from './httpService';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export function setAuthToken(token) {
  // Set the token in the Authorization header for future requests
  httpService.setCommonHeader('Authorization', `Bearer ${token}`);
}

export function clearAuthToken() {
  // Remove the token from the Authorization header
  httpService.removeCommonHeader('Authorization');
}

export function createUser(user) {
  return httpService.post('/api/users', user);
}

export async function login(credentials) {
  const response = await httpService.post('/api/auth', credentials);
  const token = response.data.token;
  
  // Store the token in local storage
  localStorage.setItem(TOKEN_KEY, token);

  // Set the token in the Authorization header
  setAuthToken(token);

  return response;
}

export function logout() {
  // Remove the token from local storage
  localStorage.removeItem(TOKEN_KEY);

  // Clear the token from the Authorization header
  clearAuthToken();
}

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// Initialize the Authorization header with the existing token (if available)
setAuthToken(getJWT());

const usersService = {
  createUser,
  login,
  logout,
  getUser,
  getJWT,
};

export default usersService;
