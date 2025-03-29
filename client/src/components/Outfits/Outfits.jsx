import { useState } from "react";
import styles from "./Outfits.module.css";
import { useEffect } from "react";
import { getAllOutfits } from "../../api/Outfits";

const Outfits = () => {
	const [outfits, setOutfits] = useState([]);

	useEffect(() => {
		const getItems = async () => {
			try {
				const response = await getAllOutfits();
				console.log("response", response);

				setOutfits(response.data);
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
				<div className={styles.items}>
					{outfits.map((outfit, index) => (
						<div key={index} className={styles.itemCard}>
							<h2>{outfit.name}</h2>
							{outfit.imagePaths.map((image, idx) => (
								<img
									key={idx}
									src={`http://localhost:8080/api/items/image/${image}`}
									alt={`Item ${idx}`}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Outfits;
