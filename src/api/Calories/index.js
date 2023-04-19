import axios from "axios";
import { baseURL } from "../../utility";


export function getTotalTracking(id, date) { 
    return axios.get(`${baseURL}/api/total-tracking?personId=${id}&trackingDate=${date}`);
}

export function getStatisticCalories(id, date) {
    return axios.get(`${baseURL}/api/total-tracking/statistic?personId=${id}&trackingDate=${date}`);
}