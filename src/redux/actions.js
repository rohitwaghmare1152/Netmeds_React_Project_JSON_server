import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, fetchProducts, fetchSections, fetchSubcategories } from '../services/productService';
import { addCartItem, fetchCartItem, removeCartItem, updateCartItem } from '../services/cartService';

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

export const getCart = createAsyncThunk(
    "cart/getCart",
    async () => {
        const data = await fetchCartItem();
        return data;
    }
)

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (product, { getState }) => {
        const { cart } = getState().cart; 
        const existing = cart.find((item) => item.id === product.id)
        console.log(product);
        
        if (existing) {
            return await updateCartItem(existing.id, {
                ...existing,
                quantity: existing.quantity + 1,
                totalPrice: (existing.quantity + 1)*existing.price
            });
        } else {
            return await addCartItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                totalPrice: (product.quantity ? product.price*product.quantity : product.price)
            }) 
        }
    }
)

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id) => {
        await removeCartItem(id);
        return id;
    }
)
