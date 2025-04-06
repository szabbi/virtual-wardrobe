import { useState } from "react";
import styles from "./Outfits.module.css";
import { useEffect } from "react";
import { getAllOutfits } from "../../api/Outfits";

import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { OutfitItemCard } from "../OutfitItemCard/OutfitItemCard";
import { useFilters } from "../../hooks/useFilters";
import { OutfitModal } from "../OutfitModal/OutfitModal";

const Outfits = () => {
	const [outfits, setOutfits] = useState([]);
	const [selectedOutfit, setSelectedOutfit] = useState(null);

	useEffect(() => {
		const getItems = async () => {
			try {
				const response = await getAllOutfits();
				console.log("response", response);

				setOutfits(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		getItems();
	}, []);

	const openModal = (item) => {
		setSelectedOutfit(item);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedOutfit(null);
		document.body.style.overflow = "auto";
	};

	const handleEditOutfit = (outfit) => {
		console.log("Edit outfit:", outfit);
	};

	const handleDeleteOutfit = () => {
		console.log("Delete outfit:", selectedOutfit);
		setSelectedOutfit(null);
	};

	const { filteredItems, searchTerm, setSearchTerm } = useFilters(outfits);

	return (
		<div className={styles.container}>
			<FilterPanel
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				items={outfits}
				searchOnly={true}
			/>
			<div className={styles.itemContainer}>
				{filteredItems.map((outfit) => (
					<div
						key={outfit.id}
						className={styles.outfitContainer}
						onClick={() => openModal(outfit)}
					>
						<h2 className={styles.outfitName}>{outfit.name}</h2>
						<div className={styles.outfitImages}>
							{outfit.imagePaths.map((image, idx) => (
								<OutfitItemCard
									key={idx}
									image={image}
									altText={`Item ${idx + 1} in ${
										outfit.name
									}`}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<OutfitModal
				selectedOutfit={selectedOutfit}
				onClose={closeModal}
				onEdit={handleEditOutfit}
				onDelete={handleDeleteOutfit}
			/>
		</div>
	);
};

export default Outfits;
