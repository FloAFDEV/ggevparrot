import React from "react";

const SearchFilters = ({
	handleFilter,
	handleFuelTypeFilterChange,
	handleColorFilterChange,
	handlePriceFilterChange,
}: {
	handleFilter: () => void;
	handleFuelTypeFilterChange: (value: string) => void;
	handleColorFilterChange: (value: string) => void;
	handlePriceFilterChange: (value: string) => void;
}) => {
	return (
		<div className="flex justify-around mb-6">
			<input
				type="text"
				placeholder="Type de carburant"
				onChange={(e) => handleFuelTypeFilterChange(e.target.value)}
				className="p-2 border-2 border-lime-500 rounded-md text-center text-xl"
			/>
			<input
				type="text"
				placeholder="Couleur"
				onChange={(e) => handleColorFilterChange(e.target.value)}
				className="p-2 border-2 border-lime-500 rounded-md text-center text-xl"
			/>
			<input
				type="number"
				placeholder="Prix maximum"
				onChange={(e) => handlePriceFilterChange(e.target.value)}
				className="p-2 border-2 border-lime-500 rounded-md text-center text-xl"
			/>
			<button
				onClick={handleFilter}
				className="btn btn-secondary text-lg p-2"
			>
				Appliquer les filtres
			</button>
		</div>
	);
};

export default SearchFilters;
