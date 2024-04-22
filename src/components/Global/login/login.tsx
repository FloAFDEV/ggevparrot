import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "nookies";
import { BASE_URL } from "@/components/utils/apiService";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		try {
			// Envoie les informations d'identification à votre endpoint d'authentification
			const response = await fetch(`${BASE_URL}admin`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email, // Récupére l'email de l'état local
					password: password, // Récupére le mot de passe de l'état local
				}),
			});
			// Vérifie si la requête s'est bien passée
			if (!response.ok) {
				throw new Error("Failed to authenticate");
			}
			// Extraire le jeton JWT de la réponse
			const data = await response.json();
			const token = data.token;
			// Enregistre le jeton JWT dans les cookies
			setCookie(null, "jwtToken", token, {
				maxAge: 3600, // Cookie expire après 1 heure
				path: "/",
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});
			// Redirige l'utilisateur vers la page d'administration
			router.push("/admin");
		} catch (error) {
			console.error("Error logging in:", error);
			setError("Une erreur est survenue");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		await handleLogin();
	};

	return (
		<div className="p-4 text-base-content space-y-4">
			{loading && <div>Loading...</div>}{" "}
			{error && (
				<div className="bg-white p-2 rounded-lg text-2xl font-bold text-center">
					<p style={{ color: "red" }}>{error}</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4 font-bold">
				<div>
					<label htmlFor="email" className="sr-only">
						Email Address
					</label>
					<input
						type="email"
						value={email}
						placeholder="Votre email"
						onChange={(e) => setEmail(e.target.value)}
						required
						autoComplete="email"
						className="w-full px-4 py-2 text-white bg-neutral rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 bg-opacity-60"
					/>
				</div>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Votre mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						autoComplete="current-password"
						className="bg-neutral w-full px-4 py-2 text-white rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 bg-opacity-60"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-0 flex items-end px-2 focus:outline-none"
					>
						<Image
							src="/assets/Stylized-Eye.svg"
							alt={
								showPassword ? "Hide password" : "Show password"
							}
							width={24}
							height={24}
							className={`h-6 w-6 rounded-full ${
								showPassword ? "bg-secondary" : "bg-slate-100"
							} top-1/2 transform -translate-y-1/2`}
						/>
					</button>
				</div>
				<button
					type="submit"
					className="btn btn-primary w-full px-4 py-2 text-lg text-white rounded-lg"
				>
					Log In
				</button>
			</form>
		</div>
	);
};

export default Login;
