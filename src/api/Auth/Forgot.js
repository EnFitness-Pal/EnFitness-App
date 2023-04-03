import axios from "axios";
import { baseURL } from "../../utility";

export function forgot(email) {
  return axios.post(`${baseURL}/api/account/forgot-password/${email}`);
}

export function verify(code) {
  return axios.post(`${baseURL}/api/account/verify-pin?verifyPin=${code}`);
}

export function confirm(code, password, rePassword) { 
  return axios.post(`${baseURL}/api/account/reset-password`, {
    "Code": code,
    "Password": password,
    "ConfirmPassword": rePassword
  });
}

