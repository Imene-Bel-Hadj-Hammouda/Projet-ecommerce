import { axioswithjwt } from "../config/axios";
import axios from 'axios'
import requests from "../config/requests";

export function Login(data) {
  return axios
    .post(requests.usersapi+'/login', data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetUsers() {
  return axioswithjwt
    .get(requests.usersapi)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function DeleteUser(id) {
  return axioswithjwt
    .delete(requests.usersapi + "/" + id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function UploadAvatar(data) {
  return axioswithjwt
    .put(requests.usersapi + "/uploadavatar", data )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function GetMe() {
  return axioswithjwt
    .get(requests.usersapi + "/me" )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}