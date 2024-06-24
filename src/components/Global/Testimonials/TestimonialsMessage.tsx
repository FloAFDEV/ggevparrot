import { useState } from "react";
import { sendTestimonial, TestimonialFormData } from "../../utils/apiService";
import Image from "next/image";
import validator from "validator";

const TestimonialsMessage = () => {
	const [formData, setFormData] = useState<TestimonialFormData>({
		id: null,
		Id_Users: null,
		valid: null,
		pseudo: "",
		userEmail: "",
		message: "",
		botField: "", // Champ caché pour complétion par les robots.
		note: 0,
		createdAt: "",
		userId: undefined,
	});

	const [submitMessage, setSubmitMessage] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formVisible, setFormVisible] = useState(false);

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
			return; // N'envoie pas le formulaire si le champ est rempli
		}
		// Vérifie si la note est sélectionnée
		if (formData.note === 0) {
			console.log("La note est obligatoire !");
			return; // N'envoie pas le formulaire si la note n'est pas sélectionnée
		}
		if (
			!/^[A-Za-z0-9\sàáâäçèéêëìíîïñòóôöùúûü.,!?-]*$/.test(
				formData.message
			)
		) {
			console.log("Le champ message doit contenir uniquement du texte !");
			return; // N'envoie pas le formulaire si le champ message ne contient pas uniquement du texte
		}
		try {
			console.log("Données du formulaire à envoyer:", formData);
			const createdAt = new Date().toISOString();
			const dataToSend: TestimonialFormData = {
				...formData,
				createdAt,
				userId: formData.userId || 0,
				valid: false,
				id: formData.id,
				Id_Users: formData.Id_Users,
			};

			// Échappement des caractères avant de les envoyer à l'API
			const escapedData: TestimonialFormData = Object.fromEntries(
				Object.entries(dataToSend).map(([key, value]) => [
					key,
					typeof value === "string" ? validator.escape(value) : value,
				])
			) as TestimonialFormData;

			const success = await sendTestimonial(escapedData);
			if (success) {
				setSubmitMessage(
					"Merci pour votre témoignage, nous l'afficherons après modération. À bientôt!"
				);
				setFormSubmitted(true);
				// Réinitialise le formulaire après quelques secondes
				setTimeout(() => {
					setFormData({
						id: null,
						Id_Users: null,
						valid: null,
						pseudo: "",
						userEmail: "",
						message: "",
						botField: "",
						note: 0,
						createdAt: "",
						userId: undefined,
					});
					setSubmitMessage("");
					setFormSubmitted(false); // Réinitialise l'état pour afficher à nouveau les champs du formulaire
				}, 60000); // -> après 60 secondes
			} else {
				throw new Error("Erreur lors de l'envoi du formulaire.");
			}
		} catch (error) {
			console.error(error);
			// Gestion de l'erreur ici
		}
	};

	const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRating = parseFloat(e.target.value);
		if (!isNaN(newRating)) {
			setFormData((prevState) => ({ ...prevState, note: newRating }));
		}
	};

	// Fonction pour basculer la visibilité du formulaire
	const toggleFormVisibility = () => {
		setFormVisible(!formVisible);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-1/3">
			<button
				onClick={toggleFormVisibility}
				className="flex flex-col md:flex-row items-center justify-center"
			>
				<Image
					src="/assets/rocket_startup_monitor_screen_computer_icon.svg"
					alt="icone rocket_monitor_screen_computer"
					width={72}
					height={72}
					className="mr-2"
				/>
				<h2 className="font-extrabold text-center text-2xl mt-2 leading-none max-w-2xl mx-auto md:mx-4 text-green-700 hover:text-accent">
					Laissez votre témoignage
				</h2>
			</button>
			{formVisible && (
				<div
					id="sendTestimonials"
					className="flex justify-center items-center h-3/4 p-2 mx-4 md:p-4 mt-10 w-full lg:w-4/5"
				>
					<div className="bg-content p-6 pt-0 rounded-lg shadow-lg w-full max-w-4xl mb-10 md:mt-4 flex flex-col md:flex-row">
						<div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0 font-bold">
							<h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
								Mon témoignage
							</h2>
							{submitMessage && (
								<p className="text-green-600 font-bold text-2xl text-start">
									{submitMessage}
								</p>
							)}
							{!formSubmitted && (
								<form onSubmit={handleSubmit}>
									<div className="mb-2">
										<label
											htmlFor="name"
											className="block mb-1"
										>
											Pseudo :
										</label>
										<input
											type="text"
											id="pseudo"
											name="pseudo"
											value={formData.pseudo}
											onChange={handleChange}
											placeholder="Votre pseudo"
											className="w-full p-2 border border-neutral-light rounded-md"
											minLength={5}
											required
										/>
									</div>
									<div className="mb-4">
										<label
											htmlFor="email"
											className="block mb-1"
										>
											Email :
										</label>
										<input
											type="email"
											id="email"
											name="userEmail"
											value={formData.userEmail}
											onChange={handleChange}
											placeholder="Votre email"
											pattern="[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"
											className="w-full p-2 border border-neutral-light rounded-md"
											required
										/>
									</div>
									<div className="mb-2">
										<label
											htmlFor="message"
											className="block mb-1"
										>
											Témoignage :
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Votre témoignage"
											className="w-full p-2 border border-neutral-light rounded-md"
											maxLength={200}
											required
										></textarea>
									</div>{" "}
									{/* Champ caché pour détecter les robots */}
									<input
										type="text"
										name="botField"
										value={formData.botField}
										style={{ display: "none" }}
										onChange={handleChange}
									/>
									<div className="mb-2">
										<label
											htmlFor="rating"
											className="block mb-1"
										>
											Note :
										</label>
										<select
											id="rating"
											name="rating"
											value={formData.note}
											onChange={handleRatingChange}
											className="w-full p-2 border border-neutral-light rounded-md"
											required
										>
											<option value={0}>
												Sélectionnez une note
											</option>
											<option value={1}>1</option>
											<option value={2}>2</option>
											<option value={3}>3</option>
											<option value={4}>4</option>
											<option value={5}>5</option>
										</select>
									</div>
									<button
										type="submit"
										className="bg-primary text-white py-2 px-4 rounded-md mt-4 hover:bg-primary-dark"
									>
										Envoyer
									</button>
								</form>
							)}
						</div>
						<div className="w-full md:w-1/3 flex justify-center md:justify-end">
							<Image
								src="/assets/rocket_startup_monitor_screen_computer_icon.svg"
								alt="icone rocket_monitor_screen_computer"
								width={200}
								height={200}
								className="h-full object-contain"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TestimonialsMessage;
