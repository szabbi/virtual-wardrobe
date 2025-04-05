import { useState } from "react";
import styles from "./Gallery.module.css";
import { useEffect } from "react";
import { deleteItemById, getAllItems } from "../../api/item";

const Gallery = () => {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemId, setSelectedItemId] = useState(null);

	useEffect(() => {
		const getItems = async () => {
			try {
				const response = await getAllItems();
				console.log("response", response);

				setItems(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		getItems();
	}, []);

	const openModal = (item, id) => {
		setSelectedItem(item);
		setSelectedItemId(id);

		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedItem(null);
		document.body.style.overflow = "auto";
	};

	const handleEdit = (item) => {
		console.log("Editing item:", item);
	};

	const handleDelete = async () => {
		if (!selectedItemId) return;
		if (window.confirm("Are you sure you want to delete this item?")) {
			try {
				await deleteItemById(selectedItemId);
				setItems(items.filter((item) => item.id !== selectedItemId));
				closeModal();
				alert("Item deleted successfully!");
			} catch (error) {
				console.error("Error deleting item:", error);
				alert("Failed to delete item. Please try again.");
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.filterPanel}>
				<h3>Search</h3>
				<input type="text" placeholder="Search by name..." />
				<h3>Filters</h3>
			</div>
			<div className={styles.itemContainer}>
				<div className={styles.itemsHeader}>
					<button className={styles.itemUploadButton}>
						Upload item
					</button>
				</div>
				<div className={styles.items}>
					{items.map((item) => (
						<div
							key={item.id}
							className={styles.itemCard}
							onClick={() => openModal(item, item.id)}
						>
							<img
								src={`http://localhost:8080/api/items/image/${item.imageFile}`}
								alt={item.name}
								style={{ width: "150px", height: "150px" }}
							/>
							<h2>{item.name}</h2>
							<p>
								<strong>Size:</strong> {item.size}
							</p>
							{item.material && (
								<p>
									<strong>Material:</strong> {item.material}
								</p>
							)}
							{item.fit && (
								<p>
									<strong>Fit:</strong> {item.fit}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
			{selectedItem && (
				<div className={styles.modalOverlay} onClick={closeModal}>
					<div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}
					>
						<div className={styles.modalHeader}>
							<button
								className={styles.closeButton}
								onClick={closeModal}
							>
								×
							</button>
							<div className={styles.actionButtons}>
								<span
									className={`material-icons-round ${styles.actionIcon}`}
									onClick={() => handleEdit(selectedItem)}
									title="Edit"
								>
									edit
								</span>
								<span
									className={`material-icons-round ${styles.actionIcon}`}
									onClick={handleDelete}
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
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									Name:
								</span>
								<span className={styles.detailValue}>
									{selectedItem.name}
								</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									Size:
								</span>
								<span className={styles.detailValue}>
									{selectedItem.size}
								</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									Type:
								</span>
								<span className={styles.detailValue}>
									{selectedItem.type}
								</span>
							</div>
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									Color:
								</span>
								<span className={styles.detailValue}>
									{selectedItem.color}
								</span>
							</div>
							{selectedItem.material && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Material:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.material}
									</span>
								</div>
							)}
							{selectedItem.pattern && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Pattern:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.pattern}
									</span>
								</div>
							)}
							{selectedItem.brand && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Brand:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.brand}
									</span>
								</div>
							)}
							{selectedItem.fit && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Fit:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.fit}
									</span>
								</div>
							)}
							<div className={styles.detailItem}>
								<span className={styles.detailLabel}>
									Season:
								</span>
								<span className={styles.detailValue}>
									{selectedItem.season}
								</span>
							</div>
							{selectedItem.occasion && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Occasion:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.occasion}
									</span>
								</div>
							)}
							{selectedItem.purchaseDate && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Purchase Date:
									</span>
									<span className={styles.detailValue}>
										{selectedItem.purchaseDate}
									</span>
								</div>
							)}
							{selectedItem.purchasePrice && (
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>
										Price:
									</span>
									<span className={styles.detailValue}>
										${selectedItem.purchasePrice.toFixed(2)}
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;
