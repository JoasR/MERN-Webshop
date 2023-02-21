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
import { getAppUsersStart, getAppUsersSuccess, getAppUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, addUserStart, addUserSuccess, addUserFailure } from "./appUserRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data)) //user information is being send: email, username...
    } catch (err) {
        dispatch(loginFailure(err.response))
    }
}

export const getAppUsers = async (dispatch) => {
    dispatch(getAppUsersStart())
    try {
        const res = await userRequest.get("/users")
        dispatch(getAppUsersSuccess(res.data))
        console.log(res.data)
    } catch (err) {
        dispatch(getAppUsersFailure())
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart())
    try {
        const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteUserSuccess({ message: res.data, id: id }))
    } catch (err) {
        dispatch(deleteUserFailure())
    }
}

export const updateUser = async(id, updatedUser, dispatch) => {
    dispatch(updateUserStart())
    try {
        const res = await userRequest.put(`/users/${id}`, updatedUser)
        dispatch(updateUserSuccess(res.data))
    } catch (err) {
        dispatch(updateUserFailure())
    }
}

export const addUser = async(user, dispatch) => {
    dispatch(addUserStart())
    try {
        const res = await userRequest.post("/auth/register", user)
        dispatch(addUserSuccess(res.data))
    } catch (err) {
        dispatch(addUserFailure(err.response))
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