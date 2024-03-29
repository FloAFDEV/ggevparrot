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
			<div
				className="dark:bg-gray-600 bg-gray-500 rounded-lg shadow-md p-4 max-w-md w-full relative sm:max-w-lg sm:w-auto border-4 border-white bg-opacity-95"
				style={{ maxHeight: "85vh", overflowY: "auto" }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className="btn btn-circle btn-outline top-0 right-0 m-2 text-3xl text-primary bg-slate-600 hover:text-red-600 dark:hover:text-red-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h1 className="text-center text-3xl font-bold mb-4 text-gray-300">
					Cet accès est réservé au personnel
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
