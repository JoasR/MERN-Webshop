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

            state.quantity += action.payload.quantity //or += 1 if wanne show only +1 when items are added
            const item = state.products.find(product => product._id === action.payload._id && product.size === action.payload.size && product.color === action.payload.color) // Makes it so duplicate items show dont show in new card
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.products.push(action.payload)
            }
            state.total += action.payload.price * action.payload.quantity // this is not the quantity from the reducer but from the cart
        }
    }
})

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer