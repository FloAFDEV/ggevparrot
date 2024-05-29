import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomInput from "@/components/Global/CustomInput/CustomInput";
import { fetchAnnonceById, updateAnnonce } from "@/components/utils/apiService";
import { brandOptions } from "@/components/Global/brandsData/brandsData";

interface Annonce {
	Id_CarAnnonce: number;
	annonce_title: string;
	annonce_createdAt: string;
	brand_name: string;
	main_image_url: string;
	mileage: number;
	registration: string;
	price: string;
	description: string;
	power: number;
	power_unit: string;
	color: string;
	model_name: string;
	category_model: string;
	brand_logo_url: string;
	manufacture_year: string;
	fuel_type: string;
	options_name: string;
}

const UpdateAnnonce = ({
	annonceId,
	initialAnnonce,
	mainImageUrl,
	closeModal,
}: {
	annonceId: number;
	initialAnnonce: Annonce;
	mainImageUrl: string;
	closeModal: () => void;
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
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
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
		// controle la taille de l'image
		if (file.size > MAX_IMAGE_SIZE) {
			console.error(
				"La taille de l'image dépasse la limite autorisée (5 Mo)."
			);
			alert("La taille de l'image dépasse la limite autorisée (5 Mo).");
			return;
		}
		// type de fichier autorisés
		const extension = file.name.split(".").pop()?.toLowerCase();
		if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
			console.error(
				"Veuillez sélectionner un fichier d'image valide (jpg, jpeg, png ou webp)."
			);
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
		<div className="bg-neutral p-2 rounded-lg max-w-6xl h-[80vh] overflow-auto">
			<p className="right-2 text-neutral-content font-bold text-xl text-center">
				ID annonce n° {initialAnnonce.Id_CarAnnonce}
			</p>
			<div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:gap-2 gap-4 text-sm md:text-base">
				<div className="col-span-full">
					<CustomInput
						label="Titre de l'annonce"
						name="annonce_title"
						value={updatedAnnonce.annonce_title}
						onChange={handleInputChange}
					/>
				</div>

				<div className="form-group mb-4 ">
					<label
						htmlFor="brand_name"
						className="block mb-2 text-neutral-content"
					>
						Marque
					</label>
					<div className="relative ">
						<select
							id="brand_name"
							name="brand_name"
							value={updatedAnnonce.brand_name}
							onChange={handleInputChange}
							className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none cursor-pointer"
						>
							<option value="">Sélectionnez une marque</option>
							{brandOptions.map((brand, index) => (
								<option key={index} value={brand.name}>
									{brand.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<CustomInput
					label="Immatriculation"
					name="registration"
					value={updatedAnnonce.registration}
					onChange={handleInputChange}
					placeholder="Format: AA-123-AA"
				/>
				{registrationError && (
					<p className="text-red-500 col-span-4">
						{registrationError}
					</p>
				)}

				<div className="flex-grow">
					<div className="relative w-auto h-40 ml-auto">
						<label
							htmlFor="main_image_url"
							className="block mb-2 text-neutral-content"
						>
							Image Principale
						</label>
						{mainImageUrl && (
							<Image
								className="float-center object-fit: contain rounded-md"
								src={mainImageUrl}
								alt={initialAnnonce.annonce_title}
								style={{ objectFit: "contain" }}
								width={200}
								height={200}
								priority={true}
							/>
						)}
					</div>
				</div>

				<div className="form-group mb-4">
					{selectedImage && typeof selectedImage === "object" && (
						<div className="w-full h-auto mb-2 rounded border border-gray-300 ">
							<Image
								src={selectedImage.url}
								alt={updatedAnnonce.annonce_title}
								width={200}
								height={200}
								className="float-center object-fit: contain"
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
						style={{
							objectFit: "contain",
							maxHeight: 200,
							width: "auto",
						}}
						accept="image/jpeg, image/jpg, image/webp, image/png"
						onChange={handleImageChange}
						className=" cursor-pointer w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none text-neutral-content"
					/>
					{selectedImage && (
						<button
							onClick={() => setSelectedImage(null)}
							className="block mt-2 text-sm text-red-500 justify-center w-full px-3 py-2 rounded border border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white"
						>
							Supprimer l'image
						</button>
					)}
				</div>

				<div className="form-group mb-4 col-span-4 ">
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
						className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none"
						rows={6}
					/>
				</div>

				<CustomInput
					label="Prix en €"
					name="price"
					type="number"
					value={updatedAnnonce.price}
					onChange={handleInputChange}
				/>

				<CustomInput
					label="Puissance"
					name="power"
					type="number"
					value={updatedAnnonce.power}
					onChange={handleInputChange}
				/>

				<CustomInput
					label="Unité de puissance"
					name="power_unit"
					value={updatedAnnonce.power_unit}
					onChange={handleInputChange}
					selectOptions={["kW", "CV"]}
				/>

				<CustomInput
					label="Couleur"
					name="color"
					value={updatedAnnonce.color}
					onChange={handleInputChange}
				/>

				<CustomInput
					label="Modèle"
					name="model_name"
					value={updatedAnnonce.model_name}
					onChange={handleInputChange}
				/>

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

				<CustomInput
					label="Année de fabrication"
					name="manufacture_year"
					type="number"
					value={updatedAnnonce.manufacture_year}
					onChange={handleInputChange}
					selectOptions={years.map(String)}
				/>

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

				<div className="form-group mb-4 col-span-4">
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
						className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none"
						rows={6}
					/>
				</div>

				{/* Bouton de soumission du formulaire */}
				<button
					onClick={handleUpdateAnnonce}
					className="w-3/5 mx-auto py-2 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent col-span-4 transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
				>
					Mettre l'annonce n°{initialAnnonce.Id_CarAnnonce} à jour
				</button>
			</div>{" "}
			{/* Message de soumission */}
			{submissionMessage && (
				<p className="text-center text-3xl font-bold text-green-500 ">
					{submissionMessage}
				</p>
			)}
		</div>
	);
};

export default UpdateAnnonce;
