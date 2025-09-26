import axios from 'axios';
import Cookies from 'js-cookie';
// import { showSessionModal } from '../pages/Login';

const iptvApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

function isOngoingMaintenance(status: number) {
  if (status === 401) {
  //   // showSessionModal();
  //   window.location.href = '/login';
  }
}

iptvApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    isOngoingMaintenance(error.response?.status);

    return Promise.reject(error);
  },
);

iptvApi.interceptors.response.use(
  (response) => {
    isOngoingMaintenance(response.data);

    return response;
  },
  (error) => {
    isOngoingMaintenance(error.response?.status);

    return Promise.reject(error);
  },
);

export default iptvApi;
