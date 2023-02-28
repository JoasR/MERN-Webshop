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
        },
        removeProduct: (state, action) => {
            const { _id, size, color } = action.payload;
            const index = state.products.findIndex(product => product._id === _id && product.size === size && product.color === color);
            
            if (index !== -1) {
                if (state.products[index].quantity > 1) {
                  state.products[index].quantity -= 1;
                  state.quantity -= 1;
                  state.total -= state.products[index].price;
                } else {
                    console.log("index " + index)
                  state.quantity -= 1;
                  state.total -= state.products[index].price;
                  state.products.splice(index, 1);
                }
              }
        },
        clearCart: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        },
        setCart: (state, action) => {
            state.products = action.payload.products
            state.quantity = action.payload.quantity
            state.total = action.payload.total
        }
    }
})

export const { addProduct, removeProduct, clearCart, setCart } = cartSlice.actions
export default cartSlice.reducer