import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import SearchFilters from "../SearchFilters/SearchFilters";
import Image from "next/image";
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
	const [priceFilter, setPriceFilter] = useState("");
	const [yearFilter, setYearFilter] = useState("");
	const [brandFilter, setBrandFilter] = useState("");
	const [fuelTypeFilter, setFuelTypeFilter] = useState("");
	const [priceMin, setPriceMin] = useState("");
	const [priceMax, setPriceMax] = useState("");

	// Effet pour détecter le redimensionnement de l'écran
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

	// Effet pour récupérer les annonces une fois que le composant est monté
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

	// Effet pour appliquer les filtres lorsque les valeurs des filtres changent
	useEffect(() => {
		handleSearch();
	}, [priceFilter, yearFilter, brandFilter, fuelTypeFilter]);

	// Fonction pour filtrer les annonces en fonction des filtres sélectionnés
	const handleSearch = () => {
		let filtered = [...allAnnonces]; // Copie de allAnnonces
		filtered = filtered.filter((annonce) => {
			return (
				(priceFilter === "" ||
					annonce.price >= parseInt(priceFilter)) &&
				(priceMax === "" || annonce.price <= parseInt(priceMax)) && // Utilisation de priceMax
				(yearFilter === "" ||
					annonce.manufacture_year === parseInt(yearFilter)) &&
				(!brandFilter || // Vérifie si brandFilter est vide ou non défini
					(annonce.brand &&
						annonce.brand
							.toLowerCase()
							.includes(brandFilter.toLowerCase()))) &&
				(!fuelTypeFilter ||
					annonce.fuel_type.toLowerCase() ===
						fuelTypeFilter.toLowerCase())
			);
		});
		setFilteredAnnonces(filtered);
	};

	// Fonction de gestion du changement de filtre de marque
	const handleBrandFilterChange = (value) => {
		setBrandFilter(value);
	};

	// Fonction de gestion du changement de filtre de type de carburant
	const handleFuelTypeFilterChange = (value) => {
		setFuelTypeFilter(value);
	};

	// Fonction de gestion du changement de filtre de prix
	const handlePriceFilterChange = (value) => {
		setPriceFilter(value);
	};

	// Fonction de réinitialisation des filtres
	const handleResetFilters = () => {
		setPriceFilter("");
		setYearFilter("");
		setBrandFilter("");
		setFuelTypeFilter("");
		handleSearch();
	};

	// Fonction pour ouvrir le modal avec les détails de l'annonce sélectionnée
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

	// Fonction pour fermer le modal
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div id="annonces" className="flex pb-10 pt-8">
			<div className="w-full px-4">
				<h2 className="text-5xl bg-base-100 font-bold m-8 p-6">
					Nos annonces
				</h2>
				<SearchFilters
					handleFilter={handleSearch}
					handleFuelTypeFilterChange={handleFuelTypeFilterChange}
					handlePriceFilterChange={handlePriceFilterChange}
					handleBrandFilterChange={handleBrandFilterChange}
					resetFilters={handleResetFilters}
					priceFilter={priceFilter} // Utilisation de la valeur du filtre de prix
					yearFilter={yearFilter} // Utilisation de la valeur du filtre d'année
					brandFilter={brandFilter} // Utilisation de la valeur du filtre de marque
					fuelTypeFilter={fuelTypeFilter} // Utilisation de la valeur du filtre de type de carburant
				/>
				<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
					{error && <p>Erreur: {error}</p>}
					{isLoading ? (
						<span className="loading loading-spinner loading-lg h-30">
							<p>Chargement...</p>
						</span>
					) : (
						filteredAnnonces.map(
							(annonce) =>
								annonce.annonce_valid === 1 && (
									<div
										key={annonce.annonce_title}
										className={`max-w-[300px] cardrounded-lg max-w-70 border-4 shadow-lg flex flex-col justify-around items-center relative sm:max-w-sm mx-auto rounded-lg ${
											isMobileScreen ? "p-2 text-sm" : ""
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
												width={200}
												height={200}
												priority={true}
											/>
										</figure>
										<div className="card-body p-1 w-full">
											<h2 className="card-title font-bold text-start">
												{annonce.annonce_title}{" "}
											</h2>
											{isMobileScreen ? null : (
												<div className="text-end font-light">
													Année:{" "}
													{annonce.manufacture_year}
													<br />
													{annonce.color} <br />
													{annonce.fuel_type}
													<br />
													{annonce.mileage} km
													<p>
														Catégorie:{" "}
														{annonce.category_model}
													</p>
												</div>
											)}
											<p className="text-end font-semibold">
												Prix:{" "}
												{Math.round(annonce.price)} €
											</p>{" "}
											<p className="text-xs font-thin text-end">
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
														handleOpenModal(annonce)
													}
													className="btn btn-secondary text-lg absolute bottom-0 right-0 m-2 p-1"
												>
													En savoir plus
												</button>
											</div>
										</div>
										<div className="h-9"></div>
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
	);
};

export default Annonces;
