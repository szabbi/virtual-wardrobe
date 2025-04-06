import { useState, useEffect } from "react";

export const useFilters = (items) => {
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filters, setFilters] = useState({
		size: "",
		type: "",
		color: "",
		material: "",
		pattern: "",
		brand: "",
		fit: "",
		season: "",
		occasion: "",
	});

	useEffect(() => {
		let results = items;

		if (searchTerm) {
			results = results.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		results = results.filter((item) => {
			return Object.entries(filters).every(
				([key, value]) => !value || item[key] === value
			);
		});

		setFilteredItems(results);
	}, [items, searchTerm, filters]);

	const clearAllFilters = () => {
		setFilters({
			size: "",
			type: "",
			color: "",
			material: "",
			pattern: "",
			brand: "",
			fit: "",
			season: "",
			occasion: "",
		});
		setSearchTerm("");
	};

	return {
		filteredItems,
		searchTerm,
		filters,
		setSearchTerm,
		setFilters,
		clearAllFilters,
	};
};
