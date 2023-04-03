import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lauch: false,
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setLauch: (state, action) => {
      state.lauch = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLauch } = stateSlice.actions

export default stateSlice.reducer