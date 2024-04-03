import React, { useEffect, useState } from "react";
import Image from "next/image";
import { brandOptions } from "../brandsData.ts/brandsData";

const SearchFilters = ({
	handleFilter,
	handleFuelTypeFilterChange,
	handlePriceFilterChange,
	handleBrandFilterChange,
	resetFilters,
}: {
	handleFilter: () => void;
	handleFuelTypeFilterChange: (value: string) => void;
	handlePriceFilterChange: (value: string, type: string) => void; // Deux arguments passés dans la fonction un 'min' et 'max' Price
	handleBrandFilterChange: (value: string) => void;
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
	const handleBrandFilter = (brandName: string) => {
		// Vérifier si la marque est déjà sélectionnée
		if (!selectedBrands.includes(brandName)) {
			// Si elle n'est pas sélectionnée, l'ajouter à la liste des marques sélectionnées
			setSelectedBrands([...selectedBrands, brandName]);
		} else {
			// Sinon, la retirer de la liste des marques sélectionnées
			setSelectedBrands(
				selectedBrands.filter((brand) => brand !== brandName)
			);
		}
	};

	// Effet pour appliquer les filtres lorsque les valeurs changent
	useEffect(() => {
		handleBrandFilterChange(selectedBrands.join(","));
		handleFilter();
	}, [selectedBrands]);

	useEffect(() => {
		handleFilter();
	}, [selectedFuelType, priceMin, priceMax, selectedBrands]);

	// Fonction pour réinitialiser tous les filtres
	const resetAllFilters = () => {
		setPriceMin("");
		setPriceMax("");
		setSelectedBrands([]);
		setSelectedFuelType("");
		resetFilters();
	};

	return (
		<div className="p-4 mb-2">
			<div className="mb-4">
				<h3 className="text-lg font-semibold mb-8">
					Sélectionnez vos marques :
				</h3>
				{isMobile ? (
					<div className="grid grid-cols-2 gap-5 ">
						{brandOptions.map((brand, index) => (
							<div
								key={index}
								className="flex items-center cursor-pointer"
								onClick={() => handleBrandFilter(brand.name)}
								style={{ cursor: "pointer" }}
							>
								<Image
									src={brand.logo}
									alt={"logo de " + brand.name}
									height={40}
									width={40}
									className="mr-2 bg-gray-200 rounded-md bg-opacity-80"
								/>
								<span className="text-sm">{brand.name}</span>
							</div>
						))}
					</div>
				) : (
					<fieldset className="grid grid-cols-5 gap-5 pl-20">
						{brandOptions.map((brand, index) => (
							<div
								key={index}
								className="flex items-center"
								onClick={() => handleBrandFilter(brand.name)}
								style={{ cursor: "pointer" }}
							>
								<Image
									src={brand.logo}
									alt={"logo de " + brand.name}
									height={50}
									width={50}
									className="mr-3 bg-gray-200 rounded-md bg-opacity-80"
								/>
								<span>{brand.name}</span>
							</div>
						))}
					</fieldset>
				)}
			</div>
			<div className="mb-4">
				<div className="flex flex-wrap items-center">
					<select
						value={priceMin}
						onChange={(e) => {
							setPriceMin(e.target.value);
							handlePriceFilterChange(e.target.value, "min");
						}}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm mr-2"
					>
						<option value="">Prix minimum</option>
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
					<select
						value={priceMax}
						onChange={(e) => {
							setPriceMax(e.target.value);
							handlePriceFilterChange(e.target.value, "max");
						}}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm m-2"
					>
						<option value="">Prix maximum</option>
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
					</select>{" "}
					<select
						value={selectedFuelType}
						onChange={(e) => {
							setSelectedFuelType(e.target.value);
							handleFuelTypeFilterChange(e.target.value);
						}}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm mr-2"
					>
						<option value="">Carburant</option>
						<option value="Essence">Essence</option>
						<option value="Diesel">Diesel</option>
						<option value="Hybride">Hybride</option>
						<option value="Électrique">Électrique</option>
					</select>
				</div>{" "}
				<button
					onClick={resetAllFilters}
					className="mt-4 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
				>
					Réinitialiser les filtres
				</button>
				<div className="flex items-center mt-2">
					<p className="text-md p-5 mr-2">Marques sélectionnées:</p>
					<ul className="flex flex-wrap">
						{selectedBrands.map((brand, index) => (
							<li
								key={index}
								className="mr-2 mb-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-xs"
							>
								{brand}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchFilters;
