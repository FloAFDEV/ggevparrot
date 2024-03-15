import React, { useState } from "react";
import Image from "next/image";
import { sendMessage } from "../../utils/apiService";

const ContactForm = ({
	Id_CarAnnonce,
	annonce_title,
	brand_logo_url,
	closeForm,
}: {
	Id_CarAnnonce: number;
	annonce_title: string;
	brand_logo_url: string;
	closeForm: () => void;
}) => {
	const [formData, setFormData] = useState({
		userName: "",
		userEmail: "",
		userPhone: "",
		message: "",
		Id_CarAnnonce: Id_CarAnnonce, //Champ caché comprenant l'Id de l'annonce pour envoie en db
		botField: "", // To bypass google captcha
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// Réinitialise les erreurs
		setError(null);
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		Id_CarAnnonce: number,
		formData: any
	) => {
		e.preventDefault();
		try {
			const response = await sendMessage(Id_CarAnnonce, formData);
			if (typeof response === "boolean") {
				if (response) {
					setSuccess(true);
					setError(null);
					// console.log("Message envoyé avec succès !");
				} else {
					setError(
						"Erreur lors de l'envoi du message. Veuillez réessayer."
					);
					setSuccess(false);
					console.error("Échec de l'envoi du message.");
				}
			} else {
				console.error("Réponse invalide:", response);
			}
		} catch (error) {
			setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
			setSuccess(false);
			console.error("Erreur lors de l'envoi du message :", error);
		}
	};

	// console.log("formData:", formData);

	return (
		<div className="max-w-md mx-auto p-2 text-start">
			<h2 className="text-lg font-bold mb-2 text-gray-100">
				Envoyer un message à propos de cette annonce
			</h2>
			<button
				onClick={closeForm}
				className="text-primary hover:text-secondary mb-2"
			>
				Revenir à l'annonce
			</button>
			{success && (
				<p className="text-green-400 font-extrabold">
					Message envoyé avec succès !
				</p>
			)}
			{error && <p className="text-red-600">Erreur : {error}</p>}
			<div className="flex items-center">
				<Image
					src={brand_logo_url}
					alt="Logo de la marque"
					className="w-auto h-16 mr-2 p-2"
					width={64}
					height={64}
				/>
				<h3 className="font-bold text-md mb-2 text-white">
					{annonce_title}
				</h3>
			</div>
			<form
				onSubmit={(e) => handleSubmit(e, Id_CarAnnonce, formData)}
				className="space-y-4 "
			>
				<div>
					<input
						type="hidden"
						name="Id_CarAnnonce"
						value={Id_CarAnnonce}
					/>
				</div>
				<div>
					<input
						type="text"
						id="userName"
						name="userName"
						placeholder="Votre nom"
						value={formData.userName}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
						autoComplete="username"
					/>
				</div>
				<div>
					<input
						type="email"
						id="userEmail"
						name="userEmail"
						placeholder="Votre e-mail"
						value={formData.userEmail}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						required
						autoComplete="email"
					/>
				</div>
				<div>
					<input
						type="tel"
						id="userPhone"
						name="userPhone"
						placeholder="Votre téléphone"
						value={formData.userPhone}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						pattern="(0|\+33)[1-9][0-9]{8}"
						required
						autoComplete="tel"
					/>
				</div>
				<div>
					<textarea
						id="message"
						name="message"
						placeholder="Votre message"
						value={formData.message}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						maxLength={200}
						required
					></textarea>
					<input
						type="hidden"
						name="botField"
						value={formData.botField}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-secondary text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
				>
					Envoyer
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
