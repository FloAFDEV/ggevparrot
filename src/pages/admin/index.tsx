import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AdminNavbar from "@/pages/admin/adminComponents/AdminNavbar";
import ReadAnnonce from "@/pages/admin/adminComponents/ReadAnnonce";

// Récupérer le token avec le rôle de l'user connecté

const AdminPage = () => {
	const [showAnnonces, setShowAnnonces] = useState(false);
	const [userRole, setUserRole] = useState("");
	const { data: session, status } = useSession();
	console.log(session, status);

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

	if (status === "loading")
		return (
			<p className="text-center text-5xl font-bold text-black">
				Chargement...
			</p>
		);
	if (!session)
		return (
			<p className="text-center text-5xl font-bold text-black">
				Veuillez vous connecter pour accéder à cette page.
			</p>
		);
	if (
		!session.user ||
		!userRole ||
		!["superAdmin", "admin", "employé"].includes(userRole)
	)
		return (
			<div className="admin-page min-h-screen flex flex-col items-center bg-content">
				<AdminNavbar
					onFetchAnnonces={handleFetchAnnonces}
					onShowAnnonces={() => setShowAnnonces(true)}
					onAddAnnonce={() => {}}
					onDeleteAnnonce={() => {}}
					onUpdateAnnonce={() => {}}
					userRole={userRole}
				/>
				{showAnnonces && <ReadAnnonce />}
			</div>
		);
};

export default AdminPage;

// migrer les "pages" admin en tant que composants dans "adminComponents"
