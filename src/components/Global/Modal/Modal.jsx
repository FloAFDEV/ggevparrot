import React, { useState, useEffect } from "react";
import Annonce from "../Annonces/Annonce";
import Carousel from "../Carousel/Carousel";
import ContactForm from "../ContactForm/ContactForm";

const Modal = ({ annonce, handleCloseModal, imagesData, Id_CarAnnonce }) => {
	const [showCarousel, setShowCarousel] = useState(false);
	const [showContactForm, setShowContactForm] = useState(false);

	const toggleCarousel = () => {
		setShowCarousel(!showCarousel);
	};

	const toggleContactForm = () => {
		setShowContactForm(!showContactForm);
	};

	const closeModal = () => {
		handleCloseModal();
	};

	//l'événement de défilement est géré dans le useEffect enregistrant un écouteur d'événements sur window. L'option
	// { passive: true } est utilisée pour rendre l'écouteur passif et éviter l'avertissement "Violation".
	useEffect(() => {
		const handleScroll = (e) => {
			e.preventDefault(); // Empêche le défilement de l'arrière-plan
		};
		document.body.style.overflow = "hidden"; // Empêche le défilement de l'arrière-plan lorsque la modal est ouverte
		window.addEventListener("scroll", handleScroll, { passive: false }); // Ajoute un écouteur d'événements pour le défilement

		return () => {
			window.removeEventListener("scroll", handleScroll); // Nettoie l'écouteur d'événements lors du démontage de la modal
			document.body.style.overflow = "auto"; // Réactive le défilement de l'arrière-plan lorsque la modal est fermée
		};
	}, []);

	return (
		<div
			className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto z-50"
			style={{ overflow: "hidden" }}
		>
			<div
				className="dark:bg-gray-450 bg-gray-500 rounded-2xl bg-opacity-90 shadow-md p-2 max-w-screen-sm w-10/12 relative"
				style={{ maxHeight: "90vh", width: "95%", overflowY: "auto" }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className="absolute top-2 right-2 m-1 text-primary rounded-full bg-slate-600 hover:text-red-600 dark:hover:text-red-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div onClick={(e) => e.stopPropagation()}>
					{showContactForm ? (
						<ContactForm
							Id_CarAnnonce={annonce.Id_CarAnnonce}
							annonce_title={annonce.annonce_title}
							brand_logo_url={annonce.brand_logo_url} // URL du logo de la marque comme prop
							closeForm={toggleContactForm}
						/>
					) : (
						<>
							<Annonce
								annonce={annonce}
								toggleCarousel={toggleCarousel}
								hideDetails={true}
							/>
							{showCarousel && (
								<Carousel
									isOpen={true}
									images={imagesData}
									currentCarAnnonceId={annonce.Id_CarAnnonce}
									alt={annonce.annonce_title}
									toggleCarousel={toggleCarousel}
								/>
							)}
							<button
								onClick={toggleContactForm}
								className="btn btn-primary mt-4 text-base"
							>
								Envoyer un message à propos de cette annonce
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
