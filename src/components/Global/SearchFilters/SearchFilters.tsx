import React, { useEffect, useState } from "react";
import Image from "next/image";
import { brandOptions } from "../brandsData.ts/brandsData";

const SearchFilters = ({
	handleFilter,
	handleFuelTypeFilterChange,
	handlePriceFilterChange,
	resetFilters,
}: {
	handleFilter: () => void;
	handleFuelTypeFilterChange: (value: string) => void;
	handlePriceFilterChange: (value: string) => void;
	resetFilters: () => void;
}) => {
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [selectedFuelType, setSelectedFuelType] = useState<string>("");
	const [isMobile, setIsMobile] = useState(false);

	// Effet pour détecter le redimensionnement de l'écran
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// Fonction pour gérer la sélection des marques
	const handleBrandSelection = (brand: string) => {
		if (selectedBrands.includes(brand)) {
			const filteredBrands = selectedBrands.filter((b) => b !== brand);
			setSelectedBrands(filteredBrands);
		} else {
			setSelectedBrands([...selectedBrands, brand]);
		}
	};

	// Fonction pour réinitialiser tous les filtres
	const resetAllFilters = () => {
		setPriceMin("");
		setPriceMax("");
		setSelectedBrands([]);
		setSelectedFuelType("");
		resetFilters();
	};

	return (
		<div>
			{" "}
			<h3 className="text-xl font-bold">Sélectionner vos marques :</h3>
			{isMobile ? (
				<div className="grid grid-cols-2 gap-2 m-4">
					{brandOptions.map((brand, index) => (
						<div
							key={index}
							className="flex items-center text-lg cursor-pointer"
							onClick={() => handleBrandSelection(brand.name)}
						>
							<Image
								src={brand.logo}
								alt={"logo de " + brand.name}
								height={30}
								width={30}
								className="mx-2"
								style={{ width: "auto", height: "auto" }}
								priority={true}
							/>
							<label>{brand.name}</label>
						</div>
					))}
				</div>
			) : (
				<fieldset className="grid grid-cols-5 gap-6 m-6 p-4 bg-gray-100 text-gray-700 rounded-2xl">
					{brandOptions.map((brand, index) => (
						<div
							key={index}
							className="flex items-center text-lg"
							onClick={() => handleBrandSelection(brand.name)}
							style={{ cursor: "pointer" }}
						>
							<Image
								src={brand.logo}
								alt={"logo de " + brand.name}
								height={50}
								width={50}
								className="mx-3"
								style={{ width: "auto", height: "auto" }}
								priority={true}
							/>
							<label>{brand.name}</label>
						</div>
					))}
				</fieldset>
			)}
			<div className="flex flex-wrap justify-center mb-6">
				<div className="flex flex-wrap justify-center mb-6 mt-20">
					<select
						value={selectedFuelType}
						onChange={(e) => {
							setSelectedFuelType(e.target.value);
							handleFuelTypeFilterChange(e.target.value);
							handleFilter();
						}}
						className="p-2 border-2 border-lime-500 rounded-md text-center text-xl mb-2 mx-2 w-full sm:w-auto"
					>
						<option value="">Carburant</option>
						<option value="Essence">Essence</option>
						<option value="Diesel">Diesel</option>
						<option value="Hybride">Hybride</option>
						<option value="Électrique">Électrique</option>
					</select>
				</div>
				<div className="text-xl mx-2 mt-20">
					<select
						value={priceMin}
						onChange={(e) => {
							setPriceMin(e.target.value);
							handlePriceFilterChange(e.target.value);
							handleFilter();
						}}
						className="p-2 border-2 border-lime-500 rounded-md text-center text-xl mb-2 mx-2 w-full sm:w-auto"
					>
						<option className="text-gray-400" value="">
							Prix minimum
						</option>
						<option value="10000">10 000</option>
						<option value="20000">20 000</option>
						<option value="30000">30 000</option>
						<option value="40000">40 000</option>
						<option value="50000">50 000</option>
						<option value="60000">60 000</option>
						<option value="70000">70 000</option>
						<option value="80000">80 000</option>
						<option value="90000">90 000</option>
						<option value="100000">100 000</option>
					</select>
				</div>
				<div className="text-xl mx-2 mt-20">
					<select
						value={priceMax}
						onChange={(e) => {
							setPriceMax(e.target.value);
							handlePriceFilterChange(e.target.value);
							handleFilter();
						}}
						className="p-2 border-2 border-lime-500 rounded-md text-center text-xl mb-2 mx-2 w-full sm:w-auto"
					>
						<option className="text-gray-400" value="">
							Prix maximum
						</option>
						<option value="10000">10 000</option>
						<option value="20000">20 000</option>
						<option value="30000">30 000</option>
						<option value="40000">40 000</option>
						<option value="50000">50 000</option>
						<option value="60000">60 000</option>
						<option value="70000">70 000</option>
						<option value="80000">80 000</option>
						<option value="90000">90 000</option>
						<option value="100000">100 000</option>
					</select>
				</div>
				<div>
					<p className="text-lg p-4">Marques sélectionnées:</p>
					<ul>
						{selectedBrands.map((brand, index) => (
							<li key={index}>{brand}</li>
						))}
					</ul>
				</div>
				<button
					onClick={resetAllFilters}
					className="btn btn-secondary text-lg p-2 mx-2"
				>
					Réinitialiser les filtres
				</button>
			</div>
		</div>
	);
};

export default SearchFilters;
