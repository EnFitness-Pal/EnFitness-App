import axios from "axios";
import { baseURL } from "../../utility";
import moment from "moment-timezone";
export function getDailyTrackingFood(id, date) {
    return axios.get(`${baseURL}/api/tracking-calories?personId=${id}&trackingDate=${date}`);
}

export function getDailyTrackingExercise(id, date) { 
    return axios.get(`${baseURL}/api/tracking-exercise?personId=${id}&trackingDate=${date}`);
}

export function trackingExercise(personId, name, calo, min) {
    return axios.post(`${baseURL}/api/tracking-exercise/${personId}`, {
        "ExerciseName": name,
        "Calories": calo,
        "Minutes": min,
        "TrackingDate": moment().tz('Asia/Ho_Chi_Minh').toISOString()
    });
}

export function getExerciseAdmin() {
    return axios.get(`${baseURL}/api/exercise-admin?PageNumber=1&PageSize=5`);
}