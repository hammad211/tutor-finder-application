import axios from 'axios';
import API_BASE_URL from '../config';
import { logout } from './auth/service';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let lastTokenRefreshTime = Math.floor(Date.now() / 1000);
let isRefreshing = false;
let activityTimeout;

const ACTIVITY_TIMEOUT = 28 * 60 * 1000;  // 28 minutes
const INACTIVITY_THRESHOLD = 28 * 60 * 1000;

const refreshToken = async () => {
  try {
    const response = await api.post('/users/refreshToken', { refreshToken: getAuthToken() });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  } finally {
    isRefreshing = false;
  }
};

const handleUserActivity = () => {
  clearTimeout(activityTimeout);
  resetActivityTimeout();
};

const resetActivityTimeout = () => {
  clearTimeout(activityTimeout);
  activityTimeout = setTimeout(async () => {
    try {
      if (isUserActive()) {
        console.log('Calling refreshToken after 28 minutes of activity');
        await refreshToken();
        lastTokenRefreshTime = Math.floor(Date.now() / 1000);
        console.log('Token refreshed successfully.');
      } else {
        console.log('User inactive for less than 28 minutes. Resetting activity timeout.');
        logout();
      }
    } catch (refreshError) {
      console.error('Error during token refresh:', refreshError);
      window.location.href = "/authPage/login/student";
      throw refreshError;
    } finally {
      resetActivityTimeout();
    }
  }, ACTIVITY_TIMEOUT);
};

const shouldRefreshToken = () => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime - lastTokenRefreshTime >= INACTIVITY_THRESHOLD;
};

const isUserActive = () => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime - lastTokenRefreshTime < INACTIVITY_THRESHOLD;
};

api.interceptors.request.use(async (config) => {
  const authToken = getAuthToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  if (authToken && shouldRefreshToken() && !isRefreshing) {
    isRefreshing = true;

    try {
      const newToken = await refreshToken();
      config.headers.Authorization = `Bearer ${newToken}`;
      console.log('Token refresh in request interceptor successful.');
      resetActivityTimeout();
    } catch (refreshError) {
      console.error('Error during token refresh in request interceptor:', refreshError);
      window.location.href = "/login";
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  } else {
    resetActivityTimeout();
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data === "Token expired") {
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const apiService = {
  request: async (method, url, data = null) => {
    try {
      const response = await api({
        method,
        url,
        data,
      });

      if (response.status >= 400) {
        console.error(`Error in ${method} request to ${url}:`, response.data);
        throw new Error(response.data);
      }

      return response.data;
    } catch (error) {
      console.error(`Error making ${method} request to ${url}:`, error);
      throw error;
    }
  },
};

document.addEventListener('mousemove', handleUserActivity);
document.addEventListener('keydown', handleUserActivity);
document.addEventListener('touchstart', handleUserActivity);

export default apiService;
