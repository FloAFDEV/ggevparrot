import React, { useState } from "react";

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

	// Affiche es 6 premiers mots de la description
	const firstHeightWords = description.split(" ").slice(0, 8).join(" ");
	// Affiche le reste de la description à partir du 7ème mot
	const remainingDescription = description.split(" ").slice(8).join(" ");

	// Si la description est plus longue que 6 mots
	const descriptionToShow =
		!showFullDescription && remainingDescription
			? `${firstHeightWords}...`
			: description;

	// Si oui, affiche les détails de l'annonce
	return (
		<div className="p-4 bg-white text-blue-950 rounded-lg shadow-md">
			<h3 className="font-bold text-2xl mb-2">{annonce_title}</h3>
			<div className="flex items-center mb-4">
				<img
					src={brand_logo_url}
					alt="Logo de la marque"
					className="w-auto h-16 mr-2"
				/>
				<p className="text-lg font-semibold">
					{brand_name} {model_name} {color}
					<p>Catégorie: {category_model}</p>
				</p>
			</div>
			<div className="">
				<img
					className="w-full max-h-64 object-cover rounded-lg my-4"
					src={main_image_url}
					alt={annonce_title}
				/>{" "}
				<p
					className="cursor-pointer font-extrabold color-primary-500 text-center hover:text-secondary"
					onClick={toggleCarousel}
				>
					Plus d'images
				</p>
				<p className="text-start pt-3">Description:</p>
				<p className="text-start">
					{descriptionToShow}
					{remainingDescription && (
						<span className="color-primary-500 font-extra-bold curser-pointer hover:text-secondary">
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
					<img
						src="/assets/icons/energyIcon.svg"
						alt="Energy Icon"
						className="w-auto h-10 inline-block"
					/>
				</p>
				<p className="mb-4 text-left">{options_name}</p>
			</div>
			<div className="flex justify-between mt-4">
				<p>
					<img
						src="/assets/icons/Year.svg"
						alt="Power Icon"
						className="w-auto h-10 inline-block"
					/>{" "}
					{manufacture_year}
				</p>
				<p>
					<img
						src="/assets/icons/powerIcon.svg"
						alt="Power Icon"
						className="w-auto h-10 inline-block"
					/>
					{power} {power_unit}
				</p>
				<p>
					<img
						src="/assets/icons/priceIcon.svg"
						alt="Price Icon"
						className="w-auto h-10 inline-block"
					/>{" "}
					{price} €
				</p>
			</div>
			<div className="flex justify-around mt-4">
				<p>
					<img
						src="/assets/icons/carIcon.svg"
						alt="Car Icon"
						className="w-auto h-10 inline-block"
					/>
					{mileage} km
				</p>
				<p>
					<img
						src="/assets/icons/fuelTypeIcon.svg"
						alt="Fuel Type Icon"
						className="w-auto h-10 inline-block"
					/>
					{fuel_type}{" "}
				</p>
			</div>
		</div>
	);
};

export default Annonce;
