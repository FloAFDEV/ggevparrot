import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Annonce from "../Annonces/Annonce";

const Annonces = () => {
	const [allAnnonces, setAllAnnonces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [modalAnnonce, setModalAnnonce] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);
	const [imagesData, setImagesData] = useState([]);
	const [isCarouselOpen, setIsCarouselOpen] = useState(false);

	useEffect(() => {
		const fetchAnnonces = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					"http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/annonces"
				);
				if (!response.ok) {
					throw new Error(
						`Erreur lors de la récupération des annonces: ${response.status}`
					);
				}
				const data = await response.json();
				setAllAnnonces(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (allAnnonces.length === 0) {
			fetchAnnonces();
		}
	}, [allAnnonces]);

	const handleOpenModal = (annonce) => {
		setModalAnnonce(annonce);
		setShowModal(true);
		fetchImageDataForAnnonce(annonce.Id_CarAnnonce);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const toggleCarousel = () => {
		setIsCarouselOpen(!isCarouselOpen);
	};

	const fetchImageDataForAnnonce = async (annonceId) => {
		try {
			const response = await fetch(
				`http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/images?annonceId=${annonceId}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreur lors de la récupération des images pour l'annonce ${annonceId}: ${response.status}`
				);
			}
			const data = await response.json();
			setImagesData(data);
		} catch (error) {
			console.error("Erreur lors de la récupération des images:", error);
			setImagesData([]);
		}
	};

	return (
		<div className="flex flex-col">
			<h1 className="flex min-h-full items-center justify-center p-4 text-center">
				Nos annonces
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{error && <p>Erreur: {error}</p>}
				{isLoading ? (
					<p>Chargement...</p>
				) : (
					allAnnonces.map(
						(annonce) =>
							annonce.annonce_valid === 1 && (
								<div
									key={annonce.annonce_title}
									className="card w-96 mx-auto bg-gray-100 rounded-lg border-2 border-gray-200 shadow-md text-black flex flex-col justify-center items-center relative"
								>
									<figure>
										<img
											src={annonce.main_image_url}
											alt={annonce.annonce_title}
											className="rounded-t-lg"
										/>
									</figure>
									<div className="card-body p-1">
										<h2 className="card-title text-xl font-semibold mb-2 text-start">
											{annonce.annonce_title}{" "}
										</h2>
										<p className="text-gray-800 text-end">
											{annonce.color} {annonce.fuel_type}
											{" / "}
											{annonce.mileage} km
										</p>
										<div className="card-actions justify-end mt-4">
											<p className="text-gray-800 text-center text-xl">
												Prix:{" "}
												{Math.round(annonce.price)} €
											</p>
											<button
												onClick={() =>
													handleOpenModal(annonce)
												}
												className="btn btn-primary justify-end"
											>
												En savoir plus
											</button>
										</div>
									</div>
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
				/>
			)}
		</div>
	);
};

export default Annonces;
