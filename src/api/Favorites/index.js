import axios from "axios";
import { baseURL } from "../../utility";

export function getAllWorkoutFav(id, difficulty) {
    return axios.get(`${baseURL}/api/user-favorites/${id}/workout-favorites?difficulty=${difficulty}`);
}
export function getAllRecipesFav(id) {
    return axios.get(`${baseURL}/api/user-favorites/${id}/recipes-favorites`);
}
export function getAllExerciseFav(id) {
    return axios.get(`${baseURL}/api/user-favorites/${id}/exercise-favorites`);
}

export function addWorkoutFav(id, itemId) { 
    return axios.post(`${baseURL}/api/user-favorites/${id}`, {"WorkOutId": itemId});
}
export function addRecipesFav(id, itemId) { 
    return axios.post(`${baseURL}/api/user-favorites/${id}`, {"RecipeId": itemId});
}
export function addExerciseFav(id, itemId) { 
    return axios.post(`${baseURL}/api/user-favorites/${id}`, {"ExerciseAdminId": itemId});
}

export function deleteUserFav(favoriteId) { 
    return axios.delete(`${baseURL}/api/user-favorites/${favoriteId}`);
}