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
		options_name: [] as string[], // Update the type of options_name to string[]
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
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Tableau pour stocker les options selectionnées

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
			!newAnnonce.power_unit ||
			!newAnnonce.color ||
			!newAnnonce.model_name ||
			!newAnnonce.category_model ||
			!newAnnonce.manufacture_year ||
			!newAnnonce.fuel_type ||
			newAnnonce.options_name.length === 0
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
				options_name: [],
				main_image_url: "",
			});
			setSelectedImage(null);
			setSelectedOptions([]); // remet à zéro les selections
		} catch (error) {
			console.error("Erreur lors de la création de l'annonce :", error);
			setSubmissionMessage(
				"Une erreur s'est produite lors de la création de l'annonce."
			);
		}
	};

	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = e.target.value;
		if (
			selectedOption &&
			!newAnnonce.options_name.includes(selectedOption)
		) {
			setNewAnnonce((prevState) => ({
				...prevState,
				options_name: [...prevState.options_name, selectedOption],
			}));
			setSelectedOptions((prevOptions) => [
				...prevOptions,
				selectedOption,
			]);
		}
	};

	const handleRemoveOption = (option: string) => {
		setNewAnnonce((prevState) => ({
			...prevState,
			options_name: prevState.options_name.filter(
				(opt) => opt !== option
			),
		}));
		setSelectedOptions((prevOptions) =>
			prevOptions.filter((opt) => opt !== option)
		);
	};

	return (
		<div className="bg-neutral text-red-500 p-4 sm:p-6 md:p-8 rounded-lg max-w-6xl mx-auto">
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

				{/* Champ personnalisé pour la catégorie */}
				<div>
					<label
						htmlFor="category_model"
						className="block mb-2 text-neutral-content"
					>
						Catégorie
					</label>
					<select
						id="category_model"
						name="category_model"
						value={newAnnonce.category_model}
						onChange={handleInputChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">Sélectionnez une catégorie</option>
						<option value="SUV">SUV</option>
						<option value="Berline">Berline</option>
						<option value="Coupé">Coupé</option>
						<option value="Cabriolet">Cabriolet</option>
						<option value="Break">Break</option>
						<option value="Monospace">Monospace</option>
					</select>
				</div>

				{/* Champ personnalisé pour le type de carburant */}
				<div>
					<label
						htmlFor="fuel_type"
						className="block mb-2 text-neutral-content"
					>
						Type de carburant
					</label>
					<select
						id="fuel_type"
						name="fuel_type"
						value={newAnnonce.fuel_type}
						onChange={handleInputChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">
							Sélectionnez un type de carburant
						</option>
						<option value="Essence">Essence</option>
						<option value="Hybride">Hybride</option>
						<option value="Electrique">Electrique</option>
						<option value="Diesel">Diesel</option>
					</select>
				</div>

				<div>
					{/* Champ personnalisé pour les options */}
					<label
						htmlFor="options_name"
						className="block mb-2 text-neutral-content"
					>
						Options
					</label>
					<select
						id="options_name"
						name="options_name"
						value=""
						onChange={handleOptionChange}
						className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
					>
						<option value="">Sélectionnez des options</option>
						<option value="">Sélectionnez une option</option>
						<option value="Fermeture centralisée">
							Fermeture centralisée
						</option>
						<option value="Boîte manuelle">Boîte manuelle</option>
						<option value="Boîte automatique">
							Boîte automatique
						</option>
						<option value="Caméra de recul">Caméra de recul</option>
						<option value="Détecteurs d'angle mort">
							Détecteurs d'angle mort
						</option>
						<option value="Régulateur de vitesse adaptatif">
							Régulateur de vitesse adaptatif
						</option>
						<option value="Système de freinage d'urgence">
							Système de freinage d'urgence
						</option>
						<option value="Assistance au stationnement">
							Assistance au stationnement
						</option>
						<option value="Connexion Bluetooth">
							Connexion Bluetooth
						</option>
						<option value="Phares à LED ou Xenon">
							Phares à LED ou Xenon
						</option>
						<option value="Climatisation automatique">
							Climatisation automatique
						</option>
						<option value="Système audio">Système audio</option>
						<option value="Toit ouvrant">Toit ouvrant</option>
						<option value="ABS">ABS</option>
						<option value="Airbags">Airbags</option>
						<option value="Contrôle de stabilité ESP">
							Contrôle de stabilité ESP
						</option>
						<option value="Intérieur cuir">Intérieur cuir</option>
						<option value="Intérieur velour">
							Intérieur velour
						</option>
						<option value="Intérieur tissu">Intérieur tissu</option>
						<option value="Système de navigation GPS">
							Système de navigation GPS
						</option>
						<option value="Attelage de remorque">
							Attelage de remorque
						</option>
					</select>{" "}
					<div className="mt-2">
						{selectedOptions.map((option, index) => (
							<span
								key={index}
								className="inline-block bg-primary text-white px-2 py-1 rounded-full text-xs mr-2 mb-2"
							>
								{option}
								<button
									className="ml-1 text-white"
									onClick={() => handleRemoveOption(option)}
								>
									x
								</button>
							</span>
						))}
					</div>
				</div>
			</div>
			{/* Message de soumission pour informer l'utilisateur */}
			{submissionMessage && (
				<p className="text-red-600 text-xl font-bold text-center mt-4">
					{submissionMessage}
				</p>
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
