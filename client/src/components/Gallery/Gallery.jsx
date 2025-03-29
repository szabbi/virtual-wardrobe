import { useState } from "react";
import styles from "./Gallery.module.css";
import { useEffect } from "react";
import { getAllItems } from "../../api/item";

const Gallery = () => {
	const [items, setItems] = useState([]);

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
					<h1 className={styles.itemHeaderText}>Items</h1>
				</div>
				<div className={styles.items}>
					{items.map((item) => (
						<div key={item.name} className={styles.itemCard}>
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
		</div>
	);
};

export default Gallery;
