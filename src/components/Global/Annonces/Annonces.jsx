import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import {
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const annoncesData = await fetchAllAnnonces();
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

	const handleOpenModal = async (annonce) => {
		setModalAnnonce(annonce);
		setShowModal(true);
		try {
			const images = await fetchAllImages();
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
		<div id="annonces" className="flex flex-col pb-10 pt-10">
			<h1 className="text-5xl bg-base-100 font-bold m-8 p-6">
				Nos annonces
			</h1>
			<div className="flex justify-center mb-6">
				<input
					type="text"
					placeholder="Recherche..."
					value={searchTerm}
					onChange={handleSearch}
					className="p-2 border-2 border-lime-500 rounded-md text-center text-xl"
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 px-4">
				{error && <p>Erreur: {error}</p>}
				{isLoading ? (
					<span className="loading loading-infinity loading-lg">
						<p>Chargement...</p>
					</span>
				) : (
					filteredAnnonces.map(
						(annonce) =>
							annonce.annonce_valid === 1 && (
								<div
									key={annonce.annonce_title}
									className="cardrounded-lg border-4 shadow-lg flex flex-col justify-around items-center relative sm:max-w-sm mx-auto rounded-lg"
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
											width={320}
											height={320}
											priority={true}
										/>
									</figure>
									<div className="card-body p-1">
										<h2 className="card-title text-xl font-semibold text-start m-2">
											{annonce.annonce_title}{" "}
										</h2>
										<span className="text-end font-thin">
											Année: {annonce.manufacture_year}{" "}
											{annonce.color} {annonce.fuel_type}
											<br />
											{annonce.mileage} km
											<p>
												Catégorie:{" "}
												{annonce.category_model}
											</p>
											<p className="text-end text-xl font-bold">
												{Math.round(annonce.price)} €
											</p>
										</span>
										<div className="card-actions justify-end m-1">
											<button
												onClick={() =>
													handleOpenModal(annonce)
												}
												className="btn btn-secondary text-lg"
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
					// -> props nécessaires pour la modal
				/>
			)}
		</div>
	);
};

export default Annonces;
