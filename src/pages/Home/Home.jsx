import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sectionSelectors } from "../../redux/slices/productSelectors";

function Home() {
	const navigate = useNavigate();
	const sections = useSelector(sectionSelectors.selectAll);

	const catalog = useSelector((state) => state.catalog);

	if (!sections.length) {
		return <p>Loading sections...</p>;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<div>
				<Header />
			</div>
			<div>
				<h1>Select a Section</h1>

				{sections.map((section) => (
					<div
						key={section.id}
						onClick={() => navigate(`/sections/${section.id}`)}
						style={{
							cursor: "pointer",
							padding: "12px",
							border: "1px solid #ccc",
							marginBottom: "8px",
						}}
					>
						{section.name}
					</div>
				))}
			</div>

			<div>
				<Footer />
			</div>
		</div>
	);
}

export default Home;
