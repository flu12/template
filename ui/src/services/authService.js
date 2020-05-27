import {LOGIN_TOKEN_STORAGE_KEY} from '../constants/auth'
import http from './httpService'

export const login = async ( token ) => {
  localStorage.setItem(LOGIN_TOKEN_STORAGE_KEY, token);
  http.defaults.headers.common['Authorization'] = token;
};

export const logout = () => {
  localStorage.clear();
  delete http.defaults.headers.common["Authorization"];
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
};

export const getLoginToken = () => {
  return localStorage.getItem(LOGIN_TOKEN_STORAGE_KEY);
};
