import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "@/components/Global/Logo/Logo";
import Link from "next/link";

const MAX_ATTEMPTS = 5;

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [attemptCount, setAttemptCount] = useState(0);

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLoading(true);
		if (!validatePassword(password)) {
			setError(
				"Le mot de passe doit contenir au moins une majuscule, deux chiffres et avoir une longueur minimale de 7 caractères."
			);
			setLoading(false);
			return;
		}
		try {
			const signInResponse = await signIn("credentials", {
				email,
				password,
				callbackUrl: "/",
				redirect: true,
			});
			setLoading(false);
			if (!signInResponse?.error) {
				// Réinitialise le compteur d'essais après une connexion réussie
				setAttemptCount(0);
				// Redirige l'utilisateur après la connexion
			} else {
				// Incrémente le compteur d'essais
				setAttemptCount(attemptCount + 1);
				console.error("Sign in error:", signInResponse.error);
				// Affichemessage d'erreur spécifique
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
			setLoading(false);
			setError(
				"Une erreur s'est produite lors de la connexion. Veuillez réessayer."
			);
		}
	};

	const validatePassword = (password: string) => {
		const hasUpperCase = /[A-Z]/.test(password);
		const hasTwoDigits = (password.match(/\d/g) ?? []).length >= 2;
		const hasMinimumLength = password.length >= 7;
		return hasUpperCase && hasTwoDigits && hasMinimumLength;
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const isMaxAttemptsReached = () => {
		return attemptCount >= MAX_ATTEMPTS;
	};

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
				{loading && <div>Loading...</div>}
				{error && (
					<div className="w-full mx-auto text-center text-cyan-400">
						{error}
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
