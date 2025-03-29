import styles from "./Login.module.css";
import image from "../../assets/wardrobe.jpg";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const { login } = useAuth();
	const navigate = useNavigate();

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
		<div className={styles.mainContainer}>
			<div className={styles.leftSideContainer}>
				<h2 className={styles.promotionText}>
					Start organizing your life with{" "}
					<span className={styles.highlightedText}>eCloset</span>
				</h2>
				<img src={image} alt="" className={styles.wardrobeImage} />
			</div>
			<div className={styles.rightSideContainer}>
				<div className={styles.formContainer}>
					<h2 className={styles.signInText}>Sign in</h2>
					<form action="" onSubmit={handleSubmit}>
						<div>
							<input
								type="text"
								placeholder="Email"
								className={styles.inputField}
								value={credentials.email}
								onChange={(e) =>
									setCredentials({
										...credentials,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Password"
								className={styles.inputField}
								value={credentials.password}
								onChange={(e) =>
									setCredentials({
										...credentials,
										password: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.accountManagementTextContainer}>
							<a className={styles.accountManagementText} href="">
								Create an account
							</a>
							<a className={styles.accountManagementText} href="">
								Forgot password
							</a>
						</div>
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
