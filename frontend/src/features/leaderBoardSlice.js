import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/fetchLeaderboard',
    async () => {
        // fetch from users and oath collection
        const response = await fetch('')
        // see if response has the correct status code then json() it
        const jsonResponse = await response.json()
        return jsonResponse
    }
)

export const leaderBoardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        leaderboard: [],
        isLoading: false
    },
    reducers: {
        clearLeaderboards: (state, action) => {
            state.leaderboard = []
        }
    },
    extraReducers: {
        [fetchLeaderboard.fulfilled]: (state,action) => {
            state.leaderboard = action.payload
            // ensure action.payload has the right content
            state.isLoading = false
        },
        [fetchLeaderboard.pending]: (state,action) => {
            state.isLoading = true
            // incorporate clearLeaderboards. Used when first loaded or page is refreshed
        },
        [fetchLeaderboard.rejected]: (state,action) => {
            state.isLoading = false
        }
    }
})

export default leaderBoardSlice.reducer
export const {clearLeaderboards} = leaderBoardSlice.actions
export const selectLeaderBoards = (state) => state.leaderboard