import axios from "axios";

const apiItem = axios.create({
	baseURL: "http://localhost:8080/api",
	withCredentials: true,
});

export const getAllItems = async () => {
	return apiItem.get("/items");
};

export const deleteItemById = async (id) => {
	return apiItem.delete(`items/${id}`);
};

export const saveItem = async (item) => {
	return apiItem.post("/items", item);
};

export const saveItemImage = async (file) => {
	return apiItem.post("/items/image", file, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
