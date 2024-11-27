import axios from "axios";

export const API_URL = "https://blog-server-iyxb.onrender.com";
// export const API_URL = "http://localhost:4444";

const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token") || "";
  return config;
});

export default instance;
