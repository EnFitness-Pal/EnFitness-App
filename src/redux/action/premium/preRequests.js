

export const getPremium = async (dispatch, id) => { 
    dispatch(getAllFavStart());
    await getAllExerciseFav(id)
        .then((res) => {
            dispatch(getAllFavSuccess(res.data?.Exercise));
        })
        .catch((err) => { 
            dispatch(getAllFavFailure());
        });
}