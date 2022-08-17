import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateScoreDB = createAsyncThunk(
    'user/updateScoreDB',
    async (score) => {
        try {
            const response = await fetch('/api/users/updateScore', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({score: score})
              })
            const jsonResponse = await response.json()
            if (response.status === 200) {
                return jsonResponse 
            }   
        } catch (error) {
            console.log(error)
        }

    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: false,
        isError: false
    },
    reducers: {
        addUser: (state,action) => {
            state.user = action.payload
        },
        startLoading: (state, action) => {
            state.isLoading = true
        },
        stopLoading: (state,action) => {
            state.isLoading = false
        }
    }, extraReducers: {
        [updateScoreDB.fulfilled]: (state,action) => {
            state.isLoading = false
            state.user = action.payload
            state.isError = false
        },
        [updateScoreDB.pending]: (state,action) => {
            state.isLoading = true
            state.isError = false
        },
        [updateScoreDB.rejected]: (state, action) => {
            state.isError = true
            state.isLoading = false
        }
    }
})

export default userSlice.reducer
export const {addUser, startLoading, stopLoading} = userSlice.actions
export const selectUser = (state) => state.user.user
export const selectUserState = (state) => state.user