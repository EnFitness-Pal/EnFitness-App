import axios from "axios";
import { baseURL } from "../../utility";

export function getPerson(id) { 
    return axios.get(`${baseURL}/api/account/user/${id}`);
}