import React, { useEffect, useState, useCallback } from "react";
import Modal from "../Modal/Modal";
import SearchFilters from "../SearchFilters/SearchFilters";
import Image from "next/image";
import {
	BASE_URL,
	fetchAllAnnonces,
	fetchAllImages,
} from "@/components/utils/apiService";
import TracingBeam from "@/components/ui/TracingBeam";

const Annonces = () => {
	// Je déclare les états nécessaires pour gérer les annonces
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

	// Je définis un effet pour détecter le redimensionnement de l'écran
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

	// Je récupère les annonces une fois que le composant est monté
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

	// Je définis la fonction pour filtrer les annonces
	const handleSearch = useCallback(() => {
		let filtered = [...allAnnonces]; // Je fais une copie de toutes les annonces
		filtered = filtered.filter((annonce) => {
			return (
				(priceMinFilter === "" ||
					annonce.price >= parseInt(priceMinFilter)) &&
				(priceMaxFilter === "" ||
					annonce.price <= parseInt(priceMaxFilter)) &&
				(yearFilter === "" ||
					annonce.manufacture_year === parseInt(yearFilter)) &&
				(brandFilter.length === 0 || // Si aucun filtre de marque n'est sélectionné
					brandFilter.some(
						(brand) =>
							annonce.brand_name &&
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

	// Je définis la fonction pour gérer le changement de filtre de marque
	const handleBrandFilterChange = (brands) => {
		setBrandFilter(brands.split(","));
		console.log(brands);
	};

	// Je définis la fonction pour gérer le changement de filtre de type de carburant
	const handleFuelTypeFilterChange = (value) => {
		setFuelTypeFilter(value);
	};

	// Je définis la fonction pour gérer le changement de filtre de prix
	const handlePriceFilterChange = (value, filterType) => {
		if (filterType === "min") {
			setPriceMinFilter(value);
		} else if (filterType === "max") {
			setPriceMaxFilter(value);
		}
	};

	// Je définis la fonction pour réinitialiser les filtres
	const handleResetFilters = () => {
		setPriceMinFilter("");
		setPriceMaxFilter("");
		setYearFilter("");
		setBrandFilter([]);
		setFuelTypeFilter("");
		handleSearch();
	};

	// Je définis la fonction pour ouvrir le modal avec les détails de l'annonce sélectionnée
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

	// Je définis la fonction pour fermer le modal
	const handleCloseModal = () => {
		setShowModal(false);
	};

	// Je déclenche la recherche à chaque changement de filtre
	useEffect(() => {
		handleSearch();
	}, [
		priceMinFilter,
		priceMaxFilter,
		yearFilter,
		brandFilter,
		fuelTypeFilter,
		handleSearch, // Je mets handleSearch en dépendance pour éviter une boucle infinie
	]);

	// Je rends le contenu JSX du composant
	return (
		<TracingBeam>
			<div id="annonces" className="flex pb-10 pt-8">
				<div className="w-full px-4">
					<h2 className="text-5xl bg-base-100 font-bold m-8 p-6">
						Nos annonces
					</h2>
					<div className="w-full h-auto">
						<SearchFilters
							handleFilter={handleSearch}
							handleFuelTypeFilterChange={
								handleFuelTypeFilterChange
							}
							handlePriceFilterChange={handlePriceFilterChange}
							handleBrandFilterChange={handleBrandFilterChange}
							resetFilters={handleResetFilters}
							priceMinFilter={priceMinFilter}
							priceMaxFilter={priceMaxFilter}
							yearFilter={yearFilter}
							brandFilter={brandFilter}
							fuelTypeFilter={fuelTypeFilter}
						/>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
						{error && <p>Erreur: {error}</p>}
						{isLoading ? (
							<span className="loading loading-spinner loading-lg h-40">
								<p>Chargement...</p>
							</span>
						) : (
							filteredAnnonces.map(
								(annonce) =>
									annonce.annonce_valid === 1 && (
										<div
											key={annonce.annonce_title}
											className={`max-w-[300px] cardrounded-lg max-w-70 border-4 shadow-lg flex flex-col justify-around items-center relative sm:max-w-sm mx-auto rounded-lg ${
												isMobileScreen
													? "p-2 text-sm"
													: ""
											}`}
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
													className="rounded-t-lg w-full rounded-lg"
													width={2000}
													height={200}
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
														className="btn btn-primary text-lg absolute bottom-0 right-0 m-2 p-1"
													>
														En savoir plus
													</button>
												</div>
											</div>
											<div className="h-7"></div>
										</div>
									)
							)
						)}
					</div>
				</div>
				{showModal && (
					<Modal
						annonce={modalAnnonce}
						handleCloseModal={handleCloseModal}
						imagesData={imagesData}
					/>
				)}
			</div>
		</TracingBeam>
	);
};

export default Annonces;
