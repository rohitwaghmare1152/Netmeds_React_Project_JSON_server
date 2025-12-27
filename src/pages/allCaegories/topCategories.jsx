import React from "react";
import products from "../../constants/categories/allCategories.json";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

function TopCategories() {
	return (
		<div className="my-4">
			<div className="container grid grid-cols-6 gap-2">
				{products.topCategories.map((data) => (
					<Card key={data.id} className="border-0">
						<Link
							to={`/sections/${data.path}`}
							className="[text-decoration:none!important]"
						>
							<CardImg src={data.image} />
							<CardBody className="p-0">
								<CardTitle className="text-black text-md text-center">
									{data.name}
								</CardTitle>
							</CardBody>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
}

export default TopCategories;
