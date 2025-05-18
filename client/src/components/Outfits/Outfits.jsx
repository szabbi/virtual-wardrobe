import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Outfits.module.css";
import { useEffect } from "react";
import { getAllOutfits } from "../../api/Outfits";

import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { OutfitItemCard } from "../OutfitItemCard/OutfitItemCard";
import { useFilters } from "../../hooks/useFilters";
import { OutfitModal } from "../OutfitModal/OutfitModal";

import { deleteOutfitById } from "../../api/Outfits";

const Outfits = () => {
	const [outfits, setOutfits] = useState([]);
	const [selectedOutfit, setSelectedOutfit] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const getItems = async () => {
			try {
				const response = await getAllOutfits();
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
		navigate("/planner", { state: { outfitToEdit: outfit } });
	};

	const handleDeleteOutfit = async () => {
		if (!selectedOutfit.id) return;

		try {
			await deleteOutfitById(selectedOutfit.id);

			const response = await getAllOutfits();
			setOutfits(response.data);

			setSelectedOutfit(null);
			alert("Outfit deleted successfully");
		} catch (error) {
			console.error("Failed to delete outfit:", error);
			alert("Failed to delete outfit. Please try again.");
		}
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
				onEdit={() => handleEditOutfit(selectedOutfit)}
				onDelete={handleDeleteOutfit}
			/>
		</div>
	);
};

export default Outfits;
