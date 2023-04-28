import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favorite: [],
    isFetching: false,
    error: false,
}

export const favSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        getAllFavStart: (state) => {
            state.isFetching = true;
        },
        getAllFavSuccess: (state, action) => {
            state.favorite = action.payload;
            state.isFetching = false;
        },
        getAllFavFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        addFavStart: (state) => {
            state.isFetching = true;
        },
        addFavSuccess: (state, action) => {
            state.isFetching = false;
            state.favorite.push(action.payload);
        },
        addFavFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deleteFavStart: (state) => {
            state.isFetching = true;
        },
        deleteFavSuccess: (state, action) => {
            state.isFetching = false;
            state.favorite = state.favorite.filter((fav) => fav.UserFavoritesId !== action.payload);
        },
        deleteFavFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {  getAllFavStart,
                getAllFavSuccess,
                getAllFavFailure, 
                addFavStart,
                addFavSuccess, 
                addFavFailure, 
                deleteFavStart, 
                deleteFavSuccess,
                deleteFavFailure } = favSlice.actions;
export default favSlice.reducer;
