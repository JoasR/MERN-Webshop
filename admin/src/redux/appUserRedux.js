import { createSlice } from "@reduxjs/toolkit"

export const appUserSlice = createSlice({
    name: "appUser",
    initialState: {
        appUsers: [],
        isFetching: false,
        error: false,
        message: null
    },
    reducers: {
        //GET ALL
        getAppUsersStart: (state) => {
            state.message = null
            state.isFetching = true
            state.error = false
        },
        getAppUsersSuccess: (state, action) => {
            state.message = null
            state.isFetching = false
            state.appUsers = action.payload
            state.error = false
        },
        getAppUsersFailure: (state) => { // if errors from backend add action and give error action.payload (see userRedux! (loginfailure))
            state.message = null
            state.error = true
            state.isFetching = false
        },
        //DELETE
        deleteUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false
            state.appUsers.splice(
                state.appUsers.findIndex(user => user._id === action.payload.id), //splice the array by starting from the user with same id as the user that needs to be deleted (the payload from the apicall delete), the 1 stands for the amount of users to delete from that index which should be 1
                1
            )
            state.message = action.payload.message
        },
        deleteUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
         //UPDATE
         updateUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false
            state.products[state.appUsers.findIndex((user) => user._id === action.payload.id)] = action.payload.appUser
            state.error = false
        },
        updateUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //ADD
        addUserStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false
            state.appUsers.push(action.payload)
        },
        addUserFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload.data
        }
    }
})

export const { getAppUsersStart, getAppUsersSuccess, getAppUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, addUserStart, addUserSuccess, addUserFailure } = appUserSlice.actions
export default appUserSlice.reducer