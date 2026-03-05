import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productSelectors } from "../redux/slices/productSelectors";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { addToCart, decrementCart, getCart } from "../redux/actions";
import { selectCartItemByProductId } from "../redux/slices/cartSelectors";

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

	const handleRemoveProduct = async () => {
		await dispatch(decrementCart(cartItem.id));
		dispatch(getCart());
	};

	const cartItem = useSelector(selectCartItemByProductId(productId));

	const isInCart = Boolean(cartItem);

	if (!product) return <p>Loading product...</p>;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				<h1>{product.product_name}</h1>
				<p>Price: ₹{product.price}</p>
				{!isInCart ? (
					<button
						onClick={() => handleAddProduct()}
						className="bg-teal-500 text-white px-3 py-1 rounded"
					>
						ADD
					</button>
				) : (
					<div className="flex items-center gap-2">
						<button
							onClick={() => handleRemoveProduct()}
							className="px-2 py-1 bg-gray-300 rounded"
						>
							➖
						</button>

						<span className="font-semibold">{cartItem.quantity}</span>

						<button
							onClick={() => handleAddProduct()}
							className="px-2 py-1 bg-gray-300 rounded"
						>
							➕
						</button>
					</div>
				)}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default ProductPage;
