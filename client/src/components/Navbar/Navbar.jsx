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

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<img src={icon} alt="Logo" className={styles.logo} />
				<p className={styles.logoText}>eCloset</p>
			</div>
			<nav className={styles.navStyle}>
				<ul
					className={` ${
						isAuthenticated
							? styles.ulStyle
							: styles.notAuthenticated
					}`}
				>
					<li className={styles.liStyle}>
						<NavLink
							className={({ isActive }) =>
								isActive ? styles.active : styles.linkStyle
							}
							to="/planner"
						>
							Planner
						</NavLink>
					</li>
					<li className={styles.liStyle}>
						<NavLink
							className={({ isActive }) =>
								isActive ? styles.active : styles.linkStyle
							}
							to="/outfits"
						>
							Outfits
						</NavLink>
					</li>
					<li className={styles.liStyle}>
						<NavLink
							className={({ isActive }) =>
								isActive ? styles.active : styles.linkStyle
							}
							to="/gallery"
						>
							Gallery
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className={styles.userStyle}>
				<button
					className={`material-icons-round ${
						isAuthenticated
							? styles.accountIcon
							: styles.notAuthenticated
					}`}
					onClick={toggleDropdown}
				>
					account_circle
				</button>
				{isDropdownMenuOpen && (
					<div className={styles.dropdownMenuContainer}>
						{isAuthenticated && (
							<div>
								<h2 className={styles.dropdownAccount}>
									Account
								</h2>
								<hr />
								<div
									className={
										styles.dropdownActionsListContainer
									}
								>
									<ul className={styles.dropdownActionsList}>
										<div
											className={
												styles.dropdownListElementContainer
											}
										>
											<span className="material-icons-round">
												logout
											</span>
											<button
												className={styles.logOutButton}
												onClick={handleLogout}
											>
												Sign Out
											</button>
										</div>
									</ul>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
