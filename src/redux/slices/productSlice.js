import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getAllData } from "../actions";

export const productsAdapter = createEntityAdapter({
  selectId: (product) => product.product_id
});
export const subcategoriesAdapter = createEntityAdapter();
export const categoriesAdapter = createEntityAdapter();
export const sectionsAdapter = createEntityAdapter();

const initialState = {
  products: productsAdapter.getInitialState(),
  subcategories: subcategoriesAdapter.getInitialState(),
  categories: categoriesAdapter.getInitialState(),
  sections: sectionsAdapter.getInitialState(),
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.setAll(state.products, action.payload.products);
        subcategoriesAdapter.setAll(state.subcategories, action.payload.subcategories);
        categoriesAdapter.setAll(state.categories, action.payload.categories);
        sectionsAdapter.setAll(state.sections, action.payload.sections);
      })
      .addCase(getAllData.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch data";
      });
  },
});

export default productSlice.reducer;
