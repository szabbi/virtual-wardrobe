import styles from "./Navbar.module.css";
import icon from "../../assets/icon.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth();
	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownMenuOpen((prevState) => !prevState);
	};

	const handleLogout = async () => {
		await logout();
	};

	if (!isAuthenticated) {
		return;
	}

	return (
		<header className={styles.navbar}>
			<NavLink to="/gallery" className={styles.brand}>
				<img src={icon} alt="Logo" className={styles.brandLogo} />
				<h2 className={styles.brandName}>eCloset</h2>
			</NavLink>
			<nav className={styles.navContainer}>
				<ul className={styles.NavLinks}>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navLink} ${styles.active}`
									: styles.navLink
							}
							to="/planner"
						>
							Planner
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navLink} ${styles.active}`
									: styles.navLink
							}
							to="/outfits"
						>
							Outfits
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive
									? `${styles.navLink} ${styles.active}`
									: styles.navLink
							}
							to="/gallery"
						>
							Gallery
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className={styles.userMenu}>
				<button
					className={`material-icons-round ${styles.dropdownToggleIcon}`}
					onClick={toggleDropdown}
				>
					account_circle
				</button>
				{isDropdownMenuOpen && (
					<div className={styles.dropdown}>
						<h2 className={styles.dropdownHeader}>Account</h2>
						<hr className={styles.dropdownDivider} />
						<div className={styles.dropdownItem}>
							<ul className={styles.dropdownActionsList}>
								<span
									className={`material-icons-round ${styles.dropdownIcon}`}
								>
									logout
								</span>
								<button
									className={styles.logOutButton}
									onClick={handleLogout}
								>
									Sign Out
								</button>
							</ul>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
