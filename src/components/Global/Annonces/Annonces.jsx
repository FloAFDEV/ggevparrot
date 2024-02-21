import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Annonce from "../Annonces/Annonce";
import Image from "next/image";

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
					`Erreur lors de la récupération des images pour l&apos;annonce ${annonceId}: ${response.status}`
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
			<h1
				id="annonces"
				className="text-5xl bg-neutral-content font-bold m-4 p-6"
			>
				Nos annonces
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4">
				{error && <p>Erreur: {error}</p>}
				{isLoading ? (
					<p>Chargement...</p>
				) : (
					allAnnonces.map(
						(annonce) =>
							annonce.annonce_valid === 1 && (
								<div
									key={annonce.annonce_title}
									className="cardrounded-lg border-2 shadow-lg flex flex-col justify-around items-center relative sm:max-w-s mx-auto rounded-lg"
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
											className="rounded-t-lg"
											width={465}
											height={465}
										/>
									</figure>
									<div className="card-body p-1">
										<h2 className="card-title text-xl font-semibold mb-2 text-start">
											{annonce.annonce_title}{" "}
										</h2>
										<p className="text-end">
											{annonce.color} {annonce.fuel_type}
											{" / "}
											{annonce.mileage} km
										</p>
										<div className="card-actions justify-end mt-4">
											<p className="text-center text-xl">
												Prix:{" "}
												{Math.round(annonce.price)} €
											</p>
											<button
												onClick={() =>
													handleOpenModal(annonce)
												}
												className="btn btn-secondary justify-end text-lg"
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
					Id_CarAnnonce={modalAnnonce.Id_CarAnnonce}
				/>
			)}
		</div>
	);
};

export default Annonces;
