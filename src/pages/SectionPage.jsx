import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	sectionSelectors,
	selectCategoriesBySection,
} from "../redux/slices/productSelectors";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function SectionPage() {
	const { sectionId } = useParams();
	const navigate = useNavigate();

	const section = useSelector((state) =>
		sectionSelectors.selectById(state, sectionId)
	);

	const categories = useSelector(
		section ? selectCategoriesBySection(section.name) : () => []
	);

	const handleNavigate = (id) => {
		navigate(`/sections/${sectionId}/${id}`);
		console.log(id);
	};

	if (!section) return <p>Loading section...</p>;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				<h1>{section.name}</h1>

				{categories.map((c) => (
					<div
						key={c.id}
						onClick={() => handleNavigate(c.id)}
						style={{ cursor: "pointer" }}
					>
						{c.name}
					</div>
				))}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default SectionPage;
