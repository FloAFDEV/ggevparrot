import React, { useState, useEffect } from "react";
import AdminNavbar from "@/components/adminComponents/AdminNavbar";
import ReadAnnonce from "@/components/adminComponents/ReadAnnonce";

// Récupérer le token avec le rôle de l'user connecté

const AdminPage = () => {
	const [showAnnonces, setShowAnnonces] = useState(false);
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		handleFetchAnnonces();
	}, []);

	const handleFetchAnnonces = async () => {
		try {
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des annonces :",
				error
			);
		}
	};

	return (
		<div className="admin-page ">
			<AdminNavbar
				onFetchAnnonces={handleFetchAnnonces}
				onShowAnnonces={() => setShowAnnonces(true)}
				onAddAnnonce={() => {}}
				onDeleteAnnonce={() => {}}
				onUpdateAnnonce={() => {}}
				userRole={userRole}
				// token du user connecté => rôle
			/>
			{showAnnonces && <ReadAnnonce />}
		</div>
	);
};

export default AdminPage;

// migrer les "pages" admin en tant que composants dans "adminComponents"
