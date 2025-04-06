/* eslint-disable react/prop-types */
import styles from "./Modal.module.css"; // You can reuse one of your existing style files or create a new one

export const BaseModal = ({ onClose, headerContent, children }) => {
	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div
				className={styles.modalContent}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<span
						className={`material-icons-round ${styles.actionIcon}`}
						onClick={onClose}
						title="Close"
					>
						close
					</span>
					{headerContent}
				</div>
				{children}
			</div>
		</div>
	);
};
