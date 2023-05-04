import axios, { AxiosInstance } from "axios";
import { useLoading } from "../contexts/hooks/Loanding";

interface UItoken {
  token: undefined | string;
}

const useApi = () => {
  const { setLoadingFetch } = useLoading();

  let needsRedirect = false;

  const api: AxiosInstance = axios.create({
    baseURL: "https://invciclicobackend-production.up.railway.app/",
    //baseURL: "http://localhost:3000/",
  });

  const token = localStorage.getItem("@token");

  api.interceptors.request.use(
    (config) => {
      if (token) {
        const _token: UItoken = JSON.parse(token);
        config.headers.authorization = `Bearer ${_token}`;
      }
      setLoadingFetch(true);
      return config;
    },
    (error) => {
      setLoadingFetch(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoadingFetch(false);
      return response;
    },
    async (error) => {
      setLoadingFetch(false);

      if (error.response.status === 401) {
        needsRedirect = true;
      }
      return Promise.reject(error);
    }
  );

  if (needsRedirect) {
    localStorage.clear();
    window.location.href = "/login";
    needsRedirect = false;
  }

  return api;
};

export default useApi;
