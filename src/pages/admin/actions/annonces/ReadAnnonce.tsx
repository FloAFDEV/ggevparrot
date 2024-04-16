import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAllAnnonces } from "@/components/utils/apiService";

// Définition de l'interface
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

const ReadAnnonce = () => {
	const [annonces, setAnnonces] = useState<Annonce[]>([]);
	const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(
		null
	);

	useEffect(() => {
		handleFetchAnnonces();
	}, []);

	const handleFetchAnnonces = async () => {
		try {
			const annoncesData = await fetchAllAnnonces();
			setAnnonces(annoncesData);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des annonces :",
				error
			);
		}
	};

	const handleSelectAnnonce = (annonce: Annonce) => {
		setSelectedAnnonce(annonce);
	};

	const handleCloseModal = () => {
		setSelectedAnnonce(null);
	};

	return (
		<div className="admin-page">
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gray-200">
						<th className="px-4 py-2">Titre de l'annonce</th>
						<th className="px-4 py-2">Marque</th>
						<th className="px-4 py-2">Date de création</th>
						<th className="px-4 py-2">Photo Principale</th>
						<th className="px-4 py-2">Id de l'annonce</th>
					</tr>
				</thead>
				<tbody>
					{annonces.map((annonce) => (
						<tr
							key={annonce.Id_CarAnnonce}
							className="border-b hover:bg-gray-100 cursor-pointer text-center"
							onClick={() => handleSelectAnnonce(annonce)}
						>
							<td className="px-4 py-2 font-bold">
								{annonce.annonce_title}
							</td>
							<td className="px-4 py-2">{annonce.brand_name}</td>
							<td className="px-4 py-2">
								{new Date(
									annonce.annonce_createdAt
								).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric",
									hour: "numeric",
									minute: "numeric",
								})}
							</td>
							<td className="px-4 py-2">
								{annonce.main_image_url && (
									<Image
										src={annonce.main_image_url}
										alt={annonce.annonce_title}
										width={100}
										height={100}
										className="float-right"
									/>
								)}
							</td>
							<td className="px-4 py-2">
								{annonce.Id_CarAnnonce}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedAnnonce && (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg max-w-4xl overflow-auto">
						<h2 className="text-xl font-bold mb-4">
							Détails de l'annonce:{" "}
							{selectedAnnonce.annonce_title}
						</h2>
						<div className="flex items-center mb-4">
							{selectedAnnonce.brand_logo_url && (
								<Image
									src={selectedAnnonce.brand_logo_url}
									alt={selectedAnnonce.brand_name}
									width={100}
									height={100}
									className="mr-4"
								/>
							)}
							<div className="flex-grow">
								<div className="relative w-72 h-40 ml-auto">
									<Image
										src={selectedAnnonce.main_image_url}
										alt={selectedAnnonce.annonce_title}
										layout="fill"
										objectFit="cover"
									/>
									<p className="absolute bottom-2 right-2 text-white">
										ID de l'annonce:{" "}
										{selectedAnnonce.Id_CarAnnonce}
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap mb-4">
							<div className="w-1/3">
								<p className="font-semibold">Marque :</p>
								<p>{selectedAnnonce.brand_name}</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">Modèle :</p>
								<p>{selectedAnnonce.model_name}</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">
									Année de fabrication :
								</p>
								<p>{selectedAnnonce.manufacture_year}</p>
							</div>
						</div>
						<div className="flex flex-wrap mb-4">
							<div className="w-1/3">
								<p className="font-semibold">Couleur :</p>
								<p>{selectedAnnonce.color}</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">Carburant :</p>
								<p>{selectedAnnonce.fuel_type}</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">Kilométrage :</p>
								<p>{selectedAnnonce.mileage} km</p>
							</div>
						</div>
						<div className="flex flex-wrap mb-4">
							<div className="w-1/3">
								<p className="font-semibold">
									Immatriculation :
								</p>
								<p>{selectedAnnonce.registration}</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">Puissance :</p>
								<p>
									{selectedAnnonce.power}{" "}
									{selectedAnnonce.power_unit}
								</p>
							</div>
							<div className="w-1/3">
								<p className="font-semibold">Prix :</p>
								<p>{selectedAnnonce.price} €</p>
							</div>
						</div>
						<div className="mb-4">
							<p className="font-semibold">Options :</p>
							<p>{selectedAnnonce.options_name}</p>
						</div>
						<div className="mb-4">
							<p className="font-semibold">Description :</p>
							<p>{selectedAnnonce.description}</p>
						</div>
						<button
							className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
							onClick={handleCloseModal}
						>
							Fermer
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReadAnnonce;
