import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
	categorySelectors,
	selectSubcategoriesByCategory,
} from "../redux/slices/productSelectors";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {
	setCategory,
	setSubcategory,
	resetFilters,
} from "../redux/slices/filterSlice";

function CategoryPage() {
	const { categoryId, sectionId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const category = useSelector((state) =>
		categorySelectors.selectById(state, categoryId)
	);

	const subcategories = useSelector(
		category ? selectSubcategoriesByCategory(category.id) : () => []
	);

	const handleNavigate = useCallback(
		(subcategoryId) => {
			dispatch(setCategory(categoryId));
			dispatch(setSubcategory(subcategoryId));
			dispatch(resetFilters());
			navigate(`/sections/${sectionId}/${categoryId}/${subcategoryId}`);
		},
		[dispatch, navigate, sectionId, categoryId]
	);

	if (!category) return <p>Invalid category...</p>;

	return (
		<div className="bg-gray-50 min-h-screen">
			<Header />

			<div className="max-w-7xl mx-auto px-4 py-6">
				<h2 className="text-xl font-semibold mb-4">{category.name}</h2>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{subcategories.map((sub) => (
						<div
							key={sub.id}
							onClick={() => handleNavigate(sub.id)}
							className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow transition"
						>
							<p className="font-medium">{sub.name}</p>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default CategoryPage;
