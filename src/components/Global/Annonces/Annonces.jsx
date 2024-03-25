import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
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
	const [searchTerm, setSearchTerm] = useState("");
	const [isMobileScreen, setIsMobileScreen] = useState(false);

	// J'utilise useEffect pour surveiller les changements de taille de l'écran et mettre à jour l'état correspondant
	useEffect(() => {
		const handleResize = () => {
			setIsMobileScreen(window.innerWidth <= 768); // Largeur de 768px ou moins comme une taille d'écran mobile
		};
		handleResize(); // Appel initial pour définir la valeur initiale
		window.addEventListener("resize", handleResize); // Ajoute un écouteur d'événements pour les changements de taille de l'écran
		return () => {
			window.removeEventListener("resize", handleResize); // Nettoie l'écouteur d'événements lors du démontage du composant
		};
	}, []);

	// Récupération des annonces
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

	// Fonction pour basculer l'affichage de la description de l'annonce
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

	const handleSearch = (event) => {
		const searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);
		const filtered = allAnnonces.filter((annonce) =>
			annonce.annonce_title.toLowerCase().includes(searchTerm)
		);
		setFilteredAnnonces(filtered);
	};

	return (
		<div id="annonces" className="flex flex-col pb-10 pt-8">
			<h2 className="text-5xl bg-base-100 font-bold m-8 p-6">
				Nos annonces
			</h2>
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
			<div
				className={`grid grid-cols-2 ${
					isMobileScreen
						? "sm:grid-cols-2"
						: "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
				} gap-4 px-4`}
			>
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
										isMobileScreen ? "p-2 text-sm" : "" // Ajout de marges plus petites sur les écrans mobiles
									}`}
								>
									<figure>
										<Image
											src={
												annonce.main_image_url &&
												annonce.main_image_url !== ""
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
										<h2 className="card-title text-lg font-semibold text-start">
											{annonce.annonce_title}{" "}
										</h2>
										{isMobileScreen ? null : ( // Masque la description sur les petits écrans
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
										<p className="text-end text-lg font-bold ">
											Prix: {Math.round(annonce.price)} €
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
			{showModal && (
				<Modal
					annonce={modalAnnonce}
					handleCloseModal={handleCloseModal}
					imagesData={imagesData}
					// -> props nécessaires pour la modal
				/>
			)}
		</div>
	);
};

export default Annonces;
