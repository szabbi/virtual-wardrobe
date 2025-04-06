/* eslint-disable react/prop-types */
import { BaseModal } from "../BaseModal/BaseModal";
import styles from "./OutfitModal.module.css";
import { OutfitItemCard } from "../OutfitItemCard/OutfitItemCard";

export const OutfitModal = ({ selectedOutfit, onClose, onEdit, onDelete }) => {
	if (!selectedOutfit) return null;

	const headerContent = (
		<div className={styles.actionButtons}>
			<span
				className={`material-icons-round ${styles.actionIcon}`}
				onClick={() => onEdit(selectedOutfit)}
				title="Edit"
			>
				edit
			</span>
			<span
				className={`material-icons-round ${styles.actionIcon}`}
				onClick={onDelete}
				title="Delete"
			>
				delete
			</span>
		</div>
	);

	return (
		<BaseModal onClose={onClose} headerContent={headerContent}>
			<div className={styles.outfitImagesContainer}>
				{selectedOutfit.imagePaths.map((image, idx) => (
					<OutfitItemCard
						key={idx}
						image={image}
						altText={`Item ${idx + 1} in ${selectedOutfit.name}`}
					/>
				))}
			</div>
		</BaseModal>
	);
};
