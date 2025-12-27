import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	categorySelectors,
  subcategorySelectors,
} from "../redux/slices/productSelectors";

function CategoryPage() {
	const { categoryId, sectionId } = useParams();
	const navigate = useNavigate();

	const category = useSelector((state) =>
		categorySelectors.selectById(state, categoryId)
	);

	const subcategories = useSelector((state) =>
		subcategorySelectors
			.selectAll(state)
			.filter((s) => s.category_id === category?.id)
	);

  const handleNavigate = (subCategoryId) => {
		navigate(`/sections/${sectionId}/${categoryId}/${subCategoryId}`);
		console.log(subCategoryId);
	};

	if (!category) return <p>Loading category...</p>;

	return (
		<>
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
		</>
	);
}

export default CategoryPage;
