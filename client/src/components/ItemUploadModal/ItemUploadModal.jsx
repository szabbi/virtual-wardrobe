/* eslint-disable react/prop-types */
import styles from "./ItemUploadModal.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BaseModal } from "../BaseModal/BaseModal";

export const ItemUploadModal = ({
	isOpen,
	onClose,
	previewImage,
	selectedFile,
	newItem,
	setNewItem,
	onFileChange,
	onSaveItem,
	isFormValid,
}) => {
	const SIZING_OPTIONS = [
		"XS",
		"S",
		"M",
		"L",
		"XL",
		"XXL",
		"XXXL",
		"OTHER",
		"UNKNOWN",
	];
	const SEASON_OPTIONS = ["SPRING", "SUMMER", "FALL", "WINTER"];
	const [startDate, setStartDate] = useState(newItem.purchaseDate || null);

	if (!isOpen) return null;

	return (
		<BaseModal onClose={onClose}>
			<div className={styles.uploadContainer}>
				{!previewImage ? (
					<div className={styles.uploadArea}>
						<label className={styles.fileInputLabel}>
							<input
								type="file"
								accept="image/*"
								onChange={onFileChange}
								className={styles.fileInput}
							/>
							<div className={styles.uploadPrompt}>
								<span className="material-icons-round">
									cloud_upload
								</span>
								<p>Click to select an image</p>
							</div>
						</label>
					</div>
				) : (
					<>
						<div className={styles.imagePreview}>
							<img
								src={previewImage}
								alt="Preview"
								className={styles.previewImage}
							/>
							<button
								className={styles.changeImageButton}
								onClick={() => {
									selectedFile(null);
									previewImage(null);
								}}
							>
								Change image
							</button>
						</div>

						<div className={styles.formFields}>
							<h1>Item Details</h1>
							<div className={styles.uploadDetailsGrid}>
								<div className={styles.formGroup}>
									<label>Item Name*</label>
									<input
										type="text"
										value={newItem.name || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												name: e.target.value,
											})
										}
										maxLength={50}
										required
										placeholder="Maximum of 50 characters"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Size*</label>
									<select
										value={newItem.size || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												size: e.target.value,
											})
										}
										required
									>
										<option value="">Select size</option>
										{SIZING_OPTIONS.map((size) => (
											<option key={size} value={size}>
												{size}
											</option>
										))}
									</select>
								</div>
								<div className={styles.formGroup}>
									<label>Type*</label>
									<input
										type="text"
										value={newItem.type}
										onChange={(e) =>
											setNewItem({
												...newItem,
												type: e.target.value,
											})
										}
										required
										placeholder="e.g. Shirt"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Color*</label>
									<input
										type="text"
										value={newItem.color}
										onChange={(e) =>
											setNewItem({
												...newItem,
												color: e.target.value,
											})
										}
										required
										placeholder="e.g. Red"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Material</label>
									<input
										type="text"
										value={newItem.material || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												material: e.target.value,
											})
										}
										placeholder="e.g. Cotton"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Pattern</label>
									<input
										type="text"
										value={newItem.pattern || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												pattern: e.target.value,
											})
										}
										placeholder="e.g. Striped"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Brand</label>
									<input
										type="text"
										value={newItem.brand || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												brand: e.target.value,
											})
										}
										placeholder="e.g. Nike"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Fit</label>
									<input
										type="text"
										value={newItem.fit || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												fit: e.target.value,
											})
										}
										placeholder="e.g. Slim"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Season*</label>
									<select
										value={newItem.season || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												season: e.target.value,
											})
										}
										required
									>
										<option value="">Select season</option>
										{SEASON_OPTIONS.map((season) => (
											<option key={season} value={season}>
												{season.charAt(0) +
													season
														.slice(1)
														.toLowerCase()}
											</option>
										))}
									</select>
								</div>
								<div className={styles.formGroup}>
									<label>Occasion</label>
									<input
										type="text"
										value={newItem.occasion || ""}
										onChange={(e) =>
											setNewItem({
												...newItem,
												occasion: e.target.value,
											})
										}
										placeholder="e.g. Formal"
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Purchase Date</label>
									<DatePicker
										selected={startDate}
										onChange={(date) => {
											setStartDate(date);
											setNewItem({
												...newItem,
												purchaseDate: date
													? date
															.toISOString()
															.split("T")[0]
													: null,
											});
										}}
										dateFormat="yyyy-MM-dd"
										maxDate={new Date()}
										placeholderText="Select date"
										className={styles.datePicker}
									/>
								</div>
								<div className={styles.formGroup}>
									<label>Purchase Price</label>
									<input
										type="number"
										step="0.5"
										value={newItem.purchasePrice}
										onChange={(e) =>
											setNewItem({
												...newItem,
												purchasePrice: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<button
								className={styles.saveButton}
								onClick={onSaveItem}
								disabled={!isFormValid()}
							>
								Save Item
							</button>
						</div>
					</>
				)}
			</div>
		</BaseModal>
	);
};
