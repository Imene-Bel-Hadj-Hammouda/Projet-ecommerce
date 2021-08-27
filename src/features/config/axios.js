import axios from "axios";

export const axioswithjwt = axios.create();

axioswithjwt.interceptors.request.use(async (config) => {
  config.headers["x-auth-token"] = localStorage.getItem("token");

  return config;
});