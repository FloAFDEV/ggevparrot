import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomInput from "@/components/Global/CustomInput/CustomInput";
import { fetchAnnonceById, updateAnnonce } from "@/components/utils/apiService";
import { brandOptions } from "@/components/Global/brandsData/brandsData";
import { Annonce } from "./ReadAnnonce";

const UpdateAnnonce = ({
	annonceId,
	initialAnnonce,
	mainImageUrl,
	closeModal,
	onUpdate,
}: {
	annonceId: number;
	initialAnnonce: Annonce;
	mainImageUrl: string;
	closeModal: () => void;
	onUpdate: (annonceId: number, updatedAnnonce: Annonce) => void;
}) => {
	const [updatedAnnonce, setUpdatedAnnonce] =
		useState<Annonce>(initialAnnonce);
	const [selectedImage, setSelectedImage] = useState<{
		url: string;
		name: string;
	} | null>(null);
	const [registrationError, setRegistrationError] = useState<string | null>(
		null
	);
	const [submissionMessage, setSubmissionMessage] = useState<string>("");

	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: currentYear - 1999 },
		(_, index) => currentYear - index
	);

	useEffect(() => {
		const fetchInitialAnnonce = async () => {
			try {
				const fetchedAnnonce = await fetchAnnonceById(annonceId);
				setUpdatedAnnonce(fetchedAnnonce);
			} catch (error) {
				console.error(
					"Erreur lors du chargement de l'annonce :",
					error
				);
			}
		};

		fetchInitialAnnonce();
	}, [annonceId]);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setUpdatedAnnonce((prevState) => ({
			...prevState,
			[name]: value,
		}));
		if (name === "registration") {
			setRegistrationError(null);
		}
	};

	const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 Mo
	const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_IMAGE_SIZE) {
			alert("La taille de l'image dépasse la limite autorisée (5 Mo).");
			return;
		}

		const extension = file.name.split(".").pop()?.toLowerCase();
		if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
			alert(
				"Veuillez sélectionner un fichier d'image valide (jpg, jpeg, png ou webp)."
			);
			return;
		}

		const reader = new FileReader();
		reader.onloadend = () => {
			const imageDataURL = reader.result as string;
			setSelectedImage({ url: imageDataURL, name: file.name });
		};
		reader.readAsDataURL(file);
	};

	const handleUpdateAnnonce = async () => {
		const registrationRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
		if (!registrationRegex.test(updatedAnnonce.registration)) {
			setRegistrationError(
				"Format d'immatriculation invalide - Format attendu: AA-123-AA"
			);
			return;
		}

		try {
			await updateAnnonce(annonceId, updatedAnnonce);
			setSubmissionMessage("L'annonce a été mise à jour avec succès !");
			onUpdate(annonceId, updatedAnnonce);
		} catch (error) {
			console.error(
				"Erreur lors de la mise à jour de l'annonce :",
				error
			);
			setSubmissionMessage(
				"Une erreur s'est produite lors de la mise à jour de l'annonce."
			);
		}
	};

	return (
		<div className="bg-neutral p-4 rounded-lg max-w-7xl h-auto overflow-auto mb-4">
			<p className="text-neutral-content font-bold text-xl text-center mb-4">
				ID annonce n° {initialAnnonce.Id_CarAnnonce}
			</p>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{/* Champ personnalisé pour le titre de l'annonce */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Titre de l'annonce"
						name="annonce_title"
						value={updatedAnnonce.annonce_title}
						onChange={handleInputChange}
					/>
				</div>

				{/* Sélecteur pour choisir la marque de l'annonce */}
				<div className="col-span-2 md:col-span-1">
					<label
						htmlFor="brand_name"
						className="block mb-2 text-neutral-content"
					>
						Marque
					</label>
					<select
						id="brand_name"
						name="brand_name"
						value={updatedAnnonce.brand_name}
						onChange={handleInputChange}
						className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">Sélectionnez une marque</option>
						{brandOptions?.map((brand, index) => (
							<option key={index} value={brand.name}>
								{brand.name}
							</option>
						))}
					</select>
				</div>

				{/* Champ personnalisé pour l'immatriculation */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Immatriculation"
						name="registration"
						value={updatedAnnonce.registration}
						onChange={handleInputChange}
						placeholder="Format: AA-123-AA"
					/>
					{/* Affichage de l'erreur de format d'immatriculation si présente */}
					{registrationError && (
						<p className="text-red-500">{registrationError}</p>
					)}
				</div>

				{/* Affichage de l'image principale */}
				<div className="relative w-auto h-40 col-span-2 md:col-span-1">
					<label
						htmlFor="main_image_url"
						className="block mb-1 text-neutral-content"
					>
						Image Principale
					</label>
					{mainImageUrl && (
						<Image
							className="object-cover rounded-lg"
							src={mainImageUrl}
							alt={initialAnnonce.annonce_title}
							width={200}
							height={200}
						/>
					)}
				</div>

				{/* Gestion de l'image sélectionnée */}
				<div className="col-span-2 md:col-span-1">
					{selectedImage && typeof selectedImage === "object" && (
						<div className="w-full h-auto mb-2 border-none">
							<Image
								src={selectedImage.url}
								alt={updatedAnnonce.annonce_title}
								width={150}
								height={150}
								className="object-cover rounded-lg"
								onError={(e) =>
									console.error(
										"Erreur de chargement d'image :",
										e
									)
								}
							/>
						</div>
					)}
					<input
						type="file"
						id="main_image_url"
						name="main_image_url"
						alt={updatedAnnonce.annonce_title}
						accept="image/jpeg, image/jpg, image/webp, image/png"
						onChange={handleImageChange}
						className="w-full px-3 py-2 mt-2 rounded border-gray-300 focus:border-primary focus:outline-none text-neutral-content"
					/>
					{/* Bouton pour supprimer l'image sélectionnée */}
					{selectedImage && (
						<button
							onClick={() => setSelectedImage(null)}
							className="block mt-2 text-sm text-red-500 justify-center w-full px-3 py-2 rounded border border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white"
						>
							Supprimer l'image
						</button>
					)}
				</div>

				{/* Champ personnalisé pour le prix */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Prix en €"
						name="price"
						type="number"
						value={updatedAnnonce.price}
						onChange={handleInputChange}
					/>
				</div>

				{/* Champ personnalisé pour la puissance */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Puissance"
						name="power"
						type="number"
						value={updatedAnnonce.power}
						onChange={handleInputChange}
					/>
				</div>

				{/* Champ personnalisé pour l'unité de puissance */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Unité de puissance"
						name="power_unit"
						value={updatedAnnonce.power_unit}
						onChange={handleInputChange}
						selectOptions={["kW", "CV"]}
					/>
				</div>

				{/* Champ personnalisé pour la couleur */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Couleur"
						name="color"
						value={updatedAnnonce.color}
						onChange={handleInputChange}
					/>
				</div>

				{/* Champ personnalisé pour le modèle */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Modèle"
						name="model_name"
						value={updatedAnnonce.model_name}
						onChange={handleInputChange}
					/>
				</div>

				{/* Champ personnalisé pour la catégorie de modèle */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Catégorie"
						name="category_model"
						value={updatedAnnonce.category_model}
						onChange={handleInputChange}
						selectOptions={[
							"Compacte",
							"Berline",
							"SUV",
							"Monospace",
							"Coupé",
							"Familiale",
						]}
					/>
				</div>

				{/* Champ personnalisé pour l'année de fabrication */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Année de fabrication"
						name="manufacture_year"
						type="number"
						value={updatedAnnonce.manufacture_year}
						onChange={handleInputChange}
						selectOptions={years?.map(String)}
					/>
				</div>

				{/* Champ personnalisé pour le type de carburant */}
				<div className="col-span-2 md:col-span-1">
					<CustomInput
						label="Type de carburant"
						name="fuel_type"
						value={updatedAnnonce.fuel_type}
						onChange={handleInputChange}
						selectOptions={[
							"Essence",
							"Diesel",
							"Électrique",
							"Hybride",
						]}
					/>
				</div>

				{/* Champ personnalisé pour les options */}
				<div className="col-span-4">
					<label
						htmlFor="options_name"
						className="block mb-2 text-neutral-content"
					>
						Options
					</label>
					<textarea
						id="options_name"
						name="options_name"
						value={updatedAnnonce.options_name}
						onChange={handleInputChange}
						className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none resize-y"
						rows={2}
					/>
				</div>

				{/* Champ personnalisé pour la description */}
				<div className="col-span-4">
					<label
						htmlFor="description"
						className="block mb-2 text-neutral-content"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={updatedAnnonce.description}
						onChange={handleInputChange}
						className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none resize-y"
						rows={5}
					/>
				</div>

				{/* Bouton de soumission du formulaire */}
				<button
					onClick={handleUpdateAnnonce}
					className="w-3/5 mx-auto py-2 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent col-span-full transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
				>
					Mettre l'annonce n°{initialAnnonce.Id_CarAnnonce} à jour
				</button>
			</div>

			{/* Message de soumission */}
			{submissionMessage && (
				<p className="col-span-full text-center text-3xl font-bold text-green-500">
					{submissionMessage}
				</p>
			)}
		</div>
	);
};

export default UpdateAnnonce;
