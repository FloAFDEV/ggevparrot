import React, { useState } from "react";
import Image from "next/image";
import CustomInput from "@/components/Global/CustomInput/CustomInput";
import { addAnnonce } from "@/components/utils/apiService";
import { brandOptions } from "@/components/Global/brandsData/brandsData";

const CreateAnnoncePage: React.FC = () => {
	// État pour stocker les valeurs de l'annonce à créer
	const [newAnnonce, setNewAnnonce] = useState({
		annonce_title: "",
		brand_name: "",
		registration: "",
		price: "",
		description: "",
		power: "",
		power_unit: "kW", // Unité de puissance par défaut
		color: "",
		model_name: "",
		category_model: "",
		manufacture_year: "",
		fuel_type: "",
		options_name: "",
		main_image_url: "",
	});

	// État pour stocker l'image sélectionnée
	const [selectedImage, setSelectedImage] = useState<null | {
		url: string;
		name: string;
	}>(null);

	// État pour stocker les messages d'erreur et de soumission
	const [registrationError, setRegistrationError] = useState<string | null>(
		null
	);
	const [submissionMessage, setSubmissionMessage] = useState("");

	// Taille maximale de l'image en octets (5 Mo)
	const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

	// Extensions de fichiers d'image acceptées
	const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

	// Générer une liste d'années pour l'année de fabrication
	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: currentYear - 1999 },
		(_, index) => currentYear - index
	);

	// Fonction pour gérer les changements dans les champs de formulaire
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		// Validation pour les champs "price" et "power"
		if (name === "price" || name === "power") {
			if (!/^\d*\.?\d+$/.test(value) || parseFloat(value) < 0) {
				return;
			}
		}

		// Validation pour le champ "manufacture_year"
		if (name === "manufacture_year") {
			if (!/^\d{0,4}$/.test(value)) {
				return;
			}
		}

		// Mettre à jour l'état avec la nouvelle valeur du champ
		setNewAnnonce((prevState) => ({
			...prevState,
			[name]: value,
		}));

		// Réinitialiser l'erreur de format d'immatriculation
		if (name === "registration") {
			setRegistrationError(null);
		}
	};

	// Fonction pour gérer les changements dans l'input d'image
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Vérifier la taille de l'image
		if (file.size > MAX_IMAGE_SIZE) {
			alert("La taille de l'image dépasse la limite autorisée (5 Mo).");
			return;
		}

		// Vérifier l'extension de l'image
		const extension = file.name.split(".").pop()?.toLowerCase();
		if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
			alert(
				"Veuillez sélectionner un fichier d'image valide (jpg, jpeg, png ou webp)."
			);
			return;
		}

		// Lire le fichier d'image et mettre à jour l'état
		const reader = new FileReader();
		reader.onloadend = () => {
			const imageDataURL = reader.result as string;
			setSelectedImage({ url: imageDataURL, name: file.name });
		};
		reader.readAsDataURL(file);
	};

	// Fonction pour supprimer l'image sélectionnée
	const handleImageDelete = () => {
		setSelectedImage(null);
	};

	// Fonction pour gérer la création de l'annonce
	const handleCreateAnnonce = async () => {
		// Vérifier que tous les champs sont remplis
		if (
			!newAnnonce.annonce_title ||
			!newAnnonce.brand_name ||
			!newAnnonce.registration ||
			!newAnnonce.price ||
			!newAnnonce.power ||
			!newAnnonce.power_unit || // Vérification de l'unité de puissance ajoutée
			!newAnnonce.color ||
			!newAnnonce.model_name ||
			!newAnnonce.category_model ||
			!newAnnonce.manufacture_year ||
			!newAnnonce.fuel_type ||
			!newAnnonce.options_name
		) {
			setSubmissionMessage("L'ensemble des champs est obligatoire !");
			return;
		}

		// Valider le format de l'immatriculation
		const registrationRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
		if (!registrationRegex.test(newAnnonce.registration)) {
			setRegistrationError(
				"Format d'immatriculation invalide - Format attendu: AA-123-AA"
			);
			return;
		}

		// Envoyer les données de l'annonce au backend pour création
		try {
			const createdAnnonce = await addAnnonce(newAnnonce);
			setSubmissionMessage("L'annonce a été créée avec succès !");
			// Réinitialiser le formulaire après la création
			setNewAnnonce({
				annonce_title: "",
				brand_name: "",
				registration: "",
				price: "",
				description: "",
				power: "",
				power_unit: "kW",
				color: "",
				model_name: "",
				category_model: "",
				manufacture_year: "",
				fuel_type: "",
				options_name: "",
				main_image_url: "",
			});
			setSelectedImage(null);
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
			</p>
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
								className="absolute top-0 right-0 m-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
								style={{ backdropFilter: "blur(10px)" }}
								aria-label="Supprimer l'image"
							>
								Supprimer
							</button>
						</div>
					)}
					{/* Input pour sélectionner une nouvelle image */}
					<input
						id="main_image_url"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="w-full px-3 py-2 rounded border border-gray-300 focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le prix */}
					<CustomInput
						label="Prix (€)"
						name="price"
						value={newAnnonce.price}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la description */}
					<CustomInput
						label="Description"
						name="description"
						value={newAnnonce.description}
						onChange={handleInputChange}
						textarea={true}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la puissance */}
					<CustomInput
						label="Puissance"
						name="power"
						value={newAnnonce.power}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Sélecteur pour choisir l'unité de puissance */}
					<label
						htmlFor="power_unit"
						className="block mb-2 text-neutral-content"
					>
						Unité de Puissance
					</label>
					<select
						id="power_unit"
						name="power_unit"
						value={newAnnonce.power_unit}
						onChange={handleInputChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="kW">kW</option>
						<option value="ch">ch</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="manufacture_year"
						className="block mb-2 text-neutral-content"
					>
						Année de fabrication
					</label>
					{/* Sélecteur pour choisir l'année de fabrication */}
					<select
						id="manufacture_year"
						name="manufacture_year"
						value={newAnnonce.manufacture_year}
						onChange={handleInputChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">Sélectionnez une année</option>
						{/* Options pour les années */}
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				<div>
					{/* Champ personnalisé pour la couleur */}
					<CustomInput
						label="Couleur"
						name="color"
						value={newAnnonce.color}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le modèle */}
					<CustomInput
						label="Modèle"
						name="model_name"
						value={newAnnonce.model_name}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour la catégorie */}
					<CustomInput
						label="Catégorie"
						name="category_model"
						value={newAnnonce.category_model}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour le type de carburant */}
					<CustomInput
						label="Type de carburant"
						name="fuel_type"
						value={newAnnonce.fuel_type}
						onChange={handleInputChange}
					/>
				</div>

				<div>
					{/* Champ personnalisé pour les options */}
					<CustomInput
						label="Options"
						name="options_name"
						value={newAnnonce.options_name}
						onChange={handleInputChange}
					/>
				</div>
			</div>
			{/* Message de soumission pour informer l'utilisateur */}
			{submissionMessage && (
				<p className="text-neutral-content mt-4">{submissionMessage}</p>
			)}
			{/* Bouton pour créer l'annonce */}
			<button
				onClick={handleCreateAnnonce}
				className="mt-6 py-2 px-4 bg-primary text-white font-bold rounded hover:bg-accent transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
			>
				Créer l'annonce
			</button>
		</div>
	);
};

export default CreateAnnoncePage;
