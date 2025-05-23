import { useState, useEffect } from "react";
import {
	deleteItemById,
	getAllItems,
	saveItem,
	saveItemImage,
	updateItem,
} from "../api/Item";

export const useItems = () => {
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [newItem, setNewItem] = useState({
		imageFile: "",
		name: "",
		size: "",
		type: "",
		color: "",
		material: "",
		pattern: "",
		brand: "",
		fit: "",
		season: "",
		occasion: "",
		purchaseDate: "",
		purchasePrice: "",
	});

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await getAllItems();
				setItems(response.data);
			} catch (err) {
				console.error("Failed to fetch items:", err);
			}
		};

		fetchItems();
	}, []);

	const openModal = (item) => {
		setSelectedItem(item);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedItem(null);
		setIsUploadModalOpen(false);
		setSelectedFile(null);
		setPreviewImage(null);
		setNewItem({
			name: "",
			size: "",
			type: "",
			color: "",
			material: "",
			pattern: "",
			brand: "",
			fit: "",
			season: "",
			occasion: "",
			purchaseDate: "",
			purchasePrice: "",
		});
		document.body.style.overflow = "auto";
	};

	const handleDelete = async () => {
		if (!selectedItem.id) return;
		try {
			await deleteItemById(selectedItem.id);
			setItems((prev) =>
				prev.filter((item) => item.id !== selectedItem.id)
			);
			closeModal();
			alert("Successful");
		} catch (error) {
			console.error("Error deleting item:", error);
			alert("Couldn't delete item");
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setSelectedFile(file);

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const handleSaveItem = async () => {
		try {
			const formData = new FormData();

			let imageFileName = newItem.imageFile;
			if (selectedFile) {
				formData.append("file", selectedFile);
				const imageResponse = await saveItemImage(formData);
				imageFileName = imageResponse.data.filename;
			}

			const itemToSave = {
				...newItem,
				imageFile: imageFileName,
			};

			if (newItem.id) {
				await updateItem(itemToSave);
			} else {
				await saveItem(itemToSave);
			}

			const response = await getAllItems();
			setItems(response.data);

			setSelectedFile(null);
			setPreviewImage(null);
			setIsUploadModalOpen(false);
			setNewItem({
				name: "",
				size: "",
				type: "",
				color: "",
				material: "",
				pattern: "",
				brand: "",
				fit: "",
				season: "",
				occasion: "",
				purchaseDate: "",
				purchasePrice: "",
			});
		} catch (error) {
			console.error("Error saving item:", error);
			alert("Couldn't save item");
		}
	};

	const handleEdit = (item) => {
		setSelectedItem(null);
		setNewItem(item);
		setPreviewImage(
			`http://localhost:8080/api/items/image/${item.imageFile}`
		);
		setSelectedFile(null);
		setIsUploadModalOpen(true);
	};

	const isFormValid = () => {
		return (
			previewImage &&
			newItem.name &&
			newItem.size &&
			newItem.type &&
			newItem.color &&
			newItem.season
		);
	};

	return {
		items,
		selectedItem,
		isUploadModalOpen,
		selectedFile,
		previewImage,
		newItem,
		setItems,
		setSelectedItem,
		setIsUploadModalOpen,
		setSelectedFile,
		setPreviewImage,
		setNewItem,
		openModal,
		closeModal,
		handleDelete,
		handleFileChange,
		handleSaveItem,
		isFormValid,
		handleEdit,
	};
};
