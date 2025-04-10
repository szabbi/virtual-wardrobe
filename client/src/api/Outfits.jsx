import axios from "axios";

const apiOutfits = axios.create({
	baseURL: "http://localhost:8080/api",
	withCredentials: true,
});

export const getAllOutfits = async () => {
	return apiOutfits.get("/outfits");
};

export const saveOutfit = async (outfitData) => {
	return apiOutfits.post("/outfits", outfitData);
};

export const deleteOutfitById = async (id) => {
	return apiOutfits.delete(`outfits/${id}`);
};
