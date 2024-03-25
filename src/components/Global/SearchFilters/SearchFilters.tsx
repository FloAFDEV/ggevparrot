import React, { useState } from "react";

interface SearchFiltersProps {
	handleFilter: (term: string) => void;
}

const SearchFilters: React.FunctionComponent<SearchFiltersProps> = ({
	handleFilter,
}) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		handleFilter(term);
	};

	return (
		<div className="flex justify-center mb-6">
			<input
				type="text"
				placeholder="Recherche..."
				value={searchTerm}
				onChange={handleSearch}
				className="p-2 border-2 border-lime-500 rounded-md text-center text-xl"
				autoComplete="off"
			/>
		</div>
	);
};

export default SearchFilters;
