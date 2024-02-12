import React, { useEffect, useState } from "react";
import Annonce from "./Annonce";
import Modal from "./Modal";

const Annonces = () => {
	const [allAnnonces, setAllAnnonces] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [modalAnnonce, setModalAnnonce] = useState(null);
	const [showModal, setShowModal] = useState(false);

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
				console.error(
					"Erreur lors de la récupération des annonces:",
					error
				);
			} finally {
				setIsLoading(false);
			}
		};
		fetchAnnonces();
	}, []);

	const handleOpenModal = (annonce) => {
		setModalAnnonce(annonce);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className="flex flex-col">
			<h1>Annonces</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{allAnnonces.map(
					(annonce) =>
						// Si l'annonce n'est pas validée, ne pas l'afficher
						annonce.annonce_valid === 1 && (
							<div
								key={annonce.annonce_title}
								className="card flex flex-col shadow-2xl bg-violet-500 pb-10"
							>
								<div className="flex items-center justify-between">
									<img
										src={annonce.main_image_url}
										alt={annonce.annonce_title}
										className="w-24 h-24 object-cover rounded"
									/>
									<div>
										<h2>{annonce.annonce_title}</h2>
										<p>Marque: {annonce.brand_name}</p>
										<p>Modèle: {annonce.model_name}</p>
										<p>Kilométrage: {annonce.mileage} km</p>
										<p>Prix: {annonce.price} €</p>
									</div>
									<button
										onClick={() => handleOpenModal(annonce)}
									>
										En savoir plus
									</button>
								</div>
							</div>
						)
				)}
			</div>
			{isLoading && <p>Chargement...</p>}
			{showModal && (
				<Modal
					annonce={modalAnnonce}
					handleCloseModal={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default Annonces;
