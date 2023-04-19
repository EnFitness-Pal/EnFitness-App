import axios from "axios";
import { RecipeURL,APIKeyRecipe, baseURL } from "../../utility";


export function getRandomRecipes(quantity) {
    return axios.get(`${RecipeURL}/recipes/random?limitLicense=true&number=${quantity}&apiKey=${APIKeyRecipe}`);
}

export function getRecipeById(id) {
    return axios.get(`${RecipeURL}/recipes/informationBulk?ids=${id}&includeNutrition=true&apiKey=${APIKeyRecipe}`);
}

export function getRecipesBySearch(search) {
    return axios.get(`${RecipeURL}/recipes/autocomplete?query=${search}&apiKey=${APIKeyRecipe}`);
}

export function addTrackingRecipe(id, meal, name, calories, carbs, fat, protein) {
    return axios.post(`${baseURL}/api/tracking-calories/${id}`,
        {
            "Meal": meal,
            "ProductName": name,
            "Calories": calories,
            "Carbs": carbs,
            "Fat": fat,
            "Protein": protein,
            "ServingSize": 1,
            "TrackingDate": new Date().toISOString()
        });
}