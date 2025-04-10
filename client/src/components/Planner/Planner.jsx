import { useState } from "react";
import { ItemCard } from "../ItemCard/ItemCard";
import { useItems } from "../../hooks/useItems";
import styles from "./Planner.module.css";

import { saveOutfit } from "../../api/Outfits";

const Planner = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [outfitName, setOutfitName] = useState("");

	const { items } = useItems();

	const handleItemClick = (item) => {
		setSelectedItems((prev) => [...prev, item]);
	};

	const removeItem = (itemId) => {
		setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
	};

	const handleSaveOutfit = async () => {
		if (selectedItems.length === 0) {
			alert("Please add at least one item to the outfit");
			return;
		}

		if (!outfitName.trim()) {
			alert("Please enter a name for your outfit");
			return;
		}

		try {
			const outfitData = {
				name: outfitName,
				items: selectedItems.map((item) => item.id), // Extract just the IDs
			};

			await saveOutfit(outfitData);
			alert("Outfit saved successfully!");
			setSelectedItems([]);
			setOutfitName("");
		} catch (error) {
			console.error("Failed to save outfit:", error);
			alert("Failed to save outfit. Please try again.");
		}
	};

	return (
		<div className={styles.plannerContainer}>
			<div className={styles.plannerSection}>
				<div className={styles.nameInput}>
					<input
						type="text"
						value={outfitName}
						onChange={(e) => setOutfitName(e.target.value)}
						placeholder="Enter outfit name"
						required
					/>
				</div>
				<div className={styles.selectedItems}>
					{selectedItems.length === 0 ? (
						<p className={styles.emptyMessage}>
							Click on an item in the right side
						</p>
					) : (
						selectedItems.map((item) => (
							<div key={item._id} className={styles.selectedItem}>
								<ItemCard item={item} />
								<button
									className={styles.removeButton}
									onClick={(e) => {
										e.stopPropagation();
										removeItem(item.id);
									}}
								>
									Remove
								</button>
							</div>
						))
					)}
				</div>
				<div className={styles.actions}>
					<button
						className={styles.saveButton}
						onClick={handleSaveOutfit}
					>
						Save Outfit
					</button>
					<button
						className={styles.clearButton}
						onClick={() => setSelectedItems([])}
					>
						Clear All
					</button>
				</div>
			</div>

			<div className={styles.gallerySection}>
				<div className={styles.itemsGrid}>
					{items.map((item) => (
						<div
							key={item.id}
							className={`${styles.itemWrapper} ${
								selectedItems.length >= 4 ? styles.disabled : ""
							}`}
							onClick={
								selectedItems.length >= 4
									? undefined
									: () => handleItemClick(item)
							}
						>
							<ItemCard item={item} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Planner;
