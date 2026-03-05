import { memo } from "react";

const FilterSidebar = memo(
	({
		brands,
		selectedBrands,
		onBrandChange,
		priceRange,
		onPriceChange,
		discount,
		onDiscountChange,
	}) => {
		return (
			<aside className="w-64 bg-white border rounded-lg p-4 space-y-6 sticky top-20 h-fit">
				<div>
					<h4 className="font-semibold mb-2">Brands</h4>
					<div className="space-y-1 max-h-48 overflow-y-auto text-sm">
						{brands.map((brand) => (
							<label key={brand} className="flex gap-2 d-block">
								<input
									type="checkbox"
									checked={selectedBrands.includes(brand)}
									onChange={() => onBrandChange(brand)}
								/>
								{brand}
							</label>
						))}
					</div>
				</div>

				<div>
					<h4 className="font-semibold mb-2">
						Price ₹{priceRange[0]} – ₹{priceRange[1]}
					</h4>
					<input
						type="range"
						min={0}
						max={5000}
						value={priceRange[1]}
						onChange={(e) => onPriceChange([0, Number(e.target.value)])}
						className="w-full"
					/>
				</div>

				<div>
					<h4 className="font-semibold mb-2">Discount {discount}%+</h4>
					<input
						type="range"
						min={0}
						max={90}
						value={discount}
						onChange={(e) => onDiscountChange(Number(e.target.value))}
						className="w-full"
					/>
				</div>
			</aside>
		);
	}
);

export default FilterSidebar;
