// Import des dépendances React
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Définition du composant Annonce
const Annonce = ({ annonce, toggleCarousel }) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [carouselVisible, setCarouselVisible] = useState(false);
	const [isMobileScreen, setIsMobileScreen] = useState(false);
	const [montantMensuel, setMontantMensuel] = useState(null);

	// J'utilise useEffect pour surveiller les changements de taille de l'écran et mettre à jour l'état correspondant
	useEffect(() => {
		const handleResize = () => {
			setIsMobileScreen(window.innerWidth <= 768); // On considère une largeur de 768px ou moins comme une taille d'écran mobile
		};
		handleResize(); // Appel initial pour définir la valeur initiale
		window.addEventListener("resize", handleResize); // Ajoute un écouteur d'événements pour les changements de taille de l'écran
		return () => {
			window.removeEventListener("resize", handleResize); // Nettoie l'écouteur d'événements lors du démontage du composant
		};
	}, []);

	// Fonction pour calculer le montant mensuel
	useEffect(() => {
		if (annonce) {
			const prix = annonce.price; // Récupération du prix de l'annonce
			const montantMensuelCalcul = (prix - 3000) / 60; // Calcul du montant mensuel
			setMontantMensuel(montantMensuelCalcul.toFixed(2)); // Mise à jour de l'état du montant mensuel avec le résultat arrondi à 2 décimales
		}
	}, [annonce]); // Effectue le calcul lorsque l'annonce change

	// Fonction pour basculer l'affichage de la description
	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	// Fonction pour basculer l'affichage du carousel
	const handleToggleCarousel = () => {
		toggleCarousel(); // Appel de la fonction de basculement du carousel
		setCarouselVisible(!carouselVisible); // Inversion de l'état du carousel
	};

	//vérifie si l'annonce est définie
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
			className={`p-4 dark:bg-slate-200 bg-white text-blue-950 rounded-lg shadow-md ${
				isMobileScreen ? "max-w-[100%] mx-auto text-sm" : "" // applique les classes sur les écrans mobiles
			}`}
		>
			<h3 className="font-bold text-xl mb-2">{annonce_title}</h3>
			<div className="flex items-center mb-4">
				<Image
					src={brand_logo_url}
					alt="Logo de la marque"
					className="w-auto h-16 mr-2"
					width={360}
					height={360}
				/>
				<div className="text-md font-semibold p4 text-start">
					{brand_name} {model_name} {color} {manufacture_year}
					<p className="text-start">Catégorie: {category_model}</p>
				</div>
			</div>
			<div className="relative">
				<Image
					src={main_image_url}
					alt={annonce_title}
					className="w-full h-auto max-h-64 object-cover rounded-lg my-4"
					width={512}
					height={512}
					priority={true}
				/>
				<button
					className="btn absolute top-0 right-0 p-2 m-2 btn-primary hover:btn-primary rounded-md "
					onClick={handleToggleCarousel}
				>
					{carouselVisible ? "Moins d'images" : "Plus d'images"}
				</button>
			</div>
			<p className="text-start pt-3">Description:</p>
			<p className="text-start font-light">
				{descriptionToShow}
				{remainingDescription && (
					<span className="color-primary-900 font-extra-bold cursor-pointer hover:text-orange-400">
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
					className={`w-auto h-10 mb-1 inline-block ${
						isMobileScreen ? "w-auto h-8" : ""
					}`}
					width={32}
					height={32}
				/>
			</p>
			<p className="mb-4 text-left font-light">{options_name}</p>
			<div className="flex justify-between mt-4">
				<p>
					<Image
						src="/assets/icons/priceIcon.svg"
						alt="Price Icon"
						className={`w-auto h-10 mb-1 inline-block ${
							isMobileScreen ? "w-auto h-8" : ""
						}`}
						width={32}
						height={32}
					/>{" "}
					{Math.round(price)} €
				</p>{" "}
				<p className="text-xs font-thin justify-center items-center w-3/5">
					<Image
						src="/assets/icons/priceIcon.svg"
						alt="Price Icon"
						className={`text-start w-auto h-7 inline-block mr-1${
							isMobileScreen ? "w-auto h-3.5 mr-1" : ""
						}`}
						width={32}
						height={32}
					/>
					À partir de{" "}
					{montantMensuel ? `${montantMensuel}€ /mois` : ""} Apport
					minimum de 3 000€
				</p>
			</div>
			<div className="flex justify-around mt-4">
				<div className="text-center">
					<Image
						src="/assets/icons/Year.svg"
						alt="Power Icon"
						className={`w-auto h-10 inline-block ${
							isMobileScreen ? "w-auto h-8" : ""
						}`}
						width={32}
						height={32}
					/>
					<p>{manufacture_year}</p>
				</div>
				<div className="text-center">
					<Image
						src="/assets/icons/powerIcon.svg"
						alt="Power Icon"
						className={`w-auto h-10 inline-block ${
							isMobileScreen ? "w-auto h-8" : ""
						}`}
						width={32}
						height={32}
					/>
					<p>
						{power} {power_unit}
					</p>
				</div>
				<div className="text-center">
					<Image
						src="/assets/icons/carIcon.svg"
						alt="Car Icon"
						className={`w-auto h-10 inline-block ${
							isMobileScreen ? "w-auto h-8" : ""
						}`}
						width={32}
						height={32}
					/>
					<p>{mileage} km</p>
				</div>
				<div className="text-center">
					<Image
						src="/assets/icons/fueltypeIcon.svg"
						alt="Fuel Type Icon"
						className={`w-auto h-10 inline-block ${
							isMobileScreen ? "w-auto h-8" : ""
						}`}
						width={32}
						height={32}
					/>
					<p>{fuel_type}</p>
				</div>
			</div>
		</div>
	);
};

export default Annonce;
