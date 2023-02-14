import { publicRequest, userRequest } from "../requestMethods"
import { 
    deleteProductFailure,
    deleteProductStart, 
    deleteProductSuccess, 
    getProductsFailure, 
    getProductsStart, 
    getProductsSuccess, 
    updateProductStart, 
    updateProductSuccess, 
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux"
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

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    try {
        const res = await userRequest.put(`/products/${id}`, product)
        dispatch(updateProductSuccess(res.data))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post("/products", product)
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}