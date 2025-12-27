import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  productSelectors,
	subcategorySelectors,
} from "../redux/slices/productSelectors";

function SubcategoryPage() {
	const { subcategoryId, categoryId, sectionId } = useParams();
	const navigate = useNavigate();

	const subcategory = useSelector((state) =>
		subcategorySelectors.selectById(state, subcategoryId)
	);

	const products = useSelector((state) =>
		productSelectors
			.selectAll(state)
			.filter((p) => p.subcategory_id === subcategory?.id)
	);

	if (!subcategory) return <p>Loading subcategory...</p>;

	return (
		<>
			<h3>{subcategory.name}</h3>

			{products.map((p) => (
				<div
					key={p.id}
					onClick={() =>
						navigate(
							`/sections/${sectionId}/${categoryId}/${subcategoryId}/${p.id}`
						)
					}
					style={{ cursor: "pointer" }}
				>
					{p.name}
				</div>
			))}
		</>
	);
}

export default SubcategoryPage;
