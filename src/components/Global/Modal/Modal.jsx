import React, { useState } from "react";
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

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 overflow-y-auto">
			<div
				className="dark:bg-gray-600 bg-gray-500 rounded-lg shadow-md p-4 max-w-md w-full relative sm:max-w-lg sm:w-auto"
				style={{ maxHeight: "90vh" }} // hauteur relative maximale de la modal
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className="absolute top-0 right-0 mr-2 text-white hover:text-red-600 dark:text-white dark:hover:text-red-600"
				>
					&times;
				</button>
				<div onClick={(e) => e.stopPropagation()}>
					{showContactForm ? (
						<ContactForm
							Id_CarAnnonce={annonce.Id_CarAnnonce}
							annonce_title={annonce.annonce_title}
							brand_logo_url={annonce.brand_logo_url} // URL du logo de la marque comme prop
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
