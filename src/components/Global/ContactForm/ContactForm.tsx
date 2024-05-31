import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageAnnonceData, MessageAnnonce } from "../../utils/apiService";
import Link from "next/link";
import validator from "validator";

const ContactForm = ({
	Id_CarAnnonce,
	annonce_title,
	brand_logo_url,
	closeForm,
}: {
	Id_CarAnnonce: string;
	annonce_title: string;
	brand_logo_url: string;
	closeForm: () => void;
}) => {
	const [formData, setFormData] = useState<MessageAnnonceData>({
		userName: "",
		userEmail: "",
		userPhone: "",
		message: "",
		Id_CarAnnonce: Number(Id_CarAnnonce),
		createdAt: new Date().toISOString(),
		botField: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		console.log("Id_CarAnnonce:", Id_CarAnnonce);
	}, [Id_CarAnnonce]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError(null); // Réinitialise les erreurs
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Données du formulaire avant l'envoi :", formData);
		console.log("Id_CarAnnonce:", formData.Id_CarAnnonce);
		if (formData.userName.trim() === "") {
			setError("Le nom est requis !");
		} else if (
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
				formData.userEmail
			) === false
		) {
			setError("L'adresse e-mail est invalide !");
		} else if (formData.userPhone.trim() === "") {
			setError("Le numéro de téléphone est requis !");
		} else {
			try {
				const escapedFormData: MessageAnnonceData = {
					...formData,
					userName: validator.escape(formData.userName),
					userEmail: validator.escape(formData.userEmail),
					userPhone: validator.escape(formData.userPhone),
					message: validator.escape(formData.message),
					botField: validator.escape(formData.botField),
					createdAt: new Date().toISOString(),
				};
				await MessageAnnonce(escapedFormData);
				setSuccess(true);
				setTimeout(() => {
					setFormData({
						userName: "",
						userEmail: "",
						userPhone: "",
						message: "",
						Id_CarAnnonce: Number(Id_CarAnnonce),
						createdAt: new Date().toISOString(),
						botField: "",
					});
					setSuccess(false);
				}, 6000);
			} catch (err) {
				console.error(err);
				setError(
					"Une erreur s'est produite lors de l'envoi du message !"
				);
			}
		}
	};

	// console.log("formData:", formData);

	return (
		<div className="max-w-md mx-auto p-2 text-start">
			{success ? (
				<p className="text-green-500 font-extrabold text-xl">
					Votre message pour {annonce_title} a été envoyé avec succès
					! Notre équipe se rapprochera de vous dans les plus brefs
					délais.
				</p>
			) : (
				<>
					<h2 className="text-lg font-bold mb-1 text-gray-100">
						Nous contacter à propos de cette annonce
					</h2>
					<button
						onClick={closeForm}
						className="text-primary hover:text-green-600 mb-2"
					>
						Revenir à l'annonce
					</button>
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
					<form onSubmit={handleSubmit} className="space-y-4 ">
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
								minLength={5}
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
								id="messageAnnonce"
								name="message"
								placeholder="Votre message"
								value={formData.message}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
								maxLength={300}
								required
							></textarea>
							<input
								type="hidden"
								name="botField"
								value={formData.botField}
							/>
							<input
								type="hidden"
								name="createdAt"
								value={formData.createdAt}
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
						>
							Envoyer
						</button>
					</form>{" "}
					<p>
						<Link
							href="tel:+33562119446"
							className="font-bold justify-center flex text-md text-primary hover:text-green-600"
						>
							Nous appeler
						</Link>
					</p>
				</>
			)}
		</div>
	);
};

export default ContactForm;
