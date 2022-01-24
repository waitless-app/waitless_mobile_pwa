import axios from "axios";
import { API_URL } from "../utils/config";

const AuthService = {
  login(params) {
    return axios.post(`${API_URL}user/token/`, params);
  },
  register(params) {
    return axios.post(`${API_URL}user/create/`, params);
  },
  refresh(resource, params) {
    return axios.post(`${API_URL}user/token/refresh`, params);
  },
};

export default AuthService;
