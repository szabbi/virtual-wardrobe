import styles from "./Login.module.css";
import image from "../../assets/wardrobe.jpg";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UserAuth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [credentials, setCredentials] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { login, register } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCredentials({
			...credentials,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (isLogin) {
				login({
					email: credentials.email,
					password: credentials.password,
				});
			} else {
				if (credentials.password !== credentials.confirmPassword) {
					alert("Passwords don't match!");
					return;
				}
				register({
					firstName: credentials.firstName,
					lastName: credentials.lastName,
					email: credentials.email,
					password: credentials.password,
				});
			}
			navigate("/gallery");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.leftSide}>
				<h1 className={styles.welcomeText}>
					Start organizing your life with{" "}
					<span className={styles.highlightedWelcomeText}>
						eCloset
					</span>
				</h1>
				<img
					src={image}
					alt="Empty wardrobe image"
					className={styles.wardrobeImage}
				/>
			</div>

			<div className={styles.authSection}>
				<div className={styles.authCard}>
					<h1 className={styles.authTitle}>Welcome</h1>

					<form onSubmit={handleSubmit} className={styles.authForm}>
						{!isLogin && (
							<div className={styles.formGroup}>
								<input
									type="text"
									name="firstName"
									placeholder="First name"
									className={styles.formInput}
									value={credentials.firstName}
									onChange={handleChange}
								/>
							</div>
						)}
						{!isLogin && (
							<div className={styles.formGroup}>
								<input
									type="text"
									name="lastName"
									placeholder="Last name"
									className={styles.formInput}
									value={credentials.lastName}
									onChange={handleChange}
								/>
							</div>
						)}
						<div className={styles.formGroup}>
							<input
								type="text"
								name="email"
								placeholder="Email"
								className={styles.formInput}
								value={credentials.email}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.formGroup}>
							<input
								type="password"
								name="password"
								placeholder="Password"
								className={styles.formInput}
								value={credentials.password}
								onChange={handleChange}
							/>
						</div>
						{!isLogin && (
							<div className={styles.formGroup}>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm password"
									className={styles.formInput}
									value={credentials.confirmPassword}
									onChange={handleChange}
								/>
							</div>
						)}
						<button
							type="button"
							className={styles.formSwitchButton}
							onClick={() => {
								setIsLogin(!isLogin);
								setCredentials({
									firstName: "",
									lastName: "",
									email: "",
									password: "",
									confirmPassword: "",
								});
							}}
						>
							{isLogin
								? "Create an account"
								: "Already have an account?"}
						</button>
						<button className={styles.submitButton} type="submit">
							{isLogin ? "SIGN IN" : "REGISTER"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserAuth;
