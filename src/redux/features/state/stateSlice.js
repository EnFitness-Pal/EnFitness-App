import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lauch: false,
  theme: 'dark',
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setLauch: (state, action) => {
      state.lauch = action.payload;
    },
    setTheme: (state, action) => { 
      state.theme = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLauch, setTheme } = stateSlice.actions

export default stateSlice.reducer