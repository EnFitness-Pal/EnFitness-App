import axios from "axios";
import { RecipeURL,APIKeyRecipe } from "../../utility";


export function getRandomRecipes(quantity) {
    return axios.get(`${RecipeURL}/recipes/random?limitLicense=true&number=${quantity}&apiKey=${APIKeyRecipe}`);
}