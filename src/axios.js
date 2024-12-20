import axios from 'axios';

// GLOBAL
// export const API_URL = "https://blog-server-iyxb.onrender.com";

// LOCAL
// azenco
export const API_URL = 'http://192.168.1.49:4444';

// home
// export const API_URL = "http://192.168.100.5:4444";

// azercell
// export const API_URL = 'http://192.168.0.182:4444';

const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token') || '';
  return config;
});

export default instance;
