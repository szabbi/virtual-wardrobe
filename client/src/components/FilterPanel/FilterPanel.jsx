/* eslint-disable react/prop-types */
import filterStyles from "./FilterPanel.module.css";

export const FilterPanel = ({
	searchTerm,
	setSearchTerm,
	filters,
	setFilters,
	items,
}) => {
	const FILTER_FIELDS = [
		{ key: "size", label: "Size" },
		{ key: "type", label: "Type" },
		{ key: "color", label: "Color" },
		{ key: "material", label: "Material" },
		{ key: "pattern", label: "Pattern" },
		{ key: "brand", label: "Brand" },
		{ key: "fit", label: "Fit" },
		{ key: "season", label: "Season" },
		{ key: "occasion", label: "Occasion" },
	];

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

	return (
		<div className={filterStyles.filterPanel}>
			<h2>Search</h2>
			<input
				type="text"
				placeholder="Search by name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<h2>Filters</h2>
			<div>
				{FILTER_FIELDS.map(({ key, label }) => (
					<div key={key} className={filterStyles.filterGroup}>
						<label>{label}</label>
						<select
							value={filters[key] || ""}
							onChange={(e) =>
								setFilters({
									...filters,
									[key]: e.target.value,
								})
							}
						>
							<option value="">All {label}</option>
							{[
								...new Set(
									items
										.map((item) => item[key])
										.filter(Boolean)
								),
							].map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
			<button
				className={filterStyles.clearFilters}
				onClick={clearAllFilters}
			>
				Clear All Filters
			</button>
		</div>
	);
};
