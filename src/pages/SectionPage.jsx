import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	categorySelectors,
	sectionSelectors,
} from "../redux/slices/productSelectors";

function SectionPage() {
	const { sectionId } = useParams();
	const navigate = useNavigate();

	const section = useSelector((state) =>
		sectionSelectors.selectById(state, sectionId)
	);

	const categories = useSelector((state) =>
		categorySelectors
			.selectAll(state)
			.filter((c) => c.section === section?.name)
	);
	console.log(categories);
	
	const handleNavigate = (id) => {
		navigate(`/sections/${sectionId}/${id}`);
		console.log(id);
	};

	if (!section) return <p>Loading section...</p>;

	return (
		<>
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
		</>
	);
}

export default SectionPage;
