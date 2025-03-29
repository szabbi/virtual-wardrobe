import axios from "axios";

const apiOutfits = axios.create({
	baseURL: "http://localhost:8080/api",
	withCredentials: true,
});

export const getAllOutfits = async () => {
	return apiOutfits.get("/outfits");
};
