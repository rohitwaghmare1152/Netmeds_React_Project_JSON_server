import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productSelectors } from "../redux/slices/productSelectors";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { addToCart, getCart } from "../redux/actions";

function ProductPage() {
	const { productId } = useParams();
	const dispatch = useDispatch();

	const product = useSelector((state) =>
		productSelectors.selectById(state, productId)
	);

	const handleAddProduct = async () => {
		await dispatch(addToCart(product));
		dispatch(getCart());
	};	

	if (!product) return <p>Loading product...</p>;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				<h1>{product.product_name}</h1>
				<p>Price: ₹{product.price}</p>
				<button onClick={handleAddProduct}> ADD TO CART</button>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default ProductPage;
