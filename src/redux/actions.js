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
        const cart = getState().cart.cart;

        const existing = cart.find(
            (item) => item.id === product.product_id
        );

        if (existing) {
            return await updateCartItem(product.product_id, {
                ...existing,
                quantity: existing.quantity + 1,
                totalPrice: (existing.quantity + 1) * existing.price,
            });
        }

        return await addCartItem({
            id: product.product_id, // ✅ FORCED ID
            name: product.name,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
        });
    }
)

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id) => {
        await removeCartItem(id);
        return id;
    }
)

export const decrementCart = createAsyncThunk(
    "cart/decrement",
    async (id, { getState }) => {
        const item = getState().cart.cart.find((i) => i.id === id);

        if (item.quantity === 1) {
            await removeCartItem(id);
            return { id, remove: true };
        }

        return await updateCartItem(id, {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: (item.quantity - 1) * item.price,
        });
    }
);
