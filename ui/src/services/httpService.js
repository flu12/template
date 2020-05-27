import axios from 'axios';
import { LOGIN_TOKEN_STORAGE_KEY } from '../constants/auth';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});


const storedToken = localStorage.getItem(LOGIN_TOKEN_STORAGE_KEY);

if (!!storedToken) {
  http.defaults.headers.common['Authorization'] = storedToken;
}

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data.error ? error.response.data.error : error.response.data);
    } else {
      return Promise.reject({ message: 'Server error' });
    }
  }
);

export default http;

