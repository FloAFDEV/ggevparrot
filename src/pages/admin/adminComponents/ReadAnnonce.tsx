import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAllAnnonces } from "@/components/utils/apiService";
import UpdateAnnonce from "@/pages/admin/adminComponents/UpdateAnnonce";
import DeleteAnnonce from "@/pages/admin/adminComponents/DeleteAnnonce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deleteAnnonceId, setDeleteAnnonceId] = useState<number | null>(null);

	// Récupère les annonces au montage
	useEffect(() => {
		handleFetchAnnonces();
	}, []);

	// Fonction pour récupérer les annonces depuis l'API
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

	// Gère le clic pour sélectionner une annonce et afficher ses détails
	const handleSelectAnnonce = (annonce: Annonce) => {
		setSelectedAnnonce(annonce);
	};

	// Gère le clic pour modifier une annonce
	const handleUpdateClick = (annonce: Annonce) => {
		setSelectedAnnonce(annonce);
		setShowUpdateModal(true);
	};

	// Gère le clic pour supprimer une annonce
	const handleDeleteClick = (annonceId: number) => {
		setDeleteAnnonceId(annonceId);
		setShowDeleteModal(true);
	};

	// Confirme la suppression de l'annonce et la supprime
	const handleConfirmDelete = (annonceId: number) => {
		// Ajoutez ici votre logique de suppression
		console.log(`Supprimer l'annonce avec l'ID ${annonceId}`);
		// Vous pourriez appeler une API de suppression et mettre à jour l'état en conséquence
		setAnnonces((prevAnnonces) =>
			prevAnnonces.filter(
				(annonce) => annonce.Id_CarAnnonce !== annonceId
			)
		);
		setShowDeleteModal(false);
	};

	// Ferme la modale des détails
	const handleCloseModal = () => {
		setSelectedAnnonce(null);
	};

	// Ferme la modale de modification
	const handleCloseUpdateModal = () => {
		setShowUpdateModal(false);
	};

	return (
		<div className="admin-page">
			<table className="w-full border-collapse table-fixed">
				<thead>
					<tr className="bg-neutral text-neutral-content">
						<th className="px-4 py-2">Titre de l'annonce</th>
						<th className="px-4 py-2">Marque</th>
						<th className="px-4 py-2">Date de création</th>
						<th className="px-4 py-2">Photo Principale</th>
						<th className="px-4 py-2">Id de l'annonce</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{annonces.map((annonce) => (
						<tr
							key={annonce.Id_CarAnnonce}
							className="border-b hover:bg-neutral-content hover:text-accent-content cursor-pointer text-center"
							onClick={() => handleSelectAnnonce(annonce)}
						>
							<td className="px-4 py-2 font-bold">
								<Image
									src={annonce.brand_logo_url}
									alt={annonce.annonce_title}
									width={45}
									height={45}
									className="float-left ml-4 mr-4 bg-gray-200 w-10 h-auto rounded"
								/>
								{annonce.annonce_title}
							</td>
							<td className="p-4">{annonce.brand_name}</td>
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
							<td className="px-4 py-2 flex items-center justify-center">
								{annonce.main_image_url && (
									<Image
										src={annonce.main_image_url}
										alt={annonce.annonce_title}
										width={100}
										height={100}
									/>
								)}
							</td>
							<td className="px-4 py-2 font-semibold">
								{annonce.Id_CarAnnonce}
							</td>
							<td className="px-4 py-2 space-x-10">
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleUpdateClick(annonce);
									}}
									className="mr-2 text-green-600"
								>
									<FontAwesomeIcon icon={faEdit} />
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteClick(
											annonce.Id_CarAnnonce
										);
									}}
									className="mr-2 text-red-600"
								>
									<FontAwesomeIcon icon={faTrash} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedAnnonce && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50">
					<div className="bg-neutral text-neutral-content p-8 rounded-lg max-w-4xl overflow-auto">
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
										width="220"
										height="200"
									/>
									<p className="absolute bottom-2 font-semibold text-xl right-20 text-white">
										Annonce n°{" "}
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
							className="mt-4 px-4 py-2 bg-neutral text-neutral-content hover:text-green-400 rounded"
							onClick={handleCloseModal}
						>
							Fermer
						</button>
					</div>
				</div>
			)}
			{showUpdateModal && selectedAnnonce && (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
					<div className="bg-neutral p-8 rounded-lg max-w-4xl overflow-auto">
						<UpdateAnnonce
							annonceId={selectedAnnonce.Id_CarAnnonce}
							initialAnnonce={selectedAnnonce}
							mainImageUrl={selectedAnnonce.main_image_url}
							closeModal={handleCloseUpdateModal}
						/>
						<button
							className="mt-4 px-4 py-2 bg-neutral text-neutral-content hover:text-green-400 rounded"
							onClick={handleCloseUpdateModal}
						>
							Fermer
						</button>
					</div>
				</div>
			)}
			{showDeleteModal && (
				<DeleteAnnonce
					annonceId={deleteAnnonceId}
					closeModal={() => setShowDeleteModal(false)}
					onDelete={handleConfirmDelete}
				/>
			)}
		</div>
	);
};

export default ReadAnnonce;
