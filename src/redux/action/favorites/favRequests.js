import { getAllExerciseFav } from "../../../api/Favorites";
import { addFavFailure, addFavStart, addFavSuccess, deleteFavFailure, deleteFavStart, deleteFavSuccess, getAllFavFailure, getAllFavStart, getAllFavSuccess } from "../../features/favorites/favSlice"
import { addExerciseFav } from "../../../api/Favorites";
import { deleteUserFav } from "../../../api/Favorites";


export const getAllFav = async (dispatch, id) => { 
    dispatch(getAllFavStart());
    await getAllExerciseFav(id)
        .then((res) => {
            dispatch(getAllFavSuccess(res.data?.Exercise));
        })
        .catch((err) => { 
            dispatch(getAllFavFailure());
        });
}

export const addFav = async (dispatch, id, item) => { 
    dispatch(addFavStart());
    await addExerciseFav(id, item)
        .then((res) => {
            // dispatch(addFavSuccess(res.data));
        })
        .catch((err) => { 
            dispatch(addFavFailure());
        });
}

export const deleteFav = async (dispatch, item) => { 
    dispatch(deleteFavStart());
    await deleteUserFav(item)
    .then((res) => {
        dispatch(deleteFavSuccess(item));
    })
    .catch((err) => {
        dispatch(deleteFavFailure());
    });
}