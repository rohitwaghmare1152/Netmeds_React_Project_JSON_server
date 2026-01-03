import React from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../assets/netmeds_beta_logo.svg";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../redux/slices/cartSelectors";

function Header() {
	const count = useSelector(selectCartCount)
	return (
		<div className="bg-teal-400">
			<div className="container flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between p-2">
				<div className="flex items-center gap-8 cursor-pointer">
					<Link
						to={"/"}
						className="hidden lg:block px-3 hover:bg-sky-200 hover:rounded-4xl"
					>
						<img src={logo} alt="logo" />
					</Link>
					<div className="flex items-center gap-1 text-gray-700 px-3 py-2 hover:bg-sky-200 hover:rounded-4xl">
						<span>
							<FaLocationDot className="w-6 h-6" />
						</span>
						<span>Deliver to Delhi, 110001</span>
					</div>
				</div>
				<div className="flex items-center gap-4 w-full md:w-auto">
					<div className="w-full md:w-auto flex items-center gap-2 bg-white rounded-4xl px-3 py-2">
						<span>
							<IoIosSearch />
						</span>
						<input
							type="text"
							placeholder="Search for medicines, lab tests, doctors & beauty"
							className="w-full md:w-96 pb-1 focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:text-sm placeholder:text-gray-600 placeholder:font-semibold"
						/>
					</div>
					<div className="relative hidden md:block p-2 hover:bg-sky-200 hover:rounded-4xl cursor-pointer">
						<Link to={"/cart"} className="flex items-center font-bold text-blue-100 [text-decoration:none!important]">
							<PiShoppingCartSimpleFill className="w-6 h-6 m-1 text-black" />
							<span className="self-start absolute top-0 right-0 text-sm text-white bg-red-500 px-1 rounded-xl"> {count} </span>
						</Link>
					</div>
					<div className="flex items-center hidden md:block">
						<Link
							to={"/auth"}
							className="flex items-center gap-2.5 px-3 py-2 font-semibold hover:bg-sky-200 hover:rounded-4xl cursor-pointer [text-decoration:none!important] text-black"
						>
							<FaUser className="w-5 h-5 text-black rounded-xl" />
							<span>Sign In</span>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden md:block">
				<Navbar />
			</div>
		</div>
	);
}

export default Header;
