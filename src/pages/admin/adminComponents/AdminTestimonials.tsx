import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faStar,
	faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
	fetchAllTestimonials,
	updateTestimonialValidation,
	deleteTestimonial,
} from "@/components/utils/apiService";

interface Testimonial {
	Id_Testimonials: number;
	pseudo: string;
	userEmail: string;
	message: string;
	valid: boolean;
	note: number;
	createdAt: string;
	Id_Users?: number | null;
}

const AdminTestimonials: React.FunctionComponent = () => {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [deleteTestimonialId, setDeleteTestimonialId] = useState<
		number | null
	>(null);

	useEffect(() => {
		fetchTestimonials();
	}, []);

	const decodeHTMLEntities = (text: string): string => {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = text;
		return textArea.value;
	};

	const fetchTestimonials = async () => {
		try {
			const testimonialsData = await fetchAllTestimonials();
			const transformedTestimonials = testimonialsData.map(
				(data: any) => ({
					Id_Testimonials: data.Id_Testimonials ?? data.id,
					pseudo: decodeHTMLEntities(data.pseudo),
					userEmail: decodeHTMLEntities(data.userEmail),
					message: decodeHTMLEntities(data.message),
					valid: data.valid,
					note: data.note,
					createdAt: data.createdAt,
					Id_Users: data.Id_Users,
				})
			);
			setTestimonials(transformedTestimonials);
			console.log("Témoignages récupérés :", transformedTestimonials);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des témoignages :",
				error
			);
		}
	};

	const handleToggleValidity = async (
		testimonialId: number,
		newValidity: boolean
	) => {
		console.log("Updating testimonial with ID:", testimonialId);
		console.log("New validity:", newValidity);
		try {
			console.log(
				`Tentative de mise à jour du témoignage ${testimonialId} avec la validité ${newValidity}`
			);
			const updatedTestimonial = await updateTestimonialValidation(
				testimonialId,
				newValidity
			);
			// Met à jour localement le statut de validité du témoignage après une réponse réussie du backend
			setTestimonials(
				(prevTestimonials) =>
					prevTestimonials?.map((testimonial) =>
						testimonial.Id_Testimonials === testimonialId
							? { ...testimonial, valid: newValidity }
							: testimonial
					)
			);
			console.log(
				`Statut de validité du témoignage ${testimonialId} mis à jour avec succès !`
			);
		} catch (error) {
			console.error(
				`Erreur lors de la mise à jour du témoignage ${testimonialId} :`,
				error
			);
		}
	};

	const handleDeleteClick = (testimonialId: number) => {
		console.log(
			"Clique pour supprimer le témoignage avec l'ID :",
			testimonialId
		);
		setDeleteTestimonialId(testimonialId);
	};

	const handleConfirmDelete = async () => {
		if (deleteTestimonialId !== null) {
			console.log(
				"Confirmation de la suppression du témoignage avec l'ID :",
				deleteTestimonialId
			);

			try {
				await deleteTestimonial(deleteTestimonialId);
				// Met à jour localement l'état des témoignages après une réponse ok du backend
				setTestimonials((prevTestimonials) =>
					prevTestimonials.filter(
						(testimonial) =>
							testimonial.Id_Testimonials !== deleteTestimonialId
					)
				);
				setDeleteTestimonialId(null);
				console.log(
					`Témoignage ${deleteTestimonialId} supprimé avec succès !`
				);
			} catch (error) {
				console.error(
					`Erreur lors de la suppression du témoignage ${deleteTestimonialId} :`,
					error
				);
			}
		}
	};

	const handleCancelDelete = () => {
		setDeleteTestimonialId(null);
	};

	return (
		<div className="admin-page px-4 md:px-8">
			<h1 className="text-5xl font-bold m-10">Gestion des Témoignages</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{testimonials?.map((testimonial) => (
					<div
						key={testimonial.Id_Testimonials}
						className="bg-neutral text-neutral-content rounded-lg shadow-md p-4 flex flex-col justify-between"
					>
						<div>
							<h2 className="text-xl font-semibold mb-2">
								{testimonial.pseudo}
							</h2>
							<p className="font-semibold">
								{testimonial.message}
							</p>
							<div className="flex items-center justify-center space-x-2 mt-4">
								{testimonial.note}
								{[...Array(Math.floor(testimonial.note))].map(
									(_, index) => (
										<FontAwesomeIcon
											key={index}
											icon={faStar}
											className="text-yellow-300"
										/>
									)
								)}
								{testimonial.note % 1 === 0.5 && (
									<FontAwesomeIcon
										key="half"
										icon={faStarHalfAlt}
										className="text-yellow-300"
									/>
								)}
							</div>
						</div>
						<div className="flex justify-end mt-4 space-x-2">
							<button
								className={`px-2 py-1 rounded ${
									testimonial.valid
										? "bg-green-500 text-white"
										: "bg-red-500 text-white"
								}`}
								onClick={(e) => {
									e.stopPropagation();
									handleToggleValidity(
										testimonial.Id_Testimonials,
										!testimonial.valid
									);
								}}
							>
								{testimonial.valid ? "Validé" : "Non validé"}
							</button>
							<button
								className="px-2 py-1 ml-2 rounded bg-red-500 text-white"
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteClick(
										testimonial.Id_Testimonials
									);
								}}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={() => {
					window.history.back();
				}}
				className="py-2 m-4 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
			>
				Retour
			</button>

			{deleteTestimonialId !== null && (
				<div className="fixed inset-0 flex justify-center items-center bg-neutral-content bg-opacity-50 z-50 overflow-y-auto">
					<div className="bg-neutral-content p-4 rounded-lg md:max-w-xl h-auto max-h-screen overflow-y-auto">
						<div className="text-center text-primary-content">
							<h2 className="text-2xl font-bold mb-4">
								Confirmation de suppression
							</h2>
							<p>
								Êtes-vous sûr de vouloir supprimer ce témoignage
								?
							</p>
							<div className="flex justify-center mt-4">
								<button
									onClick={handleConfirmDelete}
									className="px-4 py-2 bg-red-500 text-white rounded mr-2"
								>
									Supprimer
								</button>
								<button
									onClick={handleCancelDelete}
									className="px-4 py-2 bg-gray-500 text-white rounded"
								>
									Annuler
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminTestimonials;
