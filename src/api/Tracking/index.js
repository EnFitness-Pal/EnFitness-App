import axios from "axios";
import { baseURL } from "../../utility";

export function getDailyTrackingFood(id, date) {
    return axios.get(`${baseURL}/api/tracking-calories?personId=${id}&trackingDate=${date}`);
}

export function getDailyTrackingExercise(id, date) { 
    return axios.get(`${baseURL}/api/tracking-exercise?personId=${id}&trackingDate=${date}`);
}