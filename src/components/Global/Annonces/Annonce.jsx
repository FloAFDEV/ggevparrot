import React from "react";

const Annonce = ({ annonce }) => {
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
		registration,
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

	// Si oui, affiche les détails de l'annonce
	return (
		<div className="p-4 bg-gray-100">
			<h3 className="font-bold text-xl mb-2">{annonce_title}</h3>
			<p>
				Marque: {brand_name}&nbsp;
				<img src={brand_logo_url} alt="Logo de la marque" />
			</p>

			<p>Modèle: {model_name}</p>
			<p>Couleur: {color}</p>
			<p>Année: {manufacture_year}</p>
			<p>Catégorie: {category_model}</p>
			<p>Carburant: {fuel_type}</p>
			<img
				src={main_image_url}
				alt={annonce_title}
				className="max-w-full my-4"
			/>
			<p>Description: {description}</p>
			<p>Équipements et options: {options_name}</p>
			<p>
				Puissance: {power}
				{power_unit}
			</p>
			<p>Kilométrage: {mileage} km</p>
			<p>Immatriculation: {registration}</p>
			<p>Prix: {price} €</p>
		</div>
	);
};

export default Annonce;
