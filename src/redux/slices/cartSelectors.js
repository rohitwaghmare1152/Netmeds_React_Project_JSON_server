import { createSelector } from "@reduxjs/toolkit";

export const selectCart = (state) => state.cart.cart;

export const selectCartCount = createSelector(
    [selectCart],
    (cart) => cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCart],
    (cart) => cart.reduce((sum, item) => sum + item.totalPrice, 0)
)

export const selectCartItemByProductId = (productId) =>
    createSelector(
        [selectCart],
        (cart) => cart.find((item) => item.id === productId)
    );