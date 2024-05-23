import React, { useState, useEffect } from "react";
import Link from "next/link";
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
			<div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
				<p className="text-5xl font-bold bg-gradient-to-r from-orange-300 via-red-500 to-purple-600 bg-clip-text text-transparent mb-8 text-center px-4 sm:px-0">
					Vous n'êtes pas autorisé à accéder à cette page! <br />
					<span>Authentifiez-vous</span> ou quittez.
				</p>
				<Link
					href="/"
					className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 mt-10 text-4xl rounded-xl"
				>
					Retour au site
				</Link>
			</div>
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
