import { createContext, useContext, useEffect, useState } from "react";
import {
	checkUserAuthStatus,
	loginUser,
	logoutUser,
	registerUser,
} from "../api/auth";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				await checkUserAuthStatus();
				setIsAuthenticated(true);
			} catch {
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const login = async (userCredentials) => {
		await loginUser(userCredentials);
		setIsAuthenticated(true);
	};

	const logout = async () => {
		await logoutUser();
		setIsAuthenticated(false);
	};

	const register = async (userCredentials) => {
		await registerUser(userCredentials);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, register, logout, loading }}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
