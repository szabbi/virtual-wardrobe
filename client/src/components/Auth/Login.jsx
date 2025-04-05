import styles from "./Login.module.css";
import image from "../../assets/wardrobe.jpg";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCredentials({
			...credentials,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(credentials);
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
						<a className={styles.formLink} href="/registration">
							Create an account
						</a>
						<button className={styles.submitButton} type="submit">
							SIGN IN
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
