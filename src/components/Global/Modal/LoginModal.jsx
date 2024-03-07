import React, { useState } from "react";
import { useRouter } from "next/router";
import Login from "@/components/Global/login/login";
import { signIn } from "next-auth/react";

const LoginModal = ({ closeModal }) => {
	const router = useRouter();
	const [error, setError] = useState("");

	const handleLogin = async (email, password) => {
		try {
			// Authentification avec les identifiants
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			// Gestion des erreurs
			if (result.error) {
				setError("Adresse e-mail ou mot de passe incorrect.");
			} else {
				router.push("/"); // Redirection après connexion réussie à remplacer !!!!
			}
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			setError("Erreur lors de la connexion. Veuillez réessayer.");
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto z-50">
			<div className="modal-content bg-slate-600 w-full max-w-md p-4 rounded-lg shadow-lg bg-opacity-80 ">
				<h1 className="text-center text-3xl font-bold mb-4 text-gray-300">
					Cet accès est réservé au personnel.
				</h1>
				{error && <p className="text-red-500">{error}</p>}
				<Login handleLogin={handleLogin} />
				<div className="flex justify-end">
					<button
						className="mt-4 btn btn-secondary text-white rounded"
						onClick={closeModal}
					>
						Oups ! Je me suis trompé
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
