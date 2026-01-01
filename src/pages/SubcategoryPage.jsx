import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	selectProductsBySubcategory,
	subcategorySelectors,
} from "../redux/slices/productSelectors";
import { addToCart, getCart } from "../redux/actions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function SubcategoryPage() {
	const { productId, subcategoryId, categoryId, sectionId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const subcategory = useSelector((state) =>
		subcategorySelectors.selectById(state, subcategoryId)
	);

	const products = useSelector(
		selectProductsBySubcategory(subcategory ? subcategory.id : () => [])
	);

	const handleNavigate = (productId) => {
		navigate(
			`/sections/${sectionId}/${categoryId}/${subcategoryId}/${productId}`
		);
	};

	const handleAddProduct = async (product) => {
		await dispatch(addToCart(product));
		dispatch(getCart());
	};

	if (!subcategory) return <p>Loading subcategory...</p>;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				<h3>{subcategory.name}</h3>

				{products.map((p) => (
					<div key={p.product_id}>
						<p
							onClick={() => handleNavigate(p.product_id)}
							style={{ cursor: "pointer" }}
						>
							{p.name}
						</p>
						<button onClick={() => handleAddProduct(p)}>ADD TO CART</button>
					</div>
				))}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default SubcategoryPage;
