import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeaderboard = createAsyncThunk(
    'leaderboard/fetchLeaderboard',
    async () => {
        try {
            // fetch from users and oath collection
            const response = await fetch('/api/users/leaderboard')
            // see if response has the correct status code then json() it
            const jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error)
        }

    }
)

export const leaderBoardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        leaderboard: null,
        isLoading: false,
        isError: null
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
            state.isError = null
        },
        [fetchLeaderboard.pending]: (state,action) => {
            state.isLoading = true
            state.isError = null
            // incorporate clearLeaderboards. Used when first loaded or page is refreshed
        },
        [fetchLeaderboard.rejected]: (state,action) => {
            state.isLoading = false
            state.isError = 'Could not load Leaderboards'
        }
    }
})

export default leaderBoardSlice.reducer;
export const {clearLeaderboards} = leaderBoardSlice.actions
export const selectLeaderBoards = (state) => state.leaderboard.leaderboard
export const selectGeneralLB = (state) => state.leaderboard