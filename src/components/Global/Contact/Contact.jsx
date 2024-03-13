import React, { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
		botField: "", // Champ caché pour complétion par les robots.
	});

	const [submitMessage, setSubmitMessage] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);

	// Gestion des changements de champs
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.NEXT_PUBLIC_BASE_URL_DEV}sendMessage`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					throw new Error("Erreur lors de l'envoi du formulaire.");
				}
				console.log("Données soumises :", formData);
				setSubmitMessage(
					"Votre formulaire a été soumis avec succès ! Notre équipe se rapprochera de vous dans les plus brefs délais."
				);
				setFormSubmitted(true);
				// Réinitialiser le formulaire après quelques secondes
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
				}, 6000); // Réinitialiseaprès 6 secondes
			})
			.catch((error) => {
				console.error(error);
				// Gestion de l'erreur ici
			});
	};

	return (
		<div
			id="contact"
			className="flex justify-center items-center h-3/4 p-4 md:p-4 mt-40"
		>
			<div className="bg-neutral p-6 rounded-lg shadow-lg w-full max-w-4xl mb-10 mt-4 md:mt-16 flex flex-col md:flex-row">
				<div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0 font-bold">
					<h2 className="text-3xl md:text-4xl text-gray-200 font-bold mb-4 text-center">
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
									pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
									pattern="[+][0-9]{11}"
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
								className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary-dark w-full"
							>
								Envoyer
							</button>
						</form>
					)}
				</div>
				<div className="w-full md:w-1/3 hidden md:flex justify-center items-center">
					<img
						src="/assets/contactbg.webp"
						alt="Description de l'image"
						className="w-full h-auto object-cover rounded-lg"
					/>
				</div>
			</div>
		</div>
	);
};

export default Contact;
