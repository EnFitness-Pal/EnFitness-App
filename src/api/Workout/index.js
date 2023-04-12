import axios from "axios";
import { baseURL } from "../../utility";

export function getRandomWorkout(number, difficulty) {
    return axios.get(`${baseURL}/api/work-out?number=${number}&difficulty=${difficulty}`);
}