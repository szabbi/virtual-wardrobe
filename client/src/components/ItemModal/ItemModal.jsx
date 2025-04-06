/* eslint-disable react/prop-types */
import styles from "./ItemModal.module.css";

export const ItemModal = ({ selectedItem, onClose, onEdit, onDelete }) => {
	if (!selectedItem) return null;

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div
				className={styles.modalContent}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<span
						className={`material-icons-round ${styles.actionIcon}`}
						onClick={onClose}
						title="Close"
					>
						close
					</span>
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
				</div>
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
					{selectedItem.fit &&
						renderDetailItem("Fit:", selectedItem.fit)}
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
			</div>
		</div>
	);
};

const renderDetailItem = (label, value) => (
	<div className={styles.detailItem}>
		<span className={styles.detailLabel}>{label}</span>
		<span className={styles.detailValue}>{value}</span>
	</div>
);
