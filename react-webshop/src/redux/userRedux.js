import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.error = false
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload.data
        },
        registerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        registerSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = false
        },
        registerFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload.data
        },
        logout: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout} = userSlice.actions
export default userSlice.reducer