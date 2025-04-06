import styles from "./Gallery.module.css";

import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemModal } from "../../components/ItemModal/ItemModal";
import { ItemUploadModal } from "../../components/ItemUploadModal/ItemUploadModal";

import { useItems } from "../../hooks/useItems";
import { useFilters } from "../../hooks/useFilters";

const Gallery = () => {
	const {
		items,
		selectedItem,
		isUploadModalOpen,
		selectedFile,
		previewImage,
		newItem,
		setNewItem,
		openModal,
		closeModal,
		handleDelete,
		handleFileChange,
		handleSaveItem,
		isFormValid,
		setIsUploadModalOpen,
	} = useItems();

	const {
		filteredItems,
		searchTerm,
		filters,
		setSearchTerm,
		setFilters,
		clearAllFilters,
	} = useFilters(items);

	const handleEdit = (item) => {
		console.log("Editing item:", item);
	};

	return (
		<div className={styles.container}>
			<FilterPanel
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				filters={filters}
				setFilters={setFilters}
				items={items}
				onClearFilters={clearAllFilters}
			/>
			<div className={styles.itemContainer}>
				<div className={styles.itemsHeader}>
					<button
						className={styles.itemUploadButton}
						onClick={() => setIsUploadModalOpen(true)}
					>
						Upload item
					</button>
				</div>
				<div className={styles.items}>
					{filteredItems.map((item) => (
						<ItemCard
							key={item.id}
							item={item}
							onClick={() => openModal(item)}
						/>
					))}
				</div>
			</div>
			<ItemModal
				selectedItem={selectedItem}
				onClose={closeModal}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			<ItemUploadModal
				isOpen={isUploadModalOpen}
				onClose={() => setIsUploadModalOpen(false)}
				previewImage={previewImage}
				selectedFile={selectedFile}
				newItem={newItem}
				setNewItem={setNewItem}
				onFileChange={handleFileChange}
				onSaveItem={handleSaveItem}
				isFormValid={isFormValid}
			/>
		</div>
	);
};

export default Gallery;
