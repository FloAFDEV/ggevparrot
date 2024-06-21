import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	fetchAllAnnonces,
	deleteAnnonce,
	addAnnonce,
	updateAnnonce,
} from "@/components/utils/apiService";
import UpdateAnnonce from "@/pages/admin/adminComponents/UpdateAnnonce";
import DeleteAnnonce from "@/pages/admin/adminComponents/DeleteAnnonce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
		} catch (error) {
			console.error(
				"Erreur lors de la suppression de l'annonce :",
				error
			);
		}
	};

	const handleUpdateAnnonce = async (
		annonceId: number,
		updatedAnnonce: Annonce
	) => {
		try {
			const updated = await updateAnnonce(annonceId, updatedAnnonce);
			setAnnonces((prevAnnonces) =>
				prevAnnonces.map((annonce) =>
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

	const handleCloseUpdateModal = () => {
		setSelectedAnnonce(null);
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

			{/* Modal de mise à jour de l'annonce */}
			{selectedAnnonce && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50">
					<div className="bg-primary p-1 rounded-lg w-4/5 h-auto overflow-auto">
						<UpdateAnnonce
							annonceId={selectedAnnonce.Id_CarAnnonce}
							initialAnnonce={selectedAnnonce}
							mainImageUrl={selectedAnnonce.main_image_url}
							closeModal={handleCloseUpdateModal}
							onUpdate={handleUpdateAnnonce}
						/>
						<button
							className="mx-2 my-2 px-4 py-2 bg-neutral text-neutral-content hover:text-green-400 rounded"
							onClick={handleCloseUpdateModal}
						>
							Fermer
						</button>
					</div>
				</div>
			)}

			{/* Modal de suppression de l'annonce */}
			{showDeleteModal && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50">
					<div className="bg-primary-content p-4 rounded-lg max-w-4xl overflow-auto">
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
