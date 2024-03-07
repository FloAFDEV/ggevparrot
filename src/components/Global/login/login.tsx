import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
