import { useState } from "react";
import { sendMessage } from "../../utils/apiService";
import Image from "next/image";
import validator from "validator";

interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	message: string;
	botField: string; // Champ caché pour complétion par les robots.
}

const Contact = () => {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		phone: "",
		message: "",
		botField: "", // Champ caché pour complétion par les robots.
	});

	const [submitMessage, setSubmitMessage] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);

	// Gestion des changements de champs
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Vérifie si le champ botField est rempli
		if (formData.botField.trim() !== "") {
			console.log("Formulaire soumis par un robot !");
			return; // N'envoie pas le forrulaire si le champ est rempli
		}
		// Echappe les données saisies par l'utilisateur
		const escapedFormData: ContactFormData = {
			...formData,
			name: validator.escape(formData.name),
			email: validator.escape(formData.email),
			phone: validator.escape(formData.phone),
			message: validator.escape(formData.message),
		};
		try {
			console.log("Données du formulaire à envoyer:", escapedFormData);
			const success = await sendMessage(formData);
			if (success) {
				setSubmitMessage(
					"Votre demande a été soumise avec succès ! Notre équipe se rapprochera de vous dans les plus brefs délais."
				);
				setFormSubmitted(true);
				// Réinitialise le formulaire après quelques secondes
				setTimeout(() => {
					setFormData({
						name: "",
						email: "",
						phone: "",
						message: "",
						botField: "",
					});
					setSubmitMessage("");
					setFormSubmitted(false); // Réinitialise l'état pour afficher à nouveau les champs du formulaire
				}, 6000); // -> après 6 secondes
			} else {
				throw new Error("Erreur lors de l'envoi du formulaire.");
			}
		} catch (error) {
			console.error(error);
			// Gestion de l'erreur ici
		}
	};

	return (
		<section
			id="contact"
			className="flex justify-center items-center h-3/4 p-4 mx-4 md:p-4 mt-10 relative"
		>
			{/* Formulaire */}
			<div className="p-6 rounded-lg shadow-lg w-full max-w-4xl mb-10 mt-4 md:mt-16 flex flex-col md:flex-row">
				<div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0 font-bold">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
						Vous préférez nous écrire
					</h2>
					{submitMessage && (
						<p className="text-green-600 font-bold text-3xl text-start">
							{submitMessage}
						</p>
					)}
					{!formSubmitted && (
						<form onSubmit={handleSubmit}>
							<div className="mb-2">
								<label htmlFor="name" className="block mb-1">
									Nom :
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Votre nom"
									className="w-full p-2 border border-neutral-light rounded-md"
									minLength={5}
									required
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="email" className="block mb-1">
									Email :
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Votre email"
									pattern="[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
									className="w-full p-2 border border-neutral-light rounded-md"
									required
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="phone" className="block mb-1">
									Téléphone :
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Votre téléphone"
									pattern="(0|\+33)[1-9][0-9]{8}"
									className="w-full p-2 border border-neutral-light rounded-md"
									required
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="message" className="block mb-1">
									Message :
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									placeholder="Votre message"
									className="w-full p-2 border border-neutral-light rounded-md"
									maxLength={200}
									required
								></textarea>
							</div>
							{/* Champ caché pour détecter les robots */}
							<input
								type="text"
								name="botField"
								value={formData.botField}
								style={{ display: "none" }}
								onChange={handleChange}
							/>{" "}
							<button
								type="submit"
								className="bg-primary text-black px-4 py-2 rounded-md hover:bg-accent w-full"
							>
								Envoyer
							</button>
						</form>
					)}
				</div>
				<div className="w-full md:w-1/3 hidden md:flex justify-center items-center">
					<Image
						src="/assets/contactbg.webp"
						alt="image d'un carnet de note"
						className="w-full h-auto object-cover rounded-lg"
						width={400}
						height={400}
					/>
				</div>
			</div>
		</section>
	);
};

export default Contact;
