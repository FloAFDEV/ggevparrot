import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { brandOptions } from "../brandsData/brandsData";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface BrandOption {
	name: string;
	logo: string;
}

interface SearchFiltersProps {
	handleFilter: () => void;
	handleFuelTypeFilterChange: (value: string) => void;
	handlePriceFilterChange: (value: string, type: string) => void;
	handleBrandFilterChange: (value: string) => void;
	handleYearFilterChange: (value: string, type: string) => void;
	handleKilometersFilterChange: (value: string, type: string) => void;
	resetFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
	handleFilter,
	handleFuelTypeFilterChange,
	handlePriceFilterChange,
	handleBrandFilterChange,
	handleYearFilterChange,
	handleKilometersFilterChange,
	resetFilters,
}) => {
	const [priceMin, setPriceMin] = useState<string>("");
	const [priceMax, setPriceMax] = useState<string>("");
	const [yearMin, setYearMin] = useState<string>("");
	const [yearMax, setYearMax] = useState<string>("");
	const [kilometersMin, setKilometersMin] = useState<string>("");
	const [kilometersMax, setKilometersMax] = useState<string>("");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [selectedFuelType, setSelectedFuelType] = useState<string>("");
	const [isMobile, setIsMobile] = useState<boolean>(false);

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
	}, [
		selectedFuelType,
		priceMin,
		priceMax,
		yearMin,
		yearMax,
		kilometersMin,
		kilometersMax,
		selectedBrands,
		handleFilter,
	]);

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

	const handleYearChange = (value: string, type: string) => {
		if (type === "min") {
			setYearMin(value);
			if (yearMax && parseInt(value) > parseInt(yearMax)) {
				setYearMax(value);
				handleYearFilterChange(value, "max");
			}
		} else if (type === "max") {
			setYearMax(value);
			if (yearMin && parseInt(value) < parseInt(yearMin)) {
				setYearMin(value);
				handleYearFilterChange(value, "min");
			}
		}
		handleYearFilterChange(value, type);
	};

	const handleKilometersChange = (value: string, type: string) => {
		if (type === "min") {
			setKilometersMin(value);
			if (kilometersMax && parseInt(value) > parseInt(kilometersMax)) {
				setKilometersMax(value);
				handleKilometersFilterChange(value, "max");
			}
		} else if (type === "max") {
			setKilometersMax(value);
			if (kilometersMin && parseInt(value) < parseInt(kilometersMin)) {
				setKilometersMin(value);
				handleKilometersFilterChange(value, "min");
			}
		}
		handleKilometersFilterChange(value, type);
	};

	const resetAllFilters = () => {
		setPriceMin("");
		setPriceMax("");
		setYearMin("");
		setYearMax("");
		setKilometersMin("");
		setKilometersMax("");
		setSelectedBrands([]);
		setSelectedFuelType("");
		resetFilters();
	};

	const brandOptionsFormatted = brandOptions.map((brand) => ({
		value: brand.name,
		label: (
			<div className="flex items-center">
				<Image
					className="mr-2 bg-gray-200 rounded-md bg-opacity-80"
					src={brand.logo}
					width={30}
					height={30}
					alt={"logo de " + brand.name}
				/>
				<span className="text-sm">{brand.name}</span>
			</div>
		),
	}));
	return (
		<div className="flex flex-col md:flex-row p-4">
			<div className="md:w-full text-left">
				<label htmlFor="brandSelect" className="text-sm p-5 mr-2">
					Sélectionnez vos marques
				</label>
				<Select
					closeMenuOnSelect={false}
					components={animatedComponents}
					isMulti
					options={brandOptionsFormatted}
					value={brandOptionsFormatted.filter((option) =>
						selectedBrands.includes(option.value)
					)}
					onChange={(selected) =>
						setSelectedBrands(
							selected
								? selected.map((option) => option.value)
								: []
						)
					}
					placeholder="Toutes les marques"
					className="mb-4 text-accent-content bg-gray-300"
					id="brandSelect"
				/>
				<div className="mt-4 flex flex-col space-y-4">
					<label htmlFor="priceMin" className="sr-only">
						Prix minimum
					</label>
					<select
						id="priceMin"
						value={priceMin}
						onChange={(e) =>
							handlePriceChange(e.target.value, "min")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Prix minimum</option>
						<option value="10000">10 000</option>
						<option value="15000">15 000</option>
						<option value="20000">20 000</option>
						<option value="25000">25 000</option>
						<option value="30000">30 000</option>
						<option value="35000">35 000</option>
						<option value="40000">40 000</option>
						<option value="45000">45 000</option>
						<option value="50000">50 000</option>
						<option value="55000">55 000</option>
						<option value="60000">60 000</option>
						<option value="65000">65 000</option>
						<option value="70000">70 000</option>
						<option value="75000">75 000</option>
						<option value="80000">80 000</option>
						<option value="85000">85 000</option>
						<option value="90000">90 000</option>
						<option value="95000">95 000</option>
						<option value="100000">100 000</option>
					</select>
					<label htmlFor="priceMax" className="sr-only">
						Prix maximum
					</label>
					<select
						id="priceMax"
						value={priceMax}
						onChange={(e) =>
							handlePriceChange(e.target.value, "max")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Prix maximum</option>
						<option value="10000">10 000</option>
						<option value="15000">15 000</option>
						<option value="20000">20 000</option>
						<option value="25000">25 000</option>
						<option value="30000">30 000</option>
						<option value="35000">35 000</option>
						<option value="40000">40 000</option>
						<option value="45000">45 000</option>
						<option value="50000">50 000</option>
						<option value="55000">55 000</option>
						<option value="60000">60 000</option>
						<option value="65000">65 000</option>
						<option value="70000">70 000</option>
						<option value="75000">75 000</option>
						<option value="80000">80 000</option>
						<option value="85000">85 000</option>
						<option value="90000">90 000</option>
						<option value="95000">95 000</option>
						<option value="100000">100 000</option>
					</select>
					<label htmlFor="yearMin" className="sr-only">
						Année minimum
					</label>
					<select
						id="yearMin"
						value={yearMin}
						onChange={(e) =>
							handleYearChange(e.target.value, "min")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Année minimum</option>
						<option value="2000">2000</option>
						<option value="2001">2001</option>
						<option value="2002">2002</option>
						<option value="2003">2003</option>
						<option value="2004">2004</option>
						<option value="2005">2005</option>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
						<option value="2009">2009</option>
						<option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
						<option value="2020">2020</option>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
						<option value="2024">2024</option>
					</select>
					<label htmlFor="yearMax" className="sr-only">
						Année maximum
					</label>
					<select
						id="yearMax"
						value={yearMax}
						onChange={(e) =>
							handleYearChange(e.target.value, "max")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Année maximum</option>
						<option value="2000">2000</option>
						<option value="2001">2001</option>
						<option value="2002">2002</option>
						<option value="2003">2003</option>
						<option value="2004">2004</option>
						<option value="2005">2005</option>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
						<option value="2009">2009</option>
						<option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
						<option value="2020">2020</option>
						<option value="2021">2021</option>
						<option value="2022">2022</option>
						<option value="2023">2023</option>
						<option value="2024">2024</option>
					</select>
					<label htmlFor="kilometersMin" className="sr-only">
						Kilomètres minimum
					</label>
					<select
						id="kilometersMin"
						value={kilometersMin}
						onChange={(e) =>
							handleKilometersChange(e.target.value, "min")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Kilomètres minimum</option>
						<option value="0">0</option>
						<option value="20000">20 000</option>
						<option value="30000">30 000</option>
						<option value="40000">40 000</option>
						<option value="50000">50 000</option>
						<option value="60000">60 000</option>
						<option value="70000">70 000</option>
						<option value="80000">80 000</option>
						<option value="90000">90 000</option>
						<option value="100000">100 000</option>
						<option value="110000">110 000</option>
						<option value="120000">120 000</option>
						<option value="130000">130 000</option>
						<option value="140000">140 000</option>
						<option value="150000">150 000</option>
						<option value="160000">160 000</option>
						<option value="170000">170 000</option>
						<option value="180000">180 000</option>
						<option value="190000">190 000</option>
						<option value="200000">200 000</option>
					</select>
					<label htmlFor="kilometersMax" className="sr-only">
						Kilomètres maximum
					</label>
					<select
						id="kilometersMax"
						value={kilometersMax}
						onChange={(e) =>
							handleKilometersChange(e.target.value, "max")
						}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
					>
						<option value="">Kilomètres maximum</option>
						<option value="20000">20 000</option>
						<option value="30000">30 000</option>
						<option value="40000">40 000</option>
						<option value="50000">50 000</option>
						<option value="60000">60 000</option>
						<option value="70000">70 000</option>
						<option value="80000">80 000</option>
						<option value="90000">90 000</option>
						<option value="100000">100 000</option>
						<option value="110000">110 000</option>
						<option value="120000">120 000</option>
						<option value="130000">130 000</option>
						<option value="140000">140 000</option>
						<option value="150000">150 000</option>
						<option value="160000">160 000</option>
						<option value="170000">170 000</option>
						<option value="180000">180 000</option>
						<option value="190000">190 000</option>
						<option value="200000">200 000</option>
					</select>
					<label htmlFor="fuelType" className="sr-only">
						Carburant
					</label>
					<select
						id="fuelType"
						value={selectedFuelType}
						onChange={(e) => {
							setSelectedFuelType(e.target.value);
							handleFuelTypeFilterChange(e.target.value);
						}}
						className="p-2 border border-gray-300 bg-gray-300 text-gray-700 rounded-md text-sm"
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
				<div className="flex items-center justify-start mt-2">
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
