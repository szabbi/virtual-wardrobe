/* eslint-disable react/prop-types */
import styles from "./OutfitItemCard.module.css";

export const OutfitItemCard = ({
	image,
	altText,
	onClick,
	size = "default",
}) => {
	return (
		<div
			className={`${styles.outfitItemCard} ${styles[size]}`}
			onClick={onClick}
		>
			<img
				src={`http://localhost:8080/api/items/image/${image}`}
				alt={altText}
				className={styles.image}
			/>
		</div>
	);
};
