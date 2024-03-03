import React, { useState, useEffect } from "react";
import Annonce from "../Annonces/Annonce";
import Carousel from "../Carousel/Carousel";
import ContactForm from "../ContactForm";

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
		const handleScroll = () => {};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 overflow-y-auto"
			style={{ overflow: "hidden" }}
		>
			<div
				className="dark:bg-gray-600 bg-gray-500 rounded-lg shadow-md p-4 max-w-md w-full relative sm:max-w-lg sm:w-auto"
				style={{ maxHeight: "85vh", overflowY: "auto" }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className="btn btn-circle btn-outline top-0 right-0 m-2 text-3xl text-primary bg-slate-600 hover:text-red-600 dark:hover:text-red-600"
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
								className="btn btn-secondary mt-4"
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
