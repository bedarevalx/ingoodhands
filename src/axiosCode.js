import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://polar-eyrie-91847.herokuapp.com',
});

instance.interceptors.request.use((config) => {
  if ('Authorization' in config.headers) return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'access_token',
  )}`;
  return config;
});
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.post(
        'https://polar-eyrie-91847.herokuapp.com/api/auth/refresh',
        {
          refresh_token: localStorage.getItem('refresh_token'),
        },
      );
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      originalRequest.headers['Authorization'] = response.data.access_token;
      return instance.request(originalRequest);
    }
  },
);

export default instance;
