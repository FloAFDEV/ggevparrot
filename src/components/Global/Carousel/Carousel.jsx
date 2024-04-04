import React, { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ isOpen, images, currentCarAnnonceId }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {}, [images, currentCarAnnonceId]);

	const changeImage = (index) => {
		setCurrentImageIndex(index);
	};

	// Filtrer les images en fonction de l'ID de l'annonce actuelle
	const filteredImages = images
		? images.filter((image) => image.Id_CarAnnonce === currentCarAnnonceId)
		: [];

	return (
		<div className={`carousel ${isOpen ? "open" : ""}`}>
			<div className="h-96 max-w-screen-md carousel-vertical">
				{filteredImages.map((image, index) => (
					<div
						key={index}
						className={`carousel-item w-full${
							index === currentImageIndex ? " active" : ""
						}`}
						onClick={() => changeImage(index)}
					>
						<Image
							src={image.image_url}
							alt={image.imageName}
							className="w-full max-h-full object-cover text-white"
							width={512}
							height={512}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
