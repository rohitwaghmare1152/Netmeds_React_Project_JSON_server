import axiosInstance from "./axiosInstance";

export const fetchCartItem = async () => {
    const res = await axiosInstance.get("/cart");
    return res.data
};

export const addCartItem = async (product) => {
    const res = await axiosInstance.post("/cart", product );
    return res.data
};

export const updateCartItem = async (id, data) => {
    const res = await axiosInstance.put(`/cart/${id}`, data)
}
export const removeCartItem = async (id) => {
    const res = await axiosInstance.delete(`/cart/${id}`);
    return res.data
};