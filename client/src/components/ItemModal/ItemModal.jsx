/* eslint-disable react/prop-types */
import styles from "./ItemModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

export const ItemModal = ({ selectedItem, onClose, onEdit, onDelete }) => {
	if (!selectedItem) return null;

	const headerContent = (
		<div className={styles.actionButtons}>
			<span
				className={`material-icons-round ${styles.actionIcon}`}
				onClick={() => onEdit(selectedItem)}
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
			<div className={styles.modalImageContainer}>
				<img
					src={`http://localhost:8080/api/items/image/${selectedItem.imageFile}`}
					alt={selectedItem.name}
					className={styles.modalImage}
				/>
			</div>
			<div className={styles.detailsGrid}>
				{renderDetailItem("Name:", selectedItem.name)}
				{renderDetailItem("Size:", selectedItem.size)}
				{renderDetailItem("Type:", selectedItem.type)}
				{renderDetailItem("Color:", selectedItem.color)}
				{selectedItem.material &&
					renderDetailItem("Material:", selectedItem.material)}
				{selectedItem.pattern &&
					renderDetailItem("Pattern:", selectedItem.pattern)}
				{selectedItem.brand &&
					renderDetailItem("Brand:", selectedItem.brand)}
				{selectedItem.fit && renderDetailItem("Fit:", selectedItem.fit)}
				{renderDetailItem("Season:", selectedItem.season)}
				{selectedItem.occasion &&
					renderDetailItem("Occasion:", selectedItem.occasion)}
				{selectedItem.purchaseDate &&
					renderDetailItem(
						"Purchase Date:",
						selectedItem.purchaseDate
					)}
				{selectedItem.purchasePrice &&
					renderDetailItem(
						"Price:",
						`$${selectedItem.purchasePrice.toFixed(2)}`
					)}
			</div>
		</BaseModal>
	);
};

const renderDetailItem = (label, value) => (
	<div className={styles.detailItem}>
		<span className={styles.detailLabel}>{label}</span>
		<span className={styles.detailValue}>{value}</span>
	</div>
);
