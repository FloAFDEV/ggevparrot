import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	fetchAllAnnonces,
	deleteAnnonce,
	addAnnonce,
	updateAnnonce,
	updateValidationStatus,
} from "@/components/utils/apiService";
import UpdateAnnonce from "@/pages/admin/adminComponents/UpdateAnnonce";
import DeleteAnnonce from "@/pages/admin/adminComponents/DeleteAnnonce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Annonce {
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
	valid: boolean;
	annonce_valid?: number;
}

const ReadAnnonce = () => {
	const [annonces, setAnnonces] = useState<Annonce[]>([]);
	const [selectedAnnonce, setSelectedAnnonce] = useState<Annonce | null>(
		null
	);
	const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [deleteAnnonceId, setDeleteAnnonceId] = useState<number | null>(null);

	useEffect(() => {
		handleFetchAnnonces();
	}, []);

	const handleFetchAnnonces = async () => {
		try {
			const annoncesData = await fetchAllAnnonces();
			console.log(
				"Annonces récupérées depuis la base de données :",
				annoncesData
			);
			const adaptedAnnoncesData = annoncesData?.map((annonce) => ({
				...annonce,
				valid: annonce.annonce_valid === 1,
			}));
			setAnnonces(adaptedAnnoncesData);
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

	const handleUpdateClick = (annonce: Annonce) => {
		setSelectedAnnonce(annonce);
		setShowUpdateModal(true);
	};

	const handleDeleteClick = (annonceId: number) => {
		setDeleteAnnonceId(annonceId);
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = async (annonceId: number) => {
		try {
			await deleteAnnonce(annonceId);
			setAnnonces((prevAnnonces) =>
				prevAnnonces.filter(
					(annonce) => annonce.Id_CarAnnonce !== annonceId
				)
			);
			setShowDeleteModal(false);
			console.log(`Annonce ${annonceId} supprimée avec succès !`);
		} catch (error) {
			console.error(
				"Erreur lors de la suppression de l'annonce :",
				error
			);
		}
	};

	const handleToggleValidity = async (
		annonceId: number,
		newValidity: boolean
	) => {
		try {
			await updateValidationStatus(annonceId, newValidity);
			// Met à jour l'état local avec le bon champ `valid`
			setAnnonces(
				(prevAnnonces) =>
					prevAnnonces?.map((annonce) =>
						annonce.Id_CarAnnonce === annonceId
							? { ...annonce, valid: newValidity }
							: annonce
					)
			);
			console.log(
				`Statut de validité de l'annonce ${annonceId} mis à jour avec succès !`
			);
		} catch (error) {
			console.error(
				`Erreur lors de la mise à jour de l'annonce ${annonceId} :`,
				error
			);
		}
	};

	const handleCloseUpdateModal = () => {
		setSelectedAnnonce(null);
		setShowUpdateModal(false);
	};

	const handleAddAnnonce = async (newAnnonce: Annonce) => {
		try {
			const addedAnnonce = await addAnnonce(newAnnonce);
			setAnnonces((prevAnnonces) => [...prevAnnonces, addedAnnonce]);
			console.log("Annonce ajoutée avec succès !");
		} catch (error) {
			console.error("Erreur lors de l'ajout de l'annonce :", error);
		}
	};

	const handleUpdateAnnonce = async (
		annonceId: number,
		updatedAnnonce: Partial<Annonce>
	) => {
		try {
			const updated = await updateAnnonce(
				annonceId,
				updatedAnnonce as Annonce
			);
			setAnnonces(
				(prevAnnonces) =>
					prevAnnonces?.map((annonce) =>
						annonce.Id_CarAnnonce === annonceId ? updated : annonce
					)
			);
			setShowUpdateModal(false);
		} catch (error) {
			console.error(
				"Erreur lors de la mise à jour de l'annonce :",
				error
			);
		}
	};

	return (
		<div className="admin-page px-4 md:px-8">
			<table className="w-full border-collapse table-fixed">
				<thead>
					<tr className="bg-neutral text-neutral-content">
						<th className="px-4 py-2 md:px-4">
							Titre de l'annonce
						</th>
						<th className="px-4 py-2 md:px-4">Marque</th>
						<th className="px-4 py-2 md:px-4">Date de création</th>
						<th className="px-4 py-2 md:px-4">Photo Principale</th>
						<th className="px-4 py-2 md:px-4">Id de l'annonce</th>
						<th className="px-4 py-2 md:px-4">Statut</th>
						<th className="px-4 py-2 md:px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{annonces?.map((annonce) => (
						<tr
							key={annonce.Id_CarAnnonce}
							className="border-b hover:bg-neutral-content hover:text-accent-content cursor-pointer text-center"
							onClick={() => handleSelectAnnonce(annonce)}
						>
							<td className="px-2 py-2 md:px-4 font-bold">
								<Image
									src={annonce.main_image_url}
									alt={annonce.annonce_title}
									width={45}
									height={45}
									className="float-left ml-4 mr-4 bg-gray-200 w-10 h-auto rounded"
								/>
								{annonce.annonce_title}
							</td>
							<td className="p-2 md:p-4">{annonce.brand_name}</td>
							<td className="px-2 py-2 md:px-4">
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
							<td className="px-2 py-2 md:px-4 flex items-center justify-center">
								{annonce.main_image_url && (
									<Image
										src={annonce.main_image_url}
										alt={annonce.annonce_title}
										width={100}
										height={100}
									/>
								)}
							</td>
							<td className="px-2 py-2 md:px-4 font-semibold">
								{annonce.Id_CarAnnonce}
							</td>
							<td className="px-2 py-2 md:px-4">
								<button
									className={`px-2 py-1 rounded ${
										annonce.valid
											? "bg-green-500 text-white"
											: "bg-red-500 text-white"
									}`}
									onClick={(e) => {
										e.stopPropagation();
										handleToggleValidity(
											annonce.Id_CarAnnonce,
											!annonce.valid
										);
									}}
								>
									{annonce.valid ? "Validée" : "Non validée"}
								</button>
							</td>
							<td className="px-2 py-2 md:px-4 space-x-10">
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

			{/* Modal de mise à jour de l'annonce */}
			{selectedAnnonce && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50 z-50 overflow-y-auto">
					<div className="bg-neutral p-4 rounded-lg w-11/12 md:w-3/5 lg:w-3/5 h-auto max-h-screen overflow-y-auto">
						<UpdateAnnonce
							annonceId={selectedAnnonce.Id_CarAnnonce}
							initialAnnonce={selectedAnnonce}
							mainImageUrl={selectedAnnonce.main_image_url}
							closeModal={handleCloseUpdateModal}
							onUpdate={handleUpdateAnnonce}
						/>
						<button
							className="mx-auto py-2 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent col-span-full transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
							onClick={handleCloseUpdateModal}
						>
							Fermer
						</button>
					</div>
				</div>
			)}

			{/* Modal de suppression de l'annonce */}
			{showDeleteModal && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50 z-50 overflow-y-auto">
					<div className="bg-neutral p-4 rounded-lg md:max-w-xl h-auto max-h-screen overflow-y-auto">
						<DeleteAnnonce
							annonceId={deleteAnnonceId}
							closeModal={() => setShowDeleteModal(false)}
							onDelete={handleConfirmDelete}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReadAnnonce;
