import axios from "axios";

const API_URL = "https://blog-server-iyxb.onrender.com";

const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token") || "";
  return config;
});

export default instance;
