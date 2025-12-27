import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { productContext } from "../context/productContext";

const ProductProvider = ({ children }) => {
	const [productsByCategory, setProductsByCategory] = useState({});
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		fetchProducts().then(setProductsByCategory).catch(console.error);
	}, []);

	useEffect(() => {
		const products = Object.values(productsByCategory)
			.flatMap((sectionObj) => Object.values(sectionObj))
			.flatMap((section) => section.categories)
			.flatMap((category) => category.products)
			.flat();

		setAllProducts(products);
	}, [productsByCategory]);

	return (
		<productContext.Provider value={{ productsByCategory, allProducts }}>
			{children}
		</productContext.Provider>
	);
};

export default ProductProvider;
