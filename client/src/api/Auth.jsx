import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/auth",
	withCredentials: true,
});

export const registerUser = async (userData) => {
	return api.post("/registration", userData);
};

export const loginUser = async (userCredentials) => {
	return api.post("/login", userCredentials);
};

export const logoutUser = async () => {
	return api.post("/logout");
};

export const checkUserAuthStatus = async () => {
	return api.get("/status");
};
