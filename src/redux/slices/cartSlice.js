import { createSlice } from "@reduxjs/toolkit";
import { addToCart, decrementCart, deleteCart, getCart } from "../actions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        const index = state.cart.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (index !== -1) {
          state.cart[index] = updatedItem;
        } else {
          state.cart.push(updatedItem);
        }
      })
      .addCase(decrementCart.fulfilled, (state, action) => {
        if (action.payload.remove) {
          state.cart = state.cart.filter(i => i.id !== action.payload.id);
        } else {
          const index = state.cart.findIndex(
            i => i.id === action.payload.id
          );
          state.cart[index] = action.payload;
        }
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
  }
});

export default cartSlice.reducer;