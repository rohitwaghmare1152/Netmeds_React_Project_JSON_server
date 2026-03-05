import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: null,
    subcategoryId: null,
    selectedBrands: [],
    priceRange: [0, 5000],
    discount: 0
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.categoryId = action.payload;
        },
        setSubcategory(state, action) {
            state.subcategoryId = action.payload;
        },
        setSelectedBrands(state, action) {
            state.selectedBrands = action.payload;
        },
        setPriceRange(state, action) {
            state.priceRange = action.payload;
        },
        setDiscount(state, action) {
            state.discount = action.payload;
        },
        resetFilters() {
            return initialState;
        }
    }
});

export const {
    setCategory,
    setSubcategory,
    setSelectedBrands,
    setPriceRange,
    setDiscount,
    resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
