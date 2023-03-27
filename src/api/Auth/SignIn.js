import axios from "axios";
import { baseURL } from "../../utility";
export function signIn(username, password) {
  return axios.post(`${baseURL}/api/auth/login`, { 'EmailAddress':username, 'Password':password });
}