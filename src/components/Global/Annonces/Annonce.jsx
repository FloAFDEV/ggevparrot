import React, { useState } from "react";
import Image from "next/image";

const Annonce = ({ annonce, toggleCarousel }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	// Vérifier si l'objet annonce est défini
	if (!annonce) {
		return (
			<div className="p-4 bg-gray-300">
				Détails de l'annonce incomplets
			</div>
		);
	}

	// Extraire les détails de l'annonce
	const {
		annonce_title,
		power,
		mileage,
		price,
		description,
		main_image_url,
		color,
		model_name,
		category_model,
		brand_name,
		manufacture_year,
		fuel_type,
		power_unit,
		brand_logo_url,
		options_name,
	} = annonce;

	// Affiche les 6 premiers mots de la description
	const firstEightWords = description.split(" ").slice(0, 8).join(" ");
	// Affiche le reste de la description à partir du 7ème mot
	const remainingDescription = description.split(" ").slice(8).join(" ");

	// Si la description est plus longue que 6 mots, afficher "Afficher la suite"
	const descriptionToShow =
		!showFullDescription && remainingDescription
			? `${firstEightWords}...`
			: description;

	// Rendu du composant Annonce
	return (
		<div className="p-4 bg-white text-blue-950 rounded-lg shadow-md">
			<h3 className="font-bold text-2xl mb-2">{annonce_title}</h3>
			<div className="flex items-center mb-4">
				<Image
					src={brand_logo_url}
					alt="Logo de la marque"
					className="w-auto h-16 mr-2"
					width={128}
					height={128}
				/>
				<div className="text-lg font-semibold">
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
				/>
				<button
					className="absolute top-0 right-0 p-2 m-2 bg-blue-500 text-white rounded-md"
					onClick={toggleCarousel}
				>
					Plus d'images
				</button>
			</div>
			<p className="text-start pt-3">Description:</p>
			<p className="text-start">
				{descriptionToShow}
				{remainingDescription && (
					<span className="color-primary-900 font-extra-bold cursor-pointer hover:text-secondary">
						{" "}
						<button onClick={toggleDescription}>
							{showFullDescription
								? " / Réduire"
								: "Afficher la suite"}
						</button>
					</span>
				)}
			</p>
			<p className="mt-6 text-start">
				Équipements et options:
				<Image
					src="/assets/icons/energyIcon.svg"
					alt="Energy Icon"
					className="w-auto h-10 inline-block"
					width={32}
					height={32}
				/>
			</p>
			<p className="mb-4 text-left">{options_name}</p>
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
					{Math.round(annonce.price)} €
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
