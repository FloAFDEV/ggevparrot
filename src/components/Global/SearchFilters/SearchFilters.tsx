import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { brandOptions } from "../brandsData/brandsData";
import WindowResize from "../WindowResize/WindowResize";

const SearchFilters = ({
	handleFilter,
	handleFuelTypeFilterChange,
	handlePriceFilterChange,
	handleBrandFilterChange,
	resetFilters,
}: {
	handleFilter: () => void;
	handleFuelTypeFilterChange: (value: string) => void;
	handlePriceFilterChange: (value: string, type: string) => void;
	handleBrandFilterChange: (value: string) => void;
	resetFilters: () => void;
}) => {
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [selectedFuelType, setSelectedFuelType] = useState<string>("");
	const [isMobile, setIsMobile] = useState(false);

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

	const handleBrandFilter = useCallback(
		(brandName: string) => {
			if (!selectedBrands.includes(brandName)) {
				setSelectedBrands([...selectedBrands, brandName]);
			} else {
				setSelectedBrands((prevSelectedBrands) =>
					prevSelectedBrands.filter((brand) => brand !== brandName)
				);
			}
		},
		[selectedBrands]
	);

	useEffect(() => {
		handleBrandFilterChange(selectedBrands.join(","));
	}, [selectedBrands, handleBrandFilterChange]);

	useEffect(() => {
		handleFilter();
	}, [selectedFuelType, priceMin, priceMax, handleFilter]);

	const handlePriceChange = (value: string, type: string) => {
		if (type === "min") {
			setPriceMin(value);
			if (priceMax && parseInt(value) > parseInt(priceMax)) {
				setPriceMax(value);
				handlePriceFilterChange(value, "max");
			}
		} else if (type === "max") {
			setPriceMax(value);
			if (priceMin && parseInt(value) < parseInt(priceMin)) {
				setPriceMin(value);
				handlePriceFilterChange(value, "min");
			}
		}
		handlePriceFilterChange(value, type);
	};

	const resetAllFilters = () => {
		setPriceMin("");
		setPriceMax("");
		setSelectedBrands([]);
		setSelectedFuelType("");
		resetFilters();
	};

	return (
		<div className="p-4">
			<h3 className="text-lg font-semibold mb-8">
				Sélectionnez vos marques :
			</h3>
			{isMobile ? (
				<select
					multiple
					value={selectedBrands}
					onChange={(e) => {
						const selectedOptions = Array.from(
							e.target.selectedOptions,
							(option) => option.value
						);
						setSelectedBrands(selectedOptions);
					}}
					className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm w-full"
				>
					{brandOptions.map((brand, index) => (
						<option key={index} value={brand.name}>
							{brand.name}
						</option>
					))}
				</select>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{brandOptions.map((brand, index) => (
						<div
							key={index}
							className={`flex items-center cursor-pointer ${
								selectedBrands.includes(brand.name)
									? "bg-gray-200"
									: ""
							}`}
							onClick={() => handleBrandFilter(brand.name)}
							style={{ cursor: "pointer" }}
						>
							<Image
								className="mr-2 bg-gray-200 rounded-md bg-opacity-80"
								src={brand.logo}
								width={40}
								height={40}
								priority={true}
								alt={"logo de " + brand.name}
							/>
							<span className="text-sm">{brand.name}</span>
						</div>
					))}
				</div>
			)}
			<div className="mt-4">
				<select
					value={priceMin}
					onChange={(e) => handlePriceChange(e.target.value, "min")}
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
					onChange={(e) => handlePriceChange(e.target.value, "max")}
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
				</select>
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
			</div>
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
	);
};

export default SearchFilters;
