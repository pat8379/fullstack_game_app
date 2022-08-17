import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
        results: null,
        isLoading: false
    },
    reducers: {
        addScore: (state,action)=> {
            state.score = action.payload
        }
    }
})

export default scoreSlice.reducer;
export const {addScore} = scoreSlice.actions
export const selectScore = (state) => state.score