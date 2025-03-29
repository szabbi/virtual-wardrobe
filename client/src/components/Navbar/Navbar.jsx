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
							to="/gallery"
						>
							Gallery
						</NavLink>
					</li>
				</ul>
			</nav>

			<div className={styles.userStyle}>
				<button
					className={`material-icons-round ${styles.accountIcon}`}
					onClick={toggleDropdown}
				>
					account_circle
				</button>
				{isDropdownMenuOpen && (
					<div className={styles.dropdownMenuContainer}>
						<h2
							className={` ${
								isAuthenticated ? styles.notAuthenticated : ""
							}`}
						>
							Not logged in
						</h2>
						{isAuthenticated && (
							<div>
								<h2 className={styles.dropdownUsername}>
									First name
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
												person
											</span>
											<li
												className={
													styles.dropdownListElement
												}
											>
												<NavLink
													className={
														styles.dropdownLink
													}
												>
													View profile
												</NavLink>
											</li>
										</div>
										<hr />
										<div
											className={
												styles.dropdownListElementContainer
											}
										>
											<span className="material-icons-round">
												manage_accounts
											</span>
											<li
												className={
													styles.dropdownListElement
												}
											>
												<NavLink
													className={
														styles.dropdownLink
													}
												>
													Settings
												</NavLink>
											</li>
										</div>
										<div
											className={
												styles.dropdownListElementContainer
											}
										>
											<span className="material-icons-round">
												alternate_email
											</span>
											<li
												className={
													styles.dropdownListElement
												}
											>
												<NavLink
													className={
														styles.dropdownLink
													}
												>
													Contact
												</NavLink>
											</li>
										</div>
										<hr />
										<div
											className={
												styles.dropdownListElementContainer
											}
										>
											<span className="material-icons-round">
												info
											</span>
											<li
												className={
													styles.dropdownListElement
												}
											>
												<NavLink
													className={
														styles.dropdownLink
													}
												>
													About
												</NavLink>
											</li>
										</div>
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
