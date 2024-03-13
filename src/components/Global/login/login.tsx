import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async () => {
		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (result && result.error) {
				setError("Adresse e-mail ou mot de passe incorrect.");
			} else {
				router.push("/");
			}
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			setError("Une erreur s'est produite. Veuillez réessayer.");
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleLogin();
	};

	return (
		<div className="p-4 text-base-content space-y-4">
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4 font-bold">
				<div>
					<input
						type="email"
						value={email}
						placeholder="Votre e-mail"
						onChange={(e) => setEmail(e.target.value)}
						required
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$"
						autoComplete="email"
						className="w-full px-4 py-2 text-white bg-neutral rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 bg-opacity-60"
					/>
				</div>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="Votre mot de passe"
						// pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,}$"
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
						<img
							src="/assets/Stylized-Eye.svg"
							alt={
								showPassword ? "Hide password" : "Show password"
							}
							className={`h-6 w-6 rounded-full ${
								showPassword ? "bg-secondary" : "bg-slate-100"
							} top-1/2 transform -translate-y-1/2`}
						/>
					</button>
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
