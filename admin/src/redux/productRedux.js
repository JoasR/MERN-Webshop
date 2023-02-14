import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        message: null
    },
    reducers: {
        //GET ALL
        getProductsStart: (state) => {
            state.message = null
            state.isFetching = true
            state.error = false
        },
        getProductsSuccess: (state, action) => {
            state.message = null
            state.isFetching = false
            state.products = action.payload
            state.error = false
        },
        getProductsFailure: (state) => { // if errors from backend add action and give error action.payload (see userRedux!)
            state.message = null
            state.error = true
            state.isFetching = false
        },

        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload.id), //splice the array by starting from the item with same id as the item that needs to be deleted (the payload from the apicall delete), the 1 stands for the a,ount of items to delete from that index which should be 1
                1
            )
            state.message = action.payload.message
        },
        deleteProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },

        //UPDATE
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false
            state.products[state.products.findIndex((item) => item._id === action.payload.id)] = action.payload.product
            state.error = false
        },
        updateProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },

        //ADD
        addProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false
            state.products.push(action.payload)
        },
        addProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { 
    getProductsStart, 
    getProductsSuccess, 
    getProductsFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure, 
    updateProductStart, 
    updateProductSuccess, 
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} = productSlice.actions
export default productSlice.reducer