import { useState } from "react";
import styles from "./Gallery.module.css";
import { useEffect } from "react";
import { deleteItemById, getAllItems } from "../../api/item";

const Gallery = () => {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filters, setFilters] = useState({
		size: "",
		type: "",
		color: "",
		material: "",
		pattern: "",
		brand: "",
		fit: "",
		season: "",
		occasion: "",
	});

	useEffect(() => {
		const getItems = async () => {
			try {
				const response = await getAllItems();
				setItems(response.data);
				setFilteredItems(response.data);
			} catch (err) {
				console.log(err);
			}
		};

		getItems();
	}, []);

	useEffect(() => {
		let results = items;

		if (searchTerm) {
			results = results.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		results = results.filter((item) => {
			return (
				(!filters.size || item.size === filters.size) &&
				(!filters.type || item.type === filters.type) &&
				(!filters.color || item.color === filters.color) &&
				(!filters.material || item.material === filters.material) &&
				(!filters.pattern || item.pattern === filters.pattern) &&
				(!filters.brand || item.brand === filters.brand) &&
				(!filters.fit || item.fit === filters.fit) &&
				(!filters.season || item.season === filters.season) &&
				(!filters.occasion || item.occasion === filters.occasion)
			);
		});

		setFilteredItems(results);
	}, [items, searchTerm, filters]);

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
				<h2>Search</h2>
				<input
					type="text"
					placeholder="Search by name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<h2>Filters</h2>
				<div className={styles.filterGroup}>
					<label>Size</label>
					<select
						value={filters.size}
						onChange={(e) =>
							setFilters({ ...filters, size: e.target.value })
						}
					>
						<option value="">All Sizes</option>
						{[...new Set(items.map((item) => item.size))].map(
							(size) => (
								<option key={size} value={size}>
									{size}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Type</label>
					<select
						value={filters.type}
						onChange={(e) =>
							setFilters({ ...filters, type: e.target.value })
						}
					>
						<option value="">All Types</option>
						{[...new Set(items.map((item) => item.type))].map(
							(type) => (
								<option key={type} value={type}>
									{type}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Color</label>
					<select
						value={filters.color}
						onChange={(e) =>
							setFilters({ ...filters, color: e.target.value })
						}
					>
						<option value="">All Colors</option>
						{[...new Set(items.map((item) => item.color))].map(
							(color) => (
								<option key={color} value={color}>
									{color}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Material</label>
					<select
						value={filters.material}
						onChange={(e) =>
							setFilters({ ...filters, material: e.target.value })
						}
					>
						<option value="">All Materials</option>
						{[...new Set(items.map((item) => item.material))].map(
							(material) => (
								<option key={material} value={material}>
									{material}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Pattern</label>
					<select
						value={filters.pattern}
						onChange={(e) =>
							setFilters({ ...filters, pattern: e.target.value })
						}
					>
						<option value="">All Patterns</option>
						{[...new Set(items.map((item) => item.pattern))].map(
							(pattern) => (
								<option key={pattern} value={pattern}>
									{pattern}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Brand</label>
					<select
						value={filters.brand}
						onChange={(e) =>
							setFilters({ ...filters, brand: e.target.value })
						}
					>
						<option value="">All Brans</option>
						{[...new Set(items.map((item) => item.brand))].map(
							(brand) => (
								<option key={brand} value={brand}>
									{brand}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Fit</label>
					<select
						value={filters.fit}
						onChange={(e) =>
							setFilters({ ...filters, fit: e.target.value })
						}
					>
						<option value="">All Fits</option>
						{[...new Set(items.map((item) => item.fit))].map(
							(fit) => (
								<option key={fit} value={fit}>
									{fit}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Season</label>
					<select
						value={filters.season}
						onChange={(e) =>
							setFilters({ ...filters, season: e.target.value })
						}
					>
						<option value="">All Seasons</option>
						{[...new Set(items.map((item) => item.season))].map(
							(season) => (
								<option key={season} value={season}>
									{season}
								</option>
							)
						)}
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label>Occasion</label>
					<select
						value={filters.occasion}
						onChange={(e) =>
							setFilters({ ...filters, occasion: e.target.value })
						}
					>
						<option value="">All Occasions</option>
						{[...new Set(items.map((item) => item.occasion))].map(
							(occasion) => (
								<option key={occasion} value={occasion}>
									{occasion}
								</option>
							)
						)}
					</select>
				</div>
				<button
					className={styles.clearFilters}
					onClick={() => {
						setFilters({
							size: "",
							type: "",
							color: "",
							material: "",
							pattern: "",
							brand: "",
							fit: "",
							season: "",
							occasion: "",
						});
						setSearchTerm("");
					}}
				>
					Clear All Filters
				</button>
			</div>
			<div className={styles.itemContainer}>
				<div className={styles.itemsHeader}>
					<button className={styles.itemUploadButton}>
						Upload item
					</button>
				</div>
				<div className={styles.items}>
					{filteredItems.map((item) => (
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
							<span
								className={`material-icons-round ${styles.actionIcon}`}
								onClick={closeModal}
								title="Close"
							>
								close
							</span>
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
