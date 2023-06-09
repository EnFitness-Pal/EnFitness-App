import axios from "axios";
import { baseURL } from "../../utility";

export function getRankingPerson(id) {
    return axios.get(`${baseURL}/api/ranking/detail-person/${id}`);
}

export function getAllRank(id){
    return axios.get(`${baseURL}/api/ranking`)
}