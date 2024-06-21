import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/Global/CustomInput/CustomInput";
import { addAnnonce } from "@/components/utils/apiService";
import { brandOptions } from "@/components/Global/brandsData/brandsData";

type CreateAnnoncePageProps = {
	onCreate: (createdAnnonce: any) => void; // Fonction appelée après la création de l'annonce
};

const CreateAnnoncePage: React.FC<CreateAnnoncePageProps> = ({ onCreate }) => {
	// Je déclare les états locaux pour gérer les informations de la nouvelle annonce
	const [newAnnonce, setNewAnnonce] = useState({
		annonce_title: "", // Titre de l'annonce
		brand_name: "", // Marque de l'annonce
		registration: "", // Numéro d'immatriculation de l'annonce
		price: "", // Prix de l'annonce
		description: "", // Description de l'annonce
		power: "", // Puissance de l'annonce
		power_unit: "kW", // Unité de puissance par défaut
		color: "", // Couleur de l'annonce
		model_name: "", // Modèle de l'annonce
		category_model: "", // Catégorie de modèle de l'annonce
		manufacture_year: "", // Année de fabrication de l'annonce
		fuel_type: "", // Type de carburant de l'annonce
		options_name: "", // Options de l'annonce
	});

	// Je déclare l'état local pour gérer l'image sélectionnée
	const [selectedImage, setSelectedImage] = useState<null | {
		url: string;
		name: string;
	}>(null);

	// Je déclare l'état local pour gérer les erreurs de format d'immatriculation
	const [registrationError, setRegistrationError] = useState<string | null>(
		null
	);

	// Je déclare l'état local pour gérer le message de soumission du formulaire
	const [submissionMessage, setSubmissionMessage] = useState("");

	// Je définis la taille maximale et les extensions acceptées pour les images
	const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 Mo
	const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

	// Je calcule les années disponibles pour la sélection de l'année de fabrication
	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: currentYear - 1999 },
		(_, index) => currentYear - index
	);

	// Je gère les changements dans les champs de saisie et de sélection
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		// Je vérifie si le champ modifié est "price" ou "power"
		if (name === "price" || name === "power") {
			// Je vérifie si la valeur est numérique et positive
			if (!/^\d*\.?\d+$/.test(value) || parseFloat(value) < 0) {
				return; // Je ne mets pas à jour l'état si la valeur n'est pas valide
			}
		}

		// Je vérifie si le champ modifié est "manufacture_year"
		if (name === "manufacture_year") {
			// Je vérifie si la valeur est numérique et contient au maximum 4 chiffres
			if (!/^\d{0,4}$/.test(value)) {
				return; // Je ne mets pas à jour l'état si la valeur n'est pas valide
			}
		}

		// Je mets à jour l'état de la nouvelle annonce en fonction du champ modifié
		setNewAnnonce((prevState) => ({
			...prevState,
			[name]: value,
		}));

		// Si le champ modifié est "registration", je réinitialise l'erreur de format d'immatriculation
		if (name === "registration") {
			setRegistrationError(null);
		}
	};

	// Je gère le changement de l'image sélectionnée
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Je vérifie que la taille de l'image est inférieure à la limite autorisée
		if (file.size > MAX_IMAGE_SIZE) {
			alert("La taille de l'image dépasse la limite autorisée (5 Mo).");
			return;
		}

		// Je récupère l'extension du fichier pour vérifier la validité de l'image
		const extension = file.name.split(".").pop()?.toLowerCase();
		if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
			alert(
				"Veuillez sélectionner un fichier d'image valide (jpg, jpeg, png ou webp)."
			);
			return;
		}

		// Je charge l'image sélectionnée pour l'affichage prévisualisé
		const reader = new FileReader();
		reader.onloadend = () => {
			const imageDataURL = reader.result as string;
			setSelectedImage({ url: imageDataURL, name: file.name });
		};
		reader.readAsDataURL(file);
	};

	// Je gère la suppression de l'image sélectionnée
	const handleImageDelete = () => {
		setSelectedImage(null);
	};

	// Je gère la création de l'annonce en envoyant les données au service d'API
	const handleCreateAnnonce = async () => {
		// Vérification des champs obligatoires
		if (
			!newAnnonce.annonce_title ||
			!newAnnonce.brand_name ||
			!newAnnonce.registration ||
			!newAnnonce.price ||
			!newAnnonce.power ||
			!newAnnonce.power_unit ||
			!newAnnonce.color ||
			!newAnnonce.model_name ||
			!newAnnonce.category_model ||
			!newAnnonce.manufacture_year ||
			!newAnnonce.fuel_type ||
			!newAnnonce.options_name
		) {
			setSubmissionMessage("L'ensemble des champs est obligatoires.");
			return;
		}
		// Je définis une expression régulière pour valider le format d'immatriculation
		const registrationRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
		// Je vérifie si le numéro d'immatriculation respecte le format attendu
		if (!registrationRegex.test(newAnnonce.registration)) {
			setRegistrationError(
				"Format d'immatriculation invalide - Format attendu: AA-123-AA"
			);
			return;
		}
		try {
			// J'envoie la nouvelle annonce au service d'API pour la création
			const createdAnnonce = await addAnnonce(newAnnonce);
			setSubmissionMessage("L'annonce a été créée avec succès !");
			// J'appelle la fonction de rappel onCreate avec l'annonce créée
			onCreate(createdAnnonce);
		} catch (error) {
			console.error("Erreur lors de la création de l'annonce :", error);
			setSubmissionMessage(
				"Une erreur s'est produite lors de la création de l'annonce."
			);
		}
	};

	return (
		<div className="bg-neutral p-4 sm:p-6 md:p-8 rounded-lg max-w-6xl mx-auto">
			<p className="text-neutral-content font-bold text-xl text-center mb-4">
				Création d'une nouvelle annonce
			</p>{" "}
			{/* Bouton de retour avec une flèche */}
			<button
				onClick={() => {
					// Retour en arrière
					window.history.back();
				}}
				className="py-2 m-4 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
			>
				Retour
			</button>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
				<div>
					{/* Champ personnalisé pour le titre de l'annonce */}
					<CustomInput
						label="Titre de l'annonce"
						name="annonce_title"
						value={newAnnonce.annonce_title}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label
						htmlFor="brand_name"
						className="block mb-2 text-neutral-content"
					>
						Marque
					</label>
					{/* Sélecteur pour choisir la marque de l'annonce */}
					<select
						id="brand_name"
						name="brand_name"
						value={newAnnonce.brand_name}
						onChange={handleInputChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">Sélectionnez une marque</option>
						{/* Options de marque disponibles */}
						{brandOptions.map((brand, index) => (
							<option key={index} value={brand.name}>
								{brand.name}
							</option>
						))}
					</select>
				</div>

				<div>
					{/* Champ personnalisé pour le numéro d'immatriculation */}
					<CustomInput
						label="Immatriculation"
						name="registration"
						value={newAnnonce.registration}
						onChange={handleInputChange}
						placeholder="Format: AA-123-AA"
					/>
					{/* Affichage de l'erreur de format d'immatriculation */}
					{registrationError && (
						<p className="text-red-500 mt-1">{registrationError}</p>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="relative">
						<label
							htmlFor="main_image_url"
							className="block mb-2 text-neutral-content"
						>
							Image Principale
						</label>
						{/* Affichage de l'image sélectionnée avec la prévisualisation */}
						{selectedImage && typeof selectedImage === "object" && (
							<div className="w-full h-auto mb-2 rounded border border-gray-300 relative">
								<Image
									src={selectedImage.url}
									alt={newAnnonce.annonce_title}
									width={200}
									height={200}
									className="object-cover"
									onError={(e) =>
										console.error(
											"Erreur de chargement d'image :",
											e
										)
									}
								/>
								{/* Bouton pour supprimer l'image sélectionnée */}
								<button
									onClick={handleImageDelete}
									className="absolute bottom-0 left-0 right-0 text-sm text-red-600 font-bold px-3 py-2 rounded bg-gray-500 bg-opacity-90 hover:bg-opacity-100 border border-red-500 hover:text-white focus:outline-none focus:bg-opacity-100 focus:text-secondary"
								>
									Supprimer l'image
								</button>
							</div>
						)}
						{/* Input pour charger une nouvelle image */}
						<input
							type="file"
							id="main_image_url"
							name="main_image_url"
							accept="image/jpeg, image/jpg, image/webp, image/png"
							onChange={handleImageChange}
							className="cursor-pointer w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none text-neutral-content"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4">
						{/* Autres champs du formulaire */}
						{/* Champ personnalisé pour le titre de l'annonce */}
						<CustomInput
							label="Titre de l'annonce"
							name="annonce_title"
							value={newAnnonce.annonce_title}
							onChange={handleInputChange}
						/>

						{/* Champ personnalisé pour la marque */}
						<div className="form-group mb-4">
							<label
								htmlFor="brand_name"
								className="block mb-2 text-neutral-content"
							>
								Marque
							</label>
							{/* Sélecteur pour choisir la marque de l'annonce */}
							<select
								id="brand_name"
								name="brand_name"
								value={newAnnonce.brand_name}
								onChange={handleInputChange}
								className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
							>
								<option value="">
									Sélectionnez une marque
								</option>
								{/* Options de marque disponibles */}
								{brandOptions.map((brand, index) => (
									<option key={index} value={brand.name}>
										{brand.name}
									</option>
								))}
							</select>
						</div>

						{/* Autres champs du formulaire */}
						{/* ... */}
					</div>
				</div>

				<div>
					{/* Champ personnalisé pour la description de l'annonce */}
					<CustomInput
						label="Description"
						name="description"
						value={newAnnonce.description}
						onChange={handleInputChange}
						textarea
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le prix de l'annonce */}
					<CustomInput
						label="Prix en €"
						name="price"
						type="number"
						value={newAnnonce.price}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la puissance de l'annonce */}
					<CustomInput
						label="Puissance"
						name="power"
						type="number"
						value={newAnnonce.power}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour l'unité de puissance */}
					<CustomInput
						label="Unité de puissance"
						name="power_unit"
						value={newAnnonce.power_unit}
						onChange={handleInputChange}
						selectOptions={["kW", "CV"]}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la couleur de l'annonce */}
					<CustomInput
						label="Couleur"
						name="color"
						value={newAnnonce.color}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le modèle de l'annonce */}
					<CustomInput
						label="Modèle"
						name="model_name"
						value={newAnnonce.model_name}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la catégorie de modèle */}
					<CustomInput
						label="Catégorie de modèle"
						name="category_model"
						value={newAnnonce.category_model}
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

				<div>
					{/* Champ personnalisé pour l'année de fabrication */}
					<CustomInput
						label="Année de fabrication"
						name="manufacture_year"
						type="number"
						value={newAnnonce.manufacture_year}
						onChange={handleInputChange}
						selectOptions={years.map(String)}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le type de carburant */}
					<CustomInput
						label="Type de carburant"
						name="fuel_type"
						value={newAnnonce.fuel_type}
						onChange={handleInputChange}
						selectOptions={[
							"Essence",
							"Diesel",
							"Électrique",
							"Hybride",
						]}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour les options de l'annonce */}
					<CustomInput
						label="Options"
						name="options_name"
						value={newAnnonce.options_name}
						onChange={handleInputChange}
					/>
				</div>

				<div className="col-span-full flex justify-center">
					{/* Bouton pour créer l'annonce */}
					<button
						onClick={handleCreateAnnonce}
						className="w-full md:w-3/5 py-2 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
					>
						Créer l'annonce
					</button>
				</div>

				{/* Affichage du message de soumission */}
				{submissionMessage && (
					<p className="text-red-500 text-4xl text-center col-span-full mt-4 font-bold">
						{submissionMessage}
					</p>
				)}
			</div>
		</div>
	);
};

export default CreateAnnoncePage;
