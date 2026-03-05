import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'
import filtersReducer from './slices/filterSlice'
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    catalog: productReducer,
    cart: cartReducer,
    filters: filtersReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["filters"]
};

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
export default store;