import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    premium: [],
    isPremium: false,
    isFetching: false,
    error: false,
}

export const premiumSlice = createSlice({
    name: 'premium',
    initialState,
    reducers: {
        getPremiumStart: (state) => { 
            state.isFetching = true;
        },
        getPremiumSuccess: (state, action) => { 
            state.premium = action.payload;
            state.isFetching = false;
        },
        getPremiumFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },
        updatePremiumStart: (state) => { 
            state.isFetching = true;
        },
        updatePremiumSuccess: (state, action) => { 
            state.isFetching = false;
            state.premium = action.payload;
            state.isPremium = true;
        },
        updatePremiumFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },
        restorePremiumStart: (state) => { 
            state.isFetching = true;
        },
        restorePremiumSuccess: (state, action) => { 
            state.isFetching = false;
            state.premium = [];
            state.isPremium = false;
        },
        restorePremiumFailure: (state) => { 
            state.isFetching = false;
            state.error = true;
        },


    }
});

export const { getPremiumStart,
                getPremiumSuccess,
                getPremiumFailure,
                updatePremiumStart,
                updatePremiumSuccess,
                updatePremiumFailure,
                restorePremiumStart,
                restorePremiumSuccess,
                restorePremiumFailure} = premiumSlice.actions

export default premiumSlice.reducer