import axios from "axios";
import { RecipeURL,APIKeyRecipe } from "../../utility";


export function getRandomRecipes(quantity) {
    return axios.get(`${RecipeURL}/recipes/random?limitLicense=true&number=${quantity}&apiKey=${APIKeyRecipe}`);
}

export function getRecipeById(id) {
    return axios.get(`${RecipeURL}/recipes/informationBulk?ids=${id}&includeNutrition=true&apiKey=${APIKeyRecipe}`);
}