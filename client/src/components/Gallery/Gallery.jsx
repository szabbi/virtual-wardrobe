import styles from "./Gallery.module.css";

const Gallery = () => {
	return (
		<div className={styles.galleryContainer}>
			<div className={styles.box}>
				<h2>Gallery</h2>
				<p>This is your gallery content.</p>
			</div>
		</div>
	);
};

export default Gallery;
