import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
    baseURL: 'https://brener.dev/api',
  });

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const token = await AsyncStorage.getItem('token');

    // Send the refresh token to the backend for refreshing the token
    const response = await axios.post('/refresh-token', {"token": refreshToken},{headers:{
      Authorization: `Bearer ${token}`
    }})
    if (response.data.valid) {
      // Save the new token
      await AsyncStorage.setItem('token', response.data.token);
      // retry the original request
      return instance(originalRequest);
    } else {
      // Invalid refresh token
      // handle the error
    }
  }
  return Promise.reject(error);
});

export default instance;
