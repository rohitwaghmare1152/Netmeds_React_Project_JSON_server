import { Link } from "react-router-dom";
import tab from "../../constants/categories/links.json";
import footerTab from "../../constants/categories/footerNav.json";

function Navbar() {
	
	return (
		<nav>
			{/*className='navbar max-w-[1400px] h-10 mx-auto text-sm no-underline text-white align-middle'*/}
			<div className="h-12 bg-teal-700 font-semibold md:flex hidden">
				<ul className="container flex items-start justify-between list-none text-white mx-auto p-1">
					{tab.links.map((product) => (
						<li key={product.id} className="relative group">
							<Link
								to={product.path}
								className="flex flex-col items-start justify-start gap-2 text-white [text-decoration:none!important] p-2 cursor-pointer"
							>
								<div className="flex items-center hover:pb-2 hover:border-b-4 border-blue-500">
									<img
										src={product.icon}
										alt="logo"
										width={"25px"}
										height={"10px"}
									/>
									<span>{product.name}</span>
								</div>
							</Link>
							{product.categories && (
								<div className="absolute left-0 top-full bg-gray-50 p-1 hidden group-hover:block hover:block z-50">
									{product.categories?.map((category) => (
										<div key={category.id} className="relative group/category ">
											<Link
												to={category.path}
												className="block whitespace-nowrap [text-decoration:none!important] px-4 py-2 cursor-pointer hover:bg-blue-100 hover:rounded-r-4xl"
											>
												<span className="text-gray-600">{category.name}</span>
											</Link>
											{category.subcategories && (
												<div className="absolute left-full top-0 bg-gray-50 p-1 hidden group-hover/category:block z-50">
													{category.subcategories.map((sub) => (
														<Link
															key={sub.id}
															to={sub.path}
															className="block whitespace-nowrap [text-decoration:none!important] px-4 py-2 cursor-pointer hover:bg-blue-100 hover:rounded-r-4xl"
														>
															<span className="text-gray-600">{sub.name}</span>
														</Link>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
			{/* Mobile View */}
			<div className="h-10 font-semibold md:hidden block">
				<ul className="flex w-full items-center justify-evenly list-none p-0 m-0">
					{footerTab.links.map((product) => (
						<li key={product.id}>
							<Link
								to={product.path}
								className="flex items-center gap-2 [text-decoration:none!important] p-2 cursor-pointer"
							>
								<div className="flex flex-col items-center text-gray-600">
									<img
										src={product.icon}
										alt="logo"
										width={"25px"}
										height={"10px"}
									/>
									<span>{product.name}</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
