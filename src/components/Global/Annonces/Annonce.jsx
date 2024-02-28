import React, { useState } from "react";
import Image from "next/image";

const Annonce = ({ annonce, toggleCarousel }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [carouselVisible, setCarouselVisible] = useState(false);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	const handleToggleCarousel = () => {
		toggleCarousel(); // Appel de la fonction de basculement du carousel
		setCarouselVisible(!carouselVisible); // Inversion de l'état du carousel
	};

	if (!annonce) {
		return (
			<div className="p-4 bg-gray-300">
				Détails de l'annonce incomplets
			</div>
		);
	}

	const {
		annonce_title,
		main_image_url,
		description,
		brand_logo_url,
		options_name,
		manufacture_year,
		power,
		power_unit,
		mileage,
		fuel_type,
		model_name,
		category_model,
		brand_name,
		color,
		price,
	} = annonce;

	const firstEightWords = description.split(" ").slice(0, 8).join(" ");
	const remainingDescription = description.split(" ").slice(8).join(" ");
	const descriptionToShow =
		!showFullDescription && remainingDescription
			? `${firstEightWords}...`
			: description;

	return (
		<div
			className="p-4 bg-white text-blue-950 rounded-lg shadow-md"
			style={{ maxHeight: "80vh", overflowY: "auto" }}
		>
			<h3 className="font-bold text-2xl mb-2">{annonce_title}</h3>
			<div className="flex items-center mb-4">
				<Image
					src={brand_logo_url}
					alt="Logo de la marque"
					className="w-auto h-16 mr-2"
					width={128}
					height={128}
				/>
				<div className="text-lg font-semibold p4">
					{brand_name} {model_name} {color}
					<p>Catégorie: {category_model}</p>
				</div>
			</div>
			<div className="relative">
				<Image
					src={main_image_url}
					alt={annonce_title}
					className="w-full max-h-64 object-cover rounded-lg my-4"
					width={256}
					height={256}
					priority={true}
				/>
				<button
					className="btn absolute top-0 right-0 p-2 m-2 text-primary hover:text-secondary rounded-md bg-opacity-50"
					onClick={handleToggleCarousel}
				>
					{carouselVisible ? "Moins d'images" : "Plus d'images"}
				</button>
			</div>
			<p className="text-start pt-3">Description:</p>
			<p className="text-start font-light">
				{descriptionToShow}
				{remainingDescription && (
					<span className="color-primary-900 font-extra-bold cursor-pointer hover:text-secondary">
						{" "}
						<button
							className="font-bold"
							onClick={toggleDescription}
						>
							{showFullDescription
								? " / Réduire"
								: "Afficher la suite"}
						</button>
					</span>
				)}
			</p>
			<p className="mt-6 text-start">
				Équipements et options:{" "}
				<Image
					src="/assets/icons/energyIcon.svg"
					alt="Energy Icon"
					className="w-auto h-10 inline-block"
					width={32}
					height={32}
				/>
			</p>
			<p className="mb-4 text-left font-light">{options_name}</p>
			<div className="flex justify-between mt-4">
				<p>
					<Image
						src="/assets/icons/Year.svg"
						alt="Power Icon"
						className="w-auto h-10 inline-block"
						width={32}
						height={32}
					/>{" "}
					{manufacture_year}
				</p>
				<p>
					<Image
						src="/assets/icons/powerIcon.svg"
						alt="Power Icon"
						className="w-auto h-10 inline-block"
						width={32}
						height={32}
					/>
					{power} {power_unit}
				</p>
				<p>
					<Image
						src="/assets/icons/priceIcon.svg"
						alt="Price Icon"
						className="w-auto h-10 inline-block"
						width={32}
						height={32}
					/>{" "}
					{Math.round(price)} €
				</p>
			</div>
			<div className="flex justify-around mt-4">
				<p>
					<Image
						src="/assets/icons/carIcon.svg"
						alt="Car Icon"
						className="w-auto h-10 inline-block"
						width={32}
						height={32}
					/>
					{mileage} km
				</p>
				<p>
					<Image
						src="/assets/icons/fueltypeIcon.svg"
						alt="Fuel Type Icon"
						className="w-auto h-10 inline-block"
						width={32}
						height={32}
					/>
					{fuel_type}{" "}
				</p>
			</div>
		</div>
	);
};

export default Annonce;
