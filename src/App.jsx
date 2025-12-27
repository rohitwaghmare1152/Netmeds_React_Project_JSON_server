import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingIn from "./pages/SignIn/SingIn";
import AllCategories from "./pages/allCaegories/AllCategories";
import { useDispatch } from "react-redux";
import { getAllData } from "./redux/actions.js";
import SectionPage from "./pages/SectionPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SubcategoryPage from "./pages/SubcategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData());
	}, [dispatch]);

	return (
		<div className="text-2xl/2.4 tracking-[.005em] font-medium box-border">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<SingIn />} />
					<Route path="/sections/all-categories" element={<AllCategories />} />
					<Route path="/sections/:sectionId" element={<SectionPage />} />
					<Route
						path="/sections/:sectionId/:categoryId"
						element={<CategoryPage />}
					/>
					<Route
						path="/sections/:sectionId/:categoryId/:subcategoryId"
						element={<SubcategoryPage />}
					/>
					<Route
						path="/sections/:sectionId/:categoryId/:subcategoryId/:productId"
						element={<ProductPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
