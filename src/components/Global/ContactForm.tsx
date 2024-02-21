import React, { useState } from "react";
import Image from "next/image";

const ContactForm = ({
	Id_CarAnnonce,
	annonce_title,
	brand_logo_url,
}: {
	Id_CarAnnonce: number;
	annonce_title: string;
	brand_logo_url: string;
}) => {
	const [formData, setFormData] = useState({
		userName: "",
		userEmail: "",
		userPhone: "",
		message: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/message",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ Id_CarAnnonce, ...formData }),
				}
			);
			if (response.ok) {
				setSuccess(true);
				setError(null);
				console.log("Message envoyé avec succès !");
			} else {
				const errorData = await response.json();
				setError(errorData.message);
				setSuccess(false);
				console.error(
					"Échec de l'envoi du message :",
					errorData.message
				);
			}
		} catch (error) {
			setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
			setSuccess(false);
			console.error("Erreur lors de l'envoi du message :", error);
		}
	};

	return (
		<div className="max-w-md mx-auto p-4 text-start">
			<h2 className="text-xl font-bold mb-4 text-gray-300">
				Envoyer un message à propos de cette annonce
			</h2>
			{success && (
				<p className="text-green-600">Message envoyé avec succès !</p>
			)}
			{error && <p className="text-red-600">Erreur : {error}</p>}
			<Image
				src={brand_logo_url}
				alt="Logo de la marque"
				className="w-auto h-16 mr-2 p-2"
				width={64}
				height={64}
			/>
			<h3 className="font-bold text-2xl mb-2 text-white">
				{annonce_title}
			</h3>
			<form onSubmit={handleSubmit} className="space-y-4 ">
				<div>
					<label htmlFor="userName" className="block mb-1 text-white">
						Nom:
					</label>
					<input
						type="text"
						id="userName"
						name="userName"
						value={formData.userName}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="userEmail"
						className="block mb-1 text-white"
					>
						Email:
					</label>
					<input
						type="email"
						id="userEmail"
						name="userEmail"
						value={formData.userEmail}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="userPhone"
						className="block mb-1 text-white"
					>
						Téléphone:
					</label>
					<input
						type="tel"
						id="userPhone"
						name="userPhone"
						value={formData.userPhone}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label htmlFor="message" className="block mb-1 text-white">
						Message:
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
					></textarea>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
				>
					Envoyer
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
