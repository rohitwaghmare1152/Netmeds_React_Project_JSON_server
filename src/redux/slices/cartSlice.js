import { createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter({
  selectId : (cart) => cart.product_id,
});