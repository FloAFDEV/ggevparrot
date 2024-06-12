import React, { useEffect, useState, useCallback } from "react";
import Modal from "../Modal/Modal";
import SearchFilters from "../SearchFilters/SearchFilters";
import Image from "next/image";
import TracingBeam from "@/components/ui/TracingBeam";
import {
	BASE_URL,
	fetchAllAnnonces,
	fetchAllImages,
} from "@/components/utils/apiService";

const Annonces = () => {
	const [allAnnonces, setAllAnnonces] = useState([]);
	const [filteredAnnonces, setFilteredAnnonces] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [modalAnnonce, setModalAnnonce] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);
	const [imagesData, setImagesData] = useState([]);
	const [isMobileScreen, setIsMobileScreen] = useState(false);
	const [priceMaxFilter, setPriceMaxFilter] = useState("");
	const [priceMinFilter, setPriceMinFilter] = useState("");
	const [yearFilter, setYearFilter] = useState("");
	const [brandFilter, setBrandFilter] = useState([]);
	const [fuelTypeFilter, setFuelTypeFilter] = useState("");

	useEffect(() => {
		const handleResize = () => {
			setIsMobileScreen(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const annoncesData = await fetchAllAnnonces(BASE_URL);
				setAllAnnonces(annoncesData);
				setFilteredAnnonces(annoncesData);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		if (allAnnonces.length === 0) {
			fetchData();
		}
	}, [allAnnonces]);

	useEffect(() => {
		handleSearch();
	}, [
		priceMinFilter,
		priceMaxFilter,
		yearFilter,
		brandFilter,
		fuelTypeFilter,
		allAnnonces,
	]);

	const handleSearch = useCallback(() => {
		let filtered = [...allAnnonces];
		filtered = filtered.filter((annonce) => {
			return (
				(priceMinFilter === "" ||
					annonce.price >= parseInt(priceMinFilter)) &&
				(priceMaxFilter === "" ||
					annonce.price <= parseInt(priceMaxFilter)) &&
				(yearFilter === "" ||
					annonce.manufacture_year === parseInt(yearFilter)) &&
				(brandFilter.length === 0 ||
					brandFilter.some((brand) =>
						annonce.brand_name
							.toLowerCase()
							.includes(brand.toLowerCase())
					)) &&
				(!fuelTypeFilter ||
					annonce.fuel_type.toLowerCase() ===
						fuelTypeFilter.toLowerCase())
			);
		});
		setFilteredAnnonces(filtered);
	}, [
		allAnnonces,
		priceMinFilter,
		priceMaxFilter,
		yearFilter,
		brandFilter,
		fuelTypeFilter,
	]);

	const handleBrandFilterChange = useCallback(
		(brands) => {
			setBrandFilter(brands.split(","));
		},
		[setBrandFilter]
	);

	const handleFuelTypeFilterChange = (value) => {
		setFuelTypeFilter(value);
	};

	const handlePriceFilterChange = (value, filterType) => {
		if (filterType === "min") {
			setPriceMinFilter(value);
		} else if (filterType === "max") {
			setPriceMaxFilter(value);
		}
	};

	const handleResetFilters = () => {
		setPriceMinFilter("");
		setPriceMaxFilter("");
		setYearFilter("");
		setBrandFilter([]);
		setFuelTypeFilter("");
		handleSearch();
	};

	const handleOpenModal = async (annonce) => {
		setModalAnnonce(annonce);
		setShowModal(true);
		try {
			const images = await fetchAllImages(BASE_URL);
			setImagesData(images);
		} catch (error) {
			console.error("Erreur lors de la récupération des images :", error);
			setImagesData([]);
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<TracingBeam>
			<div id="annonces" className="flex pb-10 pt-8 z-50 justify-center">
				<div className="w-full px-2 max-w-[1500px]">
					<h2 className="text-5xl font-bold m-8 p-6 relative bg-base-100">
						<span className="bg-gradient-to-r from-orange-500 to-purple-700 text-transparent bg-clip-text">
							Découvrez nos annonces
						</span>
					</h2>
					<div className="flex flex-col md:flex-row w-full">
						<div className="md:w-1/4 p-4">
							<SearchFilters
								handleFilter={handleSearch}
								handleFuelTypeFilterChange={
									handleFuelTypeFilterChange
								}
								handlePriceFilterChange={
									handlePriceFilterChange
								}
								handleBrandFilterChange={
									handleBrandFilterChange
								}
								resetFilters={handleResetFilters}
								priceMinFilter={priceMinFilter}
								priceMaxFilter={priceMaxFilter}
								yearFilter={yearFilter}
								brandFilter={brandFilter}
								fuelTypeFilter={fuelTypeFilter}
							/>
						</div>
						<div className="md:w-3/4 p-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
								{error && <p>Erreur: {error}</p>}
								{isLoading ? (
									<span className="loading loading-spinner loading-lg h-40">
										<p>Chargement...</p>
									</span>
								) : (
									filteredAnnonces.map((annonce) => (
										<div
											key={annonce.annonce_title}
											className={`max-w-[300px] card rounded-lg border-4 shadow-lg flex flex-col justify-around items-center relative sm:max-w-sm mx-auto ${
												isMobileScreen
													? "p-2 text-sm"
													: ""
											} transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
										>
											<figure>
												<Image
													src={
														annonce.main_image_url &&
														annonce.main_image_url !==
															""
															? annonce.main_image_url
															: "/assets/CarDefaultImage.webp"
													}
													alt={annonce.annonce_title}
													className="rounded-t-md w-full h-full object-cover"
													width={300}
													height={150}
													priority={true}
												/>
											</figure>
											<div className="card-body p-1 w-full">
												<h2
													className={`card-title font-bold ${
														isMobileScreen
															? "text-base text-end"
															: "text-lg text-end"
													}`}
												>
													{annonce.annonce_title}
												</h2>
												{isMobileScreen ? null : (
													<div className="text-end font-light">
														Année:{" "}
														{
															annonce.manufacture_year
														}
														<br />
														{annonce.color} <br />
														{annonce.fuel_type}
														<br />
														{annonce.mileage} km
														<p>
															Catégorie:{" "}
															{
																annonce.category_model
															}
														</p>
													</div>
												)}
												<p className="text-end font-semibold">
													Prix:{" "}
													{Math.round(annonce.price)}{" "}
													€
												</p>{" "}
												<p className="text-xs font-thin text-end mt-2 mb-1">
													À partir de{" "}
													{(
														(annonce.price - 3000) /
														60
													).toFixed(2)}{" "}
													€/mois
												</p>
												<div className="card-actions justify-end m-1 pt-2 ">
													<button
														onClick={() =>
															handleOpenModal(
																annonce
															)
														}
														className="btn btn-primary text-lg absolute bottom-0 right-0 m-1 p-1"
													>
														En savoir plus
													</button>
												</div>
											</div>
											<div className="h-7"></div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<Modal
					annonce={modalAnnonce}
					handleCloseModal={handleCloseModal}
					imagesData={imagesData}
				/>
			)}
			<div className="join">
				<input
					className="join-item btn btn-square"
					type="radio"
					name="options"
					aria-label="1"
					checked
				/>
				<input
					className="join-item btn btn-square"
					type="radio"
					name="options"
					aria-label="2"
				/>
				<input
					className="join-item btn btn-square"
					type="radio"
					name="options"
					aria-label="3"
				/>
				<input
					className="join-item btn btn-square"
					type="radio"
					name="options"
					aria-label="4"
				/>
			</div>
		</TracingBeam>
	);
};

export default Annonces;
