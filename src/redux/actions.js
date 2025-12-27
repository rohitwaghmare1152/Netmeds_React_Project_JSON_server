import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, fetchProducts, fetchSections, fetchSubcategories } from '../services/productService';

// export const getProducts = createAsyncThunk (
//     'products/getProducts',
//     async () => {
//         const data = await fetchProducts();
//         return data;
//     }
// );

export const getAllData = createAsyncThunk(
    "catalog/getAllData",
    async () => {
        const [products, subcategories, categories, sections] =
            await Promise.all([
                fetchProducts(),
                fetchSubcategories(),
                fetchCategories(),
                fetchSections(),
            ]);

        return {
            products,
            subcategories,
            categories,
            sections,
        };
    }
);
