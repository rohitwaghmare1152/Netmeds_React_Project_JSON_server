import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	categorySelectors,
	selectSubcategoriesByCategory,
	subcategorySelectors,
} from "../redux/slices/productSelectors";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function CategoryPage() {
	const { categoryId, sectionId } = useParams();
	const navigate = useNavigate();

	const category = useSelector((state) =>
		categorySelectors.selectById(state, categoryId)
	);

	const subcategories = useSelector(
		category ? selectSubcategoriesByCategory(category.id) : () => []
	);

	const handleNavigate = (subcategoryId) => {
		navigate(`/sections/${sectionId}/${categoryId}/${subcategoryId}`);
	};

	if (!category) return <p>Invalid category...</p>;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				<h2>{category.name}</h2>

				{subcategories.map((s) => (
					<div
						key={s.id}
						onClick={() => handleNavigate(s.id)}
						style={{ cursor: "pointer" }}
					>
						{s.name}
					</div>
				))}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default CategoryPage;
