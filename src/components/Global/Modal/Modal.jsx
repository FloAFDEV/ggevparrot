import React, { useState } from "react";
import Annonce from "../Annonces/Annonce";
import Carousel from "../Carousel/Carousel";

const Modal = ({ annonce, handleCloseModal, imagesData }) => {
	const [showCarousel, setShowCarousel] = useState(false);

	const toggleCarousel = () => {
		setShowCarousel(!showCarousel);
	};

	const closeModal = () => {
		handleCloseModal();
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 overflow-y-auto">
			<div
				className="dark:bg-gray-400 rounded-lg shadow-md p-8 max-w-4xl w-full relative sm:max-w-lg sm:w-auto"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={closeModal}
					className="absolute top-0 right-0 m-4 text-red-600 hover:text-gray-800 dark:text-gray-300 hover:dark:text-red-600"
				>
					&times;
				</button>
				<div onClick={(e) => e.stopPropagation()}>
					<Annonce
						annonce={annonce}
						toggleCarousel={toggleCarousel}
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
				</div>
			</div>
		</div>
	);
};

export default Modal;
