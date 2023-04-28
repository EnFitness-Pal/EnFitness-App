import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    foodIds: [],
    food: [],
    isFetching: false,
    error: false,
}

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        getAllFoodStart: (state) => { 
            state.isFetching = true;
        },
        getAllFoodIdSuccess: (state, action) => { 
            state.foodIds = action.payload;
            state.isFetching = false;
        },
        getAllFoodSuccess: (state, action) => { 
            state.food = action.payload;
            state.isFetching = false;
        },
        getAllFoodFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },
        addFoodStart: (state) => { 
            state.isFetching = true;
        },
        addFoodSuccess: (state, action) => { 
            state.isFetching = false;
            state.food.push(action.payload);
        },
        addFoodFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },
        deleteFoodStart: (state) => { 
            state.isFetching = true;
        },
        deleteFoodSuccess: (state, action) => {
            state.isFetching = false;
            state.food = state.food.filter((food) => food.UserFavoritesId !== action.payload);
        },
        deleteFoodIDSuccess: (state, action) => { 
            state.isFetching = false;
            state.foodIds = state.foodIds.filter((food) => food !== action.payload);
        },
        deleteFoodFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {  getAllFoodStart,
                getAllFoodIdSuccess,
                getAllFoodSuccess,
                getAllFoodFailure,
                addFoodStart,
                addFoodSuccess,
                addFoodFailure,
                deleteFoodStart,
                deleteFoodSuccess,
                deleteFoodIDSuccess,
                deleteFoodFailure } = foodSlice.actions;
export default foodSlice.reducer;