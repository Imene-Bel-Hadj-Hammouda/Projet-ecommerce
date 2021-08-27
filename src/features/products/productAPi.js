import { axioswithjwt } from "../config/axios";

import requests from "../config/requests";

export function Create(data) {
  return axioswithjwt
    .post(requests.productsapi, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetAll() {
  return axioswithjwt
    .get(requests.productsapi)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
