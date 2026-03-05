import { memo } from "react";

const ProductCard = memo(
	({ product, cartItem, onAdd, onRemove, onNavigate }) => {
		return (
			<div className="bg-white rounded border p-3 hover:shadow transition">

				<img
					src={product.image}
					alt={product.name}
					loading="lazy"
					className="h-40 mx-auto object-contain"
				/>

				<p
					onClick={onNavigate}
					className="text-sm font-medium cursor-pointer line-clamp-2 mt-2"
				>
					{product.name}
				</p>

				<p className="text-sm mt-1">
					₹{product.price}
					{product.discount && (
						<span className="text-green-600 text-xs ml-1">
							{product.discount} OFF
						</span>
					)}
				</p>

				{!cartItem ? (
					<button
						onClick={onAdd}
						className="mt-3 w-full bg-teal-500 text-white py-1.5 rounded font-semibold"
					>
						ADD
					</button>
				) : (
					<div className="mt-3 flex items-center justify-between border rounded px-2 py-1">
						<button onClick={onRemove} className="px-3 bg-teal-500 text-white py-1.5 rounded font-semibold">
							−
						</button>

						<span className="font-semibold">{cartItem.quantity}</span>

						<button onClick={onAdd} className="px-3 bg-teal-500 text-white py-1.5 rounded font-semibold">
							+
						</button>
					</div>
				)}
			</div>
		);
	}
);

export default ProductCard;
