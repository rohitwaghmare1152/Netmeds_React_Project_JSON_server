import { createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteCart, getCart } from "../actions";

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
      console.log(action.payload);
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      console.log(action.payload);
      
    })
    .addCase(deleteCart.fulfilled, (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    })
  }
});

export default cartSlice.reducer;