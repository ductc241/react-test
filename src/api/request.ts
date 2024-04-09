import axios from "axios";

export const authorizedRequest = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const unAuthorizedRequest = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedRequest.interceptors.request.use(
  (axiosConfig) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
