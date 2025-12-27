import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { productSelectors } from "../redux/slices/productSelectors";

function ProductPage() {
	const { productId } = useParams();

	const product = useSelector((state) =>
		productSelectors.selectById(state, productId)
	);
	console.log(product);
	

	if (!product) return <p>Loading product...</p>;

	return (
		<>
			<h1>{product.product_name}</h1>
			<p>Price: ₹{product.price}</p>
		</>
	);
}

export default ProductPage;
