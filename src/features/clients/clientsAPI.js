import axios from "axios";
import requests from "../config/requests";

export function Register(data) {
  return axios
    .post(requests.clientsapi, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

