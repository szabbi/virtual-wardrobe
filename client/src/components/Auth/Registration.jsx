import styles from "./Registration.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

const Registration = () => {
	const [userData, setUserData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);

		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(userData);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.formContainer}>
				<h2 className={styles.registrationText}>Registration</h2>
				<form action="" onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							name="firstName"
							placeholder="First name"
							className={styles.inputField}
							value={userData.firstName}
							onChange={handleChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="lastName"
							placeholder="Last nane"
							className={styles.inputField}
							value={userData.lastName}
							onChange={handleChange}
						/>
					</div>
					<div>
						<input
							type="text"
							name="email"
							placeholder="Email"
							className={styles.inputField}
							value={userData.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className={styles.inputField}
							value={userData.password}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className={styles.submitButton}>
						SIGN UP
					</button>
				</form>
			</div>
		</div>
	);
};

export default Registration;
