import styles from "./Login.module.css";
import image from "../../assets/wardrobe.jpg";

const Login = () => {
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
					<form action="">
						<div>
							<input
								type="text"
								name=""
								id=""
								placeholder="Email"
								className={styles.inputField}
							/>
						</div>
						<div>
							<input
								type="password"
								name=""
								id=""
								placeholder="Password"
								className={styles.inputField}
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
					</form>
					<button className={styles.submitButton}>SIGN IN</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
