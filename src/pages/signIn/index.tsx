import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/components/Global/Logo/Logo";
import Link from "next/link";

const MAX_ATTEMPTS = 5; // Nombre maximal de tentatives de connexion autorisées

const LoginPage = () => {
	// États pour gérer les champs de formulaire, l'état de chargement, les messages de succès et d'erreur, et d'autres états pertinents
	const [email, setEmail] = useState<string>(""); // Champ email
	const [password, setPassword] = useState<string>(""); // Champ mot de passe
	const [loading, setLoading] = useState<boolean>(false); // État pour le chargement en cours
	const [success, setSuccess] = useState<string>(""); // Message de succès après connexion réussie
	const [error, setError] = useState<string>(""); // Message d'erreur en cas d'échec de connexion
	const [showPassword, setShowPassword] = useState<boolean>(false); // État pour afficher ou masquer le mot de passe
	const [attemptCount, setAttemptCount] = useState<number>(0); // Compteur de tentatives de connexion

	// Effet pour effacer le message de succès après 5 secondes
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (success) {
			timer = setTimeout(() => {
				setSuccess("");
			}, 5000);
		}
		return () => clearTimeout(timer); // Nettoie le timer lorsque le composant est démonté ou que success change
	}, [success]); // Déclenche l'effet uniquement lorsque success change

	// Fonction pour gérer la soumission du formulaire de connexion
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire
		setLoading(true); // Active l'état de chargement
		// Validation du mot de passe avant la soumission
		if (!validatePassword(password)) {
			setError(
				"Le mot de passe doit contenir au moins une majuscule, deux chiffres et avoir une longueur minimale de 7 caractères."
			);
			setLoading(false); // Désactive l'état de chargement
			return; // Arrête l'exécution de la fonction
		}
		try {
			// Appel à la fonction signIn de next-auth pour la connexion
			const signInResponse = await signIn("credentials", {
				email,
				password,
				callbackUrl: "/", // URL de redirection après la connexion réussie
				redirect: true,
			});
			setLoading(false); // Désactive l'état de chargement après la réponse
			// Vérifie s'il n'y a pas d'erreur de connexion
			if (!signInResponse?.error) {
				setSuccess("Connexion réussie!"); // Définit le message de succès
				setAttemptCount(0); // Réinitialise le compteur de tentatives
			} else {
				// Incrémente le compteur de tentatives en cas d'échec de connexion
				setAttemptCount(attemptCount + 1);
				// Gestion des erreurs spécifiques
				if (signInResponse.error === "CredentialsSignin") {
					setError("Identifiant ou mot de passe incorrect");
				} else {
					setError(
						"Une erreur s'est produite lors de la connexion. Veuillez réessayer."
					);
				}
			}
		} catch (error) {
			console.error("Error during sign in:", error);
			setLoading(false); // Désactive l'état de chargement en cas d'erreur
			setError(
				"Une erreur s'est produite lors de la connexion. Veuillez réessayer."
			);
		}
	};

	// Fonction de validation du mot de passe
	const validatePassword = (password: string): boolean => {
		const hasUpperCase = /[A-Z]/.test(password);
		const hasTwoDigits = (password.match(/\d/g) ?? []).length >= 2;
		const hasMinimumLength = password.length >= 7;
		return hasUpperCase && hasTwoDigits && hasMinimumLength;
	};

	// Fonction pour basculer l'affichage du mot de passe
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	// Fonction pour vérifier si le nombre maximal de tentatives est atteint
	const isMaxAttemptsReached = (): boolean => {
		return attemptCount >= MAX_ATTEMPTS;
	};

	// Rendu du composant de la page de connexion
	return (
		<div className="flex flex-col gap-10 max-sm:gap-5 justify-center items-center min-h-screen bg-gradient-to-br from-sky-900 to-accent text-white">
			<h1 className="text-4xl lg:text-6xl font-bold m-4 text-center">
				Cet espace est réservé au personnel de l'entreprise
			</h1>
			<Link href="/">
				<Logo
					src="/favicon.ico"
					className="p-2 rounded-full h-24 w-24 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
				/>
			</Link>
			<h2 className="text-4xl font-bold mb-4">Connexion</h2>
			<form
				onSubmit={handleSubmit}
				className="space-y-4 text-xl w-full max-w-md px-4 md:px-0"
			>
				{loading && (
					<div className="flex items-center justify-center">
						<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
						<span className="ml-4">Chargement...</span>
					</div>
				)}
				{error && (
					<div className="w-full mx-auto text-center text-red-500 bg-red-100 p-4 rounded-md">
						<svg
							className="w-6 h-6 inline-block mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 4v16m0-16V4m0 12h.01M12 12h.01"
							></path>
						</svg>
						{error}
					</div>
				)}
				{success && (
					<div className="w-full mx-auto text-center text-green-500 bg-green-100 p-4 rounded-md">
						{success}
					</div>
				)}
				<div>
					<label htmlFor="email" className="sr-only">
						Adresse email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						placeholder="Votre email"
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
						aria-label="Adresse email"
						className="w-full px-4 py-2 bg-transparent border-b border-white focus:outline-none focus:border-accent-content"
					/>
				</div>
				<div className="relative">
					<label htmlFor="password" className="sr-only">
						Mot de passe
					</label>
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						name="password"
						value={password}
						placeholder="Votre mot de passe"
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="current-password"
						aria-label="Mot de passe"
						className="w-full px-4 py-2 bg-transparent border-b border-white focus:outline-none focus:border-accent-content"
					/>
					<button
						type="button"
						onClick={toggleShowPassword}
						className="absolute inset-y-0 right-0 flex items-center mr-3 focus:outline-none"
					>
						<Image
							src="/assets/Stylized-Eye.svg"
							alt={
								showPassword ? "Hide password" : "Show password"
							}
							width={24}
							height={24}
							className="h-6 w-6"
						/>
					</button>
				</div>
				<button
					type="submit"
					disabled={loading || isMaxAttemptsReached()}
					className="btn btn-primary w-full px-4 py-2 rounded-xl text-lg shadow-xl"
				>
					{loading ? "Chargement..." : "Me connecter"}
				</button>
			</form>
			<div className="flex justify-end mt-10">
				<button
					className="btn text-gray-600 text-sm rounded-3xl"
					onClick={() => {
						window.location.href = "/";
					}}
				>
					Oups ! Je me suis trompé
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
