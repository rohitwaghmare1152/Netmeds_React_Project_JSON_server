import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import AllCategories from "./pages/allCaegories/AllCategories";
import { useDispatch } from "react-redux";
import { getAllData, getCart } from "./redux/actions.js";
import SectionPage from "./pages/SectionPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SubcategoryPage from "./pages/SubcategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData());
		dispatch(getCart());
	}, [dispatch]);

	return (
		
			<BrowserRouter>
				<AuthProvider>
					<div className="text-2xl/2.4 tracking-[.005em] font-medium box-border">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/auth" element={<SignIn />} />
						<Route
							path="/cart"
							element={
								<PrivateRoute>
									<Cart />
								</PrivateRoute>
							}
						/>
						<Route
							path="/sections/all-categories"
							element={<AllCategories />}
						/>
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
					</div>
				</AuthProvider>
			</BrowserRouter>
	);
}

export default App;
