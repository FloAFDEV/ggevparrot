import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "./AdminNavbar";
import Image from "next/image";
import { fetchAllAnnonces } from "@/components/utils/apiService";

interface Annonce {
	Id_CarAnnonce: number;
	annonce_title: string;
	annonce_createdAt: string;
	brand_name: string;
	main_image_url: string;
}

const AdminPage: React.FunctionComponent = () => {
	const [annonces, setAnnonces] = useState<Annonce[]>([]);
	const [showAnnonces, setShowAnnonces] = useState(false);
	const router = useRouter(); // Initialisation du router

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

	// Fonction pour naviguer vers la page de détails de l'annonce
	const navigateToDetailsPage = (Id_CarAnnonce: number) => {
		router.push(`/annonces/${Id_CarAnnonce}`);
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
						</tr>
					</thead>
					<tbody>
						{annonces.map((annonce) => (
							<tr
								key={annonce.Id_CarAnnonce}
								className="border-b hover:bg-gray-100 cursor-pointer text-center"
								onClick={() =>
									navigateToDetailsPage(annonce.Id_CarAnnonce)
								}
							>
								<td className="px-4 py-2 font-bold">
									{annonce.annonce_title}
								</td>
								<td className="px-4 py-2">
									{annonce.brand_name}
								</td>
								<td className="px-4 py-2">
									<Image
										src={annonce.main_image_url}
										alt="Image de l'annonce"
										width={100}
										height={100}
									/>
								</td>
								<td className="px-4 py-2">
									{annonce.annonce_createdAt}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default AdminPage;
