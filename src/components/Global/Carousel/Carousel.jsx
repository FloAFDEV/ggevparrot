import React, { useState, useEffect } from "react";

const Carousel = ({ isOpen, images, currentCarAnnonceId }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		console.log("images:", images);
		console.log("currentCarAnnonceId:", currentCarAnnonceId);
	}, [images, currentCarAnnonceId]);

	// Filtrer les images en fonction de l'ID de l'annonce actuelle
	const filteredImages = images
		? images.filter((image) => image.Id_CarAnnonce === currentCarAnnonceId)
		: [];

	const goToPreviousImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
		);
	};

	const goToNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className={`carousel ${isOpen ? "open" : ""}`}>
			<div className="h-96 carousel carousel-vertical">
				{filteredImages.map((image, index) => (
					<div
						key={index}
						className={`carousel-item w-full${
							index === currentImageIndex ? "active" : ""
						}`}
					>
						<img
							src={image.image_url}
							alt={image.imageName}
							className="w-full max-h-72 object-cover text-white"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
