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
		<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-neutral-content p-8 rounded-lg max-w-4xl overflow-auto">
				<h2 className="text-2xl text-red-700 font-bold mb-4 text-center">
					Confirmation de suppression
				</h2>
				<p className="mb-4 text-neutral text-lg">
					Êtes-vous sûr de vouloir supprimer cette annonce ?
				</p>
				<div className="flex justify-around">
					<button
						className="mt-4 px-4 py-2 bg-red-500 text-white rounded mr-4 transform transition-transform hover:scale-110 active:scale-100"
						onClick={handleDelete}
					>
						Supprimer
					</button>
					<button
						className="mt-4 px-4 py-2 bg-neutral text-neutral-content hover:text-green-400 rounded"
						onClick={closeModal}
					>
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAnnonce;
