import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data)) //user information is being send: email, username...
    } catch (err) {
        dispatch(loginFailure(err.response))
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
    } catch (err) {
        dispatch(registerFailure(err.response))
    }
}