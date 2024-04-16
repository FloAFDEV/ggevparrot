import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import ReadAnnonce from "../admin/actions/annonces/ReadAnnonce";

const AdminPage = () => {
	const [showAnnonces, setShowAnnonces] = useState(false);

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
			/>
			{showAnnonces && <ReadAnnonce />}
		</div>
	);
};

export default AdminPage;
