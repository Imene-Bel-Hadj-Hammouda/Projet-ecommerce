import { axioswithjwt } from "../config/axios";
import requests from "../config/requests";

export function Create(data) {
  return axioswithjwt
    .post(requests.ordersapi, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetAll() {
  return axioswithjwt
    .get(requests.ordersapi)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function Update(data) {
  return axioswithjwt
    .put(requests.ordersapi+'/'+data.id , data.data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetClientOrders() {
  return axioswithjwt
    .get(requests.ordersapi+'/client')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}