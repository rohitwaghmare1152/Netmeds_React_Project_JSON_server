import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
    const res = await axiosInstance.get("/products");
    return res.data
};

export const fetchSubcategories = async () => {
    const res = await axiosInstance.get("/subcategories");
    return res.data
};

export const fetchCategories = async () => {
    const res = await axiosInstance.get("/categories");
    return res.data
};

export const fetchSections = async () => {
    const res = await axiosInstance.get("/sections");
    return res.data
}; 