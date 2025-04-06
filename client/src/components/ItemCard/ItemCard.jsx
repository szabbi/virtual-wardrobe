/* eslint-disable react/prop-types */
import itemStyles from "./ItemCard.module.css";

export const ItemCard = ({ item, onClick }) => {
	return (
		<div className={itemStyles.itemCard} onClick={onClick}>
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
	);
};
