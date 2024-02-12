import React, { useState, useEffect } from "react";
import Annonce from "./Annonce";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Modal = ({ annonce, handleCloseModal }) => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(
					`http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/images_${annonce.Id_CarAnnonce}`
				);
				if (!response.ok) {
					throw new Error(
						"Erreur lors de la récupération des images"
					);
				}
				const data = await response.json();
				if (Array.isArray(data)) {
					setImages(data);
				} else {
					console.error(
						"La réponse de l'API n'est pas un tableau :",
						data
					);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des images:",
					error
				);
			}
		};
		fetchImages();
	}, [annonce.Id_CarAnnonce]);

	const closeModal = () => {
		handleCloseModal();
	};

	if (!annonce) {
		return null;
	}
	return (
		<div
			className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
			onClick={closeModal}
		>
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full relative sm:max-w-lg sm:w-auto">
				<button
					onClick={closeModal}
					className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 dark:text-gray-300 hover:dark:text-gray-200"
				>
					&times;
				</button>
				<Carousel showArrows={true} infiniteLoop={true}>
					{images.map((image, index) => (
						<div key={index}>
							<img src={image.image_url} alt={`Image ${index}`} />
						</div>
					))}
				</Carousel>
				<Annonce annonce={annonce} />
			</div>
		</div>
	);
};

export default Modal;
