import React from "react";
import Navbar from "../Navbar/Navbar";
import item from "../../constants/categories/footerNav.json";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

function Footer() {
	return (
		<div className="relative bottom-0 w-full">
			<div className="md:hidden">
				<Navbar />
			</div>
			<div className="bg-gray-100 hidden md:block flex items-center justify-around ps-2 py-5">
				<div className="container mx-auto flex items-start gap-8">
					{item.footer?.map((section) => (
						<div key={section.id} className="flex-1">
							<div className="text-black font-bold py-2">
								{section.category}
							</div>
							<div className="flex flex-col items-start justify-end">
								{section.items.map((item) => (
									<div key={item.id} className="mb-1 py-1">
										<Link
											to={item.link}
											className="[text-decoration:none!important]"
										>
											<span className="text-gray-700">{item.label}</span>
										</Link>
									</div>
								))}
							</div>
							{section.input && (
								<form onSubmit={() => alert("Thank you for Subscription")}>
									<input
										type="email"
										placeholder="enter your email address"
										className="focus:outline-none focus:ring-0  placeholder:font-bold py-2 border-b-2"
									/>
									<button className="btn btn-primary rounded-3 px-3 py-2 mx-3">
										<span>
											<FaArrowRightLong className="w-5 h-5 text-white" />
										</span>
									</button>
								</form>
							)}
						</div>
					))}
				</div>
				<hr />
				<div className="container mx-auto flex items-center gap-2">
					<img
						src="public/images/home/icons/home.png"
						alt="logo"
						width={"25px"}
						height={"10px"}
					/>
					<span className="text-sm font-semibold">
						#MadeInIndia © 2025 Netmeds Marketplace Ltd
					</span>
				</div>
			</div>
		</div>
	);
}

export default Footer;
