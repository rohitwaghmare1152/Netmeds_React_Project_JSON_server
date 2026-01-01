import { createSelector } from "@reduxjs/toolkit";
import {
    categoriesAdapter,
    productsAdapter,
    sectionsAdapter,
    subcategoriesAdapter,
} from "./productSlice";

export const productSelectors =
    productsAdapter.getSelectors((state) => state.catalog.products);

export const subcategorySelectors =
    subcategoriesAdapter.getSelectors((state) => state.catalog.subcategories);

export const categorySelectors =
    categoriesAdapter.getSelectors((state) => state.catalog.categories);

export const sectionSelectors =
    sectionsAdapter.getSelectors((state) => state.catalog.sections);

export const selectCategoriesBySection = (sectionName) => (state) =>
    categorySelectors
        .selectAll(state)
        .filter((c) => c.section === sectionName);

export const selectSubcategoriesByCategory = (categoryId) =>
    createSelector(
        [(state) => subcategorySelectors.selectAll(state)],
        (subcategories) =>
            subcategories.filter((s) => s.category_id === categoryId)
    );

export const selectProductsBySubcategory = (subcategoryId) => 
    createSelector(
    [(state) => productSelectors.selectAll(state)],
        (products) =>
        products.filter((p) => p.subcategory_id === subcategoryId))
