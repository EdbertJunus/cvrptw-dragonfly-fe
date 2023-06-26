import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant";
import { refreshAccessToken } from "@/util";
import instance from ".";
import { useRouter } from "next/router";
import axios from "axios";

let startTime;

const onRequest = (config) => {
  // console.info(`[request][${JSON.stringify(config)}]`);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const urlStr = config.url;
  const notAuth = urlStr.includes("login") || urlStr.includes("register");
  startTime = new Date();

  if (accessToken && !notAuth) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onRequestError = (error) => {
  // console.error(`[request error] [${JSON.stringify}]`);
  return Promise.reject(error);
};

const onResponse = (response) => {
  // console.info(response);
  const endTime = new Date();
  const elapsedTime = endTime - startTime;
  console.log(`Request ${response.config.url} took  ${elapsedTime}ms`);
  return response;
};

const onResponseError = async (error) => {
  // console.error(`[response error] [${JSON.stringify(error?.response?.data)}}]`);

  if (error?.response?.status !== 401) {
    return Promise.reject(error);
  }

  const refresh = localStorage.getItem(REFRESH_TOKEN);
  if (!refresh) {
    localStorage.removeItem(REFRESH_TOKEN);
    return Promise.reject(error);
  }

  const originalRequest = error.config;
  const accessToken = await refreshAccessToken();

  originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
  return axios(originalRequest);
};

export const setupInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
