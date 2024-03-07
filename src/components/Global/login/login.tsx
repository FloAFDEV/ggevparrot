import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
	// J'importe le hook useRouter pour la navigation
	const router = useRouter();
	// Je crée des états pour stocker l'email, le mot de passe et les erreurs de connexion
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Je définis une fonction pour gérer la connexion de l'utilisateur
	const handleLogin = async () => {
		try {
			// J'appelle signIn pour authentifier l'utilisateur avec les informations fournies
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			// Si une erreur survient lors de la connexion, je la stocke dans l'état d'erreur
			if (result && result.error) {
				setError("Adresse e-mail ou mot de passe incorrect.");
			} else {
				// Sinon, je redirige l'utilisateur vers la page d'accueil
				router.push("/");
			}
		} catch (error) {
			// Si une erreur se produit pendant le processus de connexion, je la logge et j'affiche un message d'erreur générique à l'utilisateur
			console.error("Erreur lors de la connexion :", error);
			setError("Une erreur s'est produite. Veuillez réessayer.");
		}
	};

	// Je définis une fonction pour gérer la soumission du formulaire
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// J'empêche le comportement par défaut du formulaire
		e.preventDefault();
		// J'appelle la fonction handleLogin pour gérer la connexion
		await handleLogin();
	};

	return (
		<div className="p-4 text-base-content space-y-4">
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-gray-200">
						Email:
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
						className="w-full px-4 py-2 text-white bg-neutral rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 bg-opacity-60"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block text-gray-200">
						Mot de passe:
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="current-password"
						className="bg-neutral w-full px-4 py-2 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 bg-opacity-60"
					/>
				</div>
				<button
					type="submit"
					className="btn btn-secondary w-full px-4 py-2 text-lg text-white rounded-lg"
				>
					Se connecter
				</button>
			</form>
		</div>
	);
};

export default Login;
