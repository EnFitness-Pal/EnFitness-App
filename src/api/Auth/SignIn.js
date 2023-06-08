import axios from "axios";
import { baseURL } from "../../utility";

export function signIn(username, password) {
  return axios.post(`${baseURL}/api/auth/login`, { 'EmailAddress':username, 'Password':password });
}

export function getAllUsers() {
  
  return axios.get(`${baseURL}/api/account`);
}

export function TriggerCount(id) {
  return axios.put(`${baseURL}/api/history/reset-count/${id}`);
}

export function TriggerCountMeal(id) {
  return axios.put(`${baseURL}/api/history/trigger-meal-count/${id}`);
}