import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postScore = createAsyncThunk(
    'score/postScore', 
    async () => {
        const response = await fetch('')
        // see if response has the correct status code then json() it
        const jsonResponse = await response.json()
        return jsonResponse
    }
)

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: null,
        results: null,
        isLoading: false
    },
    reducers: {
        addScore: (state,action)=> {
            state.score.score = action.payload
        }
    },
    extraReducers:{
        [postScore.fulfilled]: (state, action) =>{
            state.results = action.payload
            state.isLoading = false
        },
        [postScore.pending]: (state, action) => {
            state.isLoading = true
        },
        [postScore.rejected]: (state,action) => {
            state.isLoading = false
        }
    }
})

export default scoreSlice.reducer
export const {addScore} = scoreSlice.actions
export const selectScore = (state) => state.score