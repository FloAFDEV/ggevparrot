import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "nookies";
import { parseCookies } from "nookies";
import { loginUser } from "@/components/utils/apiService";
import requireAuth from "@/components/utils/authMiddleware";

const MAX_ATTEMPTS = 5;

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [attemptCount, setAttemptCount] = useState(0);

	useEffect(() => {
		const { jwtToken } = parseCookies();
		if (jwtToken) {
			router.push("/admin");
		}
	}, [router]);

	const handleLogin = async () => {
		try {
			setLoading(true);
			const loginResponse: { token: string } | string = await loginUser(
				email,
				password
			);
			const { token } =
				typeof loginResponse === "string"
					? { token: loginResponse }
					: loginResponse;
			if (!token) {
				throw new Error("Le jeton est manquant dans la réponse");
			}
			setCookie(null, "jwtToken", token, {
				maxAge: 3600, // Cookie expire après 1 heure
				path: "/",
				secure: process.env.NODE_ENV === "development",
				sameSite: "strict",
			});
			router.push("/admin");
		} catch (error) {
			setError("Identifiant ou mot de passe incorrect");
			setAttemptCount(attemptCount + 1);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (!validatePassword(password)) {
			setError(
				"Le mot de passe doit contenir au moins une majuscule, deux chiffres et avoir une longueur minimale de 7 caractères."
			);
			setLoading(false);
			return;
		}
		await handleLogin();
	};

	const validatePassword = (password: string) => {
		const hasUpperCase = /[A-Z]/.test(password);
		const hasTwoDigits = (password.match(/\d/g) ?? []).length >= 2;
		const hasMinimumLength = password.length >= 7;
		return hasUpperCase && hasTwoDigits && hasMinimumLength;
	};

	const isMaxAttemptsReached = () => {
		return attemptCount >= MAX_ATTEMPTS;
	};

	return (
		<div className="p-4 text-base-content space-y-4">
			{loading && (
				<div className="text-white font-extrabold text-2xl">
					Loading...
				</div>
			)}
			{error && (
				<div className="bg-white p-2 rounded-lg text-2xl font-bold text-center">
					<p style={{ color: "red" }}>{error}</p>
				</div>
			)}
			{isMaxAttemptsReached() && (
				<div className="bg-white p-2 rounded-lg text-2xl font-bold text-center">
					<p style={{ color: "red" }}>
						Nombre maximum de tentatives atteint.
					</p>
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
						aria-label="Adresse email"
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
						aria-label="Mot de passe"
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
				<input type="hidden" name="bot-field" />
				<button
					type="submit"
					disabled={loading || isMaxAttemptsReached()}
					className="btn btn-primary w-full px-4 py-2 text-lg text-white rounded-lg"
				>
					{loading ? "Chargement..." : "Me connecter"}
				</button>
			</form>
		</div>
	);
};

export default requireAuth(Login);
