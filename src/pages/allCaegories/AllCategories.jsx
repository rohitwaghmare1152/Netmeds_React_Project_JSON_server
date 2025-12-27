import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import products from "../../constants/categories/allCategories.json";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import TopCategories from "./topCategories";
import BeautyCategories from "./Beauty";
import Wellness from "./wellness";

function AllCategories() {
	const [state, setState] = useState(1);
	return (
		<div className="flex flex-col min-h-screen">
			<div>
				<Header />
			</div>
			<div>
				<div className="container my-4">
					<span className="inline-flex items-center w-auto rounded-4xl p-1 bg-stone-100">
					<span className={`text-black text-md font-medium text-center cursor-pointer px-3 ${ state === 1 ? "bg-teal-400 rounded-4xl p-1":"bg-stone-100"}`} onClick={()=>setState(1)}>
						Top Categories
					</span>
					<span className={`text-black text-md font-medium text-center cursor-pointer px-3 ${ state === 2 ? "bg-teal-400 rounded-4xl p-1":"bg-stone-100"}`} onClick={()=>setState(2)}>
						Beauty
					</span>
					<span className={`text-black text-md font-medium text-center cursor-pointer px-3 ${ state === 3 ? "bg-teal-400 rounded-4xl p-1":"bg-stone-100"}`} onClick={()=>setState(3)}>
						Wellness
					</span>
					</span>
					{state === 1 && <TopCategories />}
					{state === 2 && <BeautyCategories />}
					{state === 3 && <Wellness />}
				</div>
				<div className="m-4">
					<div className="container text-2xl font-extrabold mx-auto my-4">
						Popular Brands
					</div>
					<div className="container grid grid-cols-5 gap-3">
						{products.popularBrand.map((data) => (
							<Card key={data.id} className="border-0">
								<Link
									to={`/sections/${data.path}`}
									className="[text-decoration:none!important]"
								>
									<CardImg src={data.image} />
									<CardBody>
										<CardTitle className="text-black text-lg text-center">
											{data.name}
										</CardTitle>
									</CardBody>
								</Link>
							</Card>
						))}
					</div>
				</div>
				<div className="m-4">
					<div className="container text-2xl font-extrabold mx-auto my-4">
						All Categories
					</div>
					<div className="container grid grid-cols-6 gap-3">
						{products.allCategories.map((data) => (
							<Card key={data.id} className="border-0">
								<Link
									to={`/sections/${data.path}`}
									className="[text-decoration:none!important]"
								>
									<CardImg src={data.image} />
									<CardBody>
										<CardTitle className="text-black text-lg text-center">
											{data.name}
										</CardTitle>
									</CardBody>
								</Link>
							</Card>
						))}
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default AllCategories;
