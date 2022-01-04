import { getItem } from './localstorage';

// export const API_URL = 'http://vps-ddebb6d7.vps.ovh.net:8000/api/';
export const API_URL = 'http://localhost:8000/api/';
export const WS_URL = `ws://localhost:8000/notification/?token=${getItem('access_token')}`;
