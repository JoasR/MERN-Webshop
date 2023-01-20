import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity // this is not the quantity from the reducer but from the cart
        }
    }
})

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer