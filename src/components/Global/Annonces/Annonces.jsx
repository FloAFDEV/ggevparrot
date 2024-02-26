import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import {
	fetchAllAnnonces,
	fetchAllImages,
} from "../../../pages/api/apiService";

const Annonces = () => {
	const [allAnnonces, setAllAnnonces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [modalAnnonce, setModalAnnonce] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);
	const [imagesData, setImagesData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const annoncesData = await fetchAllAnnonces();
				setAllAnnonces(annoncesData);
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

	const handleOpenModal = async (annonce) => {
		setModalAnnonce(annonce);
		setShowModal(true);
		const images = await fetchAllImages(annonce.Id_CarAnnonce);
		setImagesData(images);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className="flex flex-col pb-40">
			<h1
				id="annonces"
				className="text-5xl bg-base-100 font-bold m-8 p-6"
			>
				Nos annonces
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
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
											{annonce.color} -{" "}
											{annonce.fuel_type}
											<br />
											{annonce.mileage} km
										</p>
										<div className="card-actions justify-end mt-4">
											<p className="text-start">Prix:</p>
											<p className="text-end text-xl">
												{" "}
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
					// Ajoutez ici les autres props nécessaires pour le modal
				/>
			)}
		</div>
	);
};

export default Annonces;
