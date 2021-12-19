import axios from 'axios';
import { API_URL } from '../utils/config';
import { getItem, removeItem } from '../utils/localstorage';
import router from '../router';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await getItem('access_token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);
instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    removeItem('access_token');
    router.push('login');
  } else {
    return Promise.reject(error);
  }
  return null;
});

export default instance;
