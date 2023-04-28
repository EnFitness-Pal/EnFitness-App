import { addRecipesFav, deleteUserFav, getAllRecipesFav } from "../../../api/Favorites";
import { getRecipesByIDs } from "../../../api/Recipes";
import { addFoodFailure, addFoodStart, addFoodSuccess, deleteFoodFailure, deleteFoodIDSuccess, deleteFoodStart, deleteFoodSuccess, getAllFoodFailure, getAllFoodIdSuccess, getAllFoodStart, getAllFoodSuccess } from "../../features/favorites/foodSlice";

export const getAllFoodFav = async (dispatch, id) => { 
    dispatch(getAllFoodStart());
    await getAllRecipesFav(id)
        .then(async(res) => {
            const recipeIds = res.data?.Recipes.map(recipe => recipe.RecipeId);
            await getRecipesByIDs(recipeIds.join(",")).
                then((res) => { 
                    dispatch(getAllFoodIdSuccess(res.data));
                })
                .catch((err) => { 
                    console.log(err.response.data);
                })
            dispatch(getAllFoodSuccess(res.data?.Recipes));
        })
        .catch((err) => { 
            dispatch(getAllFoodFailure());
        });
}

export const addFoodFav = async (dispatch, id, item) => { 
    dispatch(addFoodStart());
    await addRecipesFav(id, item)
        .then((res) => {
            dispatch(addFoodSuccess(res.data?.RecipeId));
        })
        .catch((err) => { 
            dispatch(addFoodFailure());
        });
}

export const deleteFoodFav = async (dispatch, item, itemid) => { 
    dispatch(deleteFoodStart());
    await deleteUserFav(item)
    .then((res) => {
        dispatch(deleteFoodSuccess(item));
        dispatch(deleteFoodIDSuccess(itemid));
    })
    .catch((err) => {
        dispatch(deleteFoodFailure());
    });
}