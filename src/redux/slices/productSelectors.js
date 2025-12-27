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

export const selectCategoriesBySection = (sectionId) => (state) =>
    categorySelectors
        .selectAll(state)
        .filter((s) => s.sectionId === sectionId);

export const selectSubcategoriesByCategory = (categoryId) => (state) =>
    subcategorySelectors
        .selectAll(state)
        .filter((c) => c.categoryId === categoryId);

export const selectProductsBySubcategory = (subcategoryId) => (state) =>
    productSelectors
        .selectAll(state)
        .filter((p) => p.subcategoryId === subcategoryId);
        