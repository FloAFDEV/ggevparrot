import React from "react";

interface DeleteAnnonceProps {
	annonceId: number | null;
	closeModal: () => void;
	onDelete: (annonceId: number) => void;
}

const DeleteAnnonce: React.FC<DeleteAnnonceProps> = ({
	annonceId,
	closeModal,
	onDelete,
}) => {
	const handleDelete = () => {
		if (annonceId !== null) {
			onDelete(annonceId);
		}
	};

	return (
		<div className="bg-neutral-content p-4 rounded-lg max-w-md mx-auto">
			<h2 className="text-2xl text-red-700 font-bold mb-2 text-center">
				Confirmation de suppression
			</h2>
			<p className="mb-2 text-neutral text-lg text-center">
				Êtes-vous sûr de vouloir supprimer cette annonce ?
			</p>
			<div className="flex justify-around mt-4">
				<button
					className="px-4 py-2 bg-red-500 text-white rounded transform transition-transform hover:scale-105 active:scale-95"
					onClick={handleDelete}
				>
					Supprimer
				</button>
				<button
					className="px-4 py-2 bg-neutral text-primary hover:text-green-400 rounded transform transition-transform hover:scale-105 active:scale-95"
					onClick={closeModal}
				>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default DeleteAnnonce;
