import { axioswithjwt } from "../config/axios";
import requests from "../config/requests";

export function Create(data) {
  return axioswithjwt
    .post(requests.categoriesapi, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}


export function GetAll() {
  return axioswithjwt
    .get(requests.categoriesapi)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function Delete(id) {
  console.log(id);
  return axioswithjwt
    .delete(requests.categoriesapi+'/'+id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}