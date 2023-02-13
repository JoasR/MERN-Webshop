import { publicRequest, userRequest } from "../requestMethods"
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductsFailure, getProductsStart, getProductsSuccess } from "./productRedux"
import { loginStart, loginSuccess, loginFailure } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data)) //user information is being send: email, username...
    } catch (err) {
        dispatch(loginFailure(err.response))
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart())
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductsSuccess(res.data))
    } catch (err) {
        dispatch(getProductsFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    try {
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess({message: res.data, id: id}))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}