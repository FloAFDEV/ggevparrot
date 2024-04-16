import React, { useState, useEffect } from "react";
import Image from "next/image";
import AdminNavbar from "./AdminNavbar";
import {
	fetchAllAnnonces,
	fetchAnnonceById,
} from "@/components/utils/apiService";

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

const AdminPage = () => {
	const [annonces, setAnnonces] = useState<Annonce[]>([]);
	const [selectedAnnonceId, setSelectedAnnonceId] = useState<number | null>(
		null
	);
	const [showAnnonces, setShowAnnonces] = useState(false);

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

	const handleSelectAnnonce = async (Id_CarAnnonce: number) => {
		if (selectedAnnonceId === Id_CarAnnonce) {
			setSelectedAnnonceId(null);
		} else {
			setSelectedAnnonceId(Id_CarAnnonce);
		}
	};

	return (
		<div className="admin-page">
			<AdminNavbar
				onFetchAnnonces={handleFetchAnnonces}
				onShowAnnonces={() => setShowAnnonces(true)}
				onAddAnnonce={() => {}}
				onDeleteAnnonce={() => {}}
				onUpdateAnnonce={() => {}}
			/>
			{showAnnonces && (
				<table className="w-full border-collapse">
					<thead>
						<tr className="bg-gray-200">
							<th className="px-4 py-2">Titre de l'annonce</th>
							<th className="px-4 py-2">Marque</th>
							<th className="px-4 py-2">Photo Principale</th>
							<th className="px-4 py-2">Date de création</th>
							<th className="px-4 py-2">Id de l'annonce</th>
						</tr>
					</thead>
					<tbody>
						{annonces.map((annonce) => (
							<React.Fragment key={annonce.Id_CarAnnonce}>
								<tr
									className="border-b hover:bg-gray-100 cursor-pointer text-center"
									onClick={() =>
										handleSelectAnnonce(
											annonce.Id_CarAnnonce
										)
									}
								>
									<td className="px-4 py-2 font-bold">
										{annonce.annonce_title}
									</td>
									<td className="px-4 py-2">
										{annonce.brand_name}
									</td>
									<td className="px-4 py-2">
										{annonce.main_image_url && (
											<Image
												src={annonce.main_image_url}
												alt={annonce.annonce_title}
												width={100}
												height={100}
											/>
										)}
									</td>
									<td className="px-4 py-2">
										{annonce.annonce_createdAt}
									</td>
									<td className="px-4 py-2">
										{annonce.Id_CarAnnonce}
									</td>
								</tr>
								{selectedAnnonceId ===
									annonce.Id_CarAnnonce && (
									<tr>
										<td colSpan={4}>
											<div className="mb-8 mx-4">
												<h2 className="text-xl font-bold py-2">
													Détails de l'annonce n°{" "}
													{annonce.Id_CarAnnonce}
												</h2>
											</div>
											<div className="grid grid-cols-2 gap-8 m-5">
												<div className="col-span-2 md:col-span-1">
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Date de création
																:
															</p>
															<p>
																{
																	annonce.annonce_createdAt
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Marque :
															</p>
															<p>
																{
																	annonce.brand_name
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Modèle :
															</p>
															<p>
																{
																	annonce.model_name
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Année de
																fabrication :
															</p>
															<p>
																{
																	annonce.manufacture_year
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Couleur :
															</p>
															<p>
																{annonce.color}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Carburant :
															</p>
															<p>
																{
																	annonce.fuel_type
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Kilométrage :
															</p>
															<p>
																{
																	annonce.mileage
																}{" "}
																km
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Immatriculation
																:
															</p>
															<p>
																{
																	annonce.registration
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Puissance :
															</p>
															<p>
																{annonce.power}{" "}
																{
																	annonce.power_unit
																}
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Prix :
															</p>
															<p>
																{annonce.price}{" "}
																€
															</p>
														</div>
														<div className="mb-4">
															<p className="font-semibold mb-1">
																Options :
															</p>
															<p>
																{
																	annonce.options_name
																}
															</p>
														</div>
													</div>
												</div>
												<div className="col-span-2 md:col-span-1">
													<div>
														<p className="font-semibold mb-1">
															Description :
														</p>
														<p>
															{
																annonce.description
															}
														</p>
													</div>
												</div>
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default AdminPage;
