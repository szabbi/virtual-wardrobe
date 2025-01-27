import styles from "./Registration.module.css";

const Registration = () => {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.formContainer}>
				<h2 className={styles.registrationText}>Registration</h2>
				<form action="">
					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="First name"
							className={styles.inputField}
						/>
					</div>
					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="Last nane"
							className={styles.inputField}
						/>
					</div>
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
				</form>
				<button type="button" className={styles.submitButton}>
					SIGN UP
				</button>
			</div>
		</div>
	);
};

export default Registration;
