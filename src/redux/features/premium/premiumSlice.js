import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    premium: false,
}

export const premiumSlice = createSlice({
    name: 'premium',
    initialState,
    reducers: {
        getPremium: (state, action) => { 
            state.premium = action.payload;
        },
        setPremium: (state, action) => {
            state.premium = action.payload;
        },
    }
});

export const { setPremium } = premiumSlice.actions

export default premiumSlice.reducer