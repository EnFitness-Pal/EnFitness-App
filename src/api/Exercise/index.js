import axios from "axios";
import { baseURL } from "../../utility";


export function getAllExercise(text) {
    return axios.get(`${baseURL}/api/exercise-admin?PageNumber=1&PageSize=20&exerciseName=${text}`);
}