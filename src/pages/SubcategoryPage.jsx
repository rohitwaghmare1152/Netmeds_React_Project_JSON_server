import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectProductsBySubcategory,
	subcategorySelectors,
} from "../redux/slices/productSelectors";
import { selectCart } from "../redux/slices/cartSelectors";
import { addToCart, decrementCart, getCart } from "../redux/actions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useCallback, useMemo } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import {
	setSelectedBrands,
	setPriceRange,
	setDiscount,
} from "../redux/slices/filterSlice";

function SubcategoryPage() {
	const { subcategoryId, categoryId, sectionId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const subcategory = useSelector((state) =>
		subcategorySelectors.selectById(state, subcategoryId)
	);

	const products = useSelector(selectProductsBySubcategory(subcategory?.id));

	const cart = useSelector((state) => state.cart.cart);

	const filters = useSelector((state) => state.filters);

	const handleAddProduct = useCallback(
		(product) => {
			dispatch(addToCart(product));
		},
		[dispatch]
	);

	const handleRemoveProduct = useCallback(
		(cartItem) => {
			dispatch(decrementCart(cartItem.id));
		},
		[dispatch]
	);

	const brands = useMemo(
		() => [...new Set(products.map((p) => p.manufacturer))],
		[products]
	);

	const filteredProducts = useMemo(() => {
		return products.filter((p) => {
			const brandMatch =
				filters.selectedBrands.length === 0 ||
				filters.selectedBrands.includes(p.manufacturer);

			const priceMatch =
				p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

			const discountValue = Number(p.discount?.replace("%", "")) || 0;

			return brandMatch && priceMatch && discountValue >= filters.discount;
		});
	}, [products, filters]);

	const handleBrandChange = useCallback(
		(brand) => {
			const updated = filters.selectedBrands.includes(brand)
				? filters.selectedBrands.filter((b) => b !== brand)
				: [...filters.selectedBrands, brand];

			dispatch(setSelectedBrands(updated));
		},
		[filters.selectedBrands, dispatch]
	);

	return (
		<div className="bg-gray-50 min-h-screen">
			<Header />

			<div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
				<FilterSidebar
					brands={brands}
					selectedBrands={filters.selectedBrands}
					onBrandChange={handleBrandChange}
					priceRange={filters.priceRange}
					onPriceChange={(v) => dispatch(setPriceRange(v))}
					discount={filters.discount}
					onDiscountChange={(v) => dispatch(setDiscount(v))}
				/>

				<div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{filteredProducts.map((product) => {
						const cartItem = cart.find((c) => c.id === product.product_id);

						return (
							<ProductCard
								key={product.product_id}
								product={product}
								cartItem={cartItem}
								onAdd={() => handleAddProduct(product)}
								onRemove={() => handleRemoveProduct(cartItem)}
								onNavigate={() =>
									navigate(
										`/sections/${sectionId}/${categoryId}/${subcategoryId}/${product.product_id}`
									)
								}
							/>
						);
					})}
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default SubcategoryPage;
