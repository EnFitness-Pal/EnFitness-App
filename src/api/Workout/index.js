import axios from "axios";
import { baseURL } from "../../utility";

export function getRandomWorkout(pageNumber, difficulty, search) {
    return axios.get(`${baseURL}/api/work-out?PageNumber=${pageNumber}&PageSize=20&difficulty=${difficulty}`);
}

export function getWorkoutCategories(pageNumber, difficulty, search) { 
    return axios.get(`${baseURL}/api/work-out?PageNumber=${pageNumber}&PageSize=20&difficulty=${difficulty}&exercisename=${search}`);
}