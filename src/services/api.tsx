import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useLoading } from "../contexts/hooks/Loanding";

const api = axios.create({
  baseURL: "https://invciclicobackend-production.up.railway.app/",
  //baseURL: "http://localhost:3333/",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = JSON.parse(localStorage.getItem("@token") as string);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
