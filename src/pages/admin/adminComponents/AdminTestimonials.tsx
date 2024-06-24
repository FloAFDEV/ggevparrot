import React, { useState, useEffect } from "react";
import {
	fetchAllTestimonials,
	updateTestimonialValidationStatus,
} from "@/components/utils/apiService";
import { Testimonials } from "@/components/Global/Testimonials/Testimonials";

interface TestimonialFormData {
	id: number;
	pseudo: string;
	userEmail: string;
	message: string;
	valid: boolean;
	note: number;
	createdAt: string;
	Id_Users: number;
}

const AdminTestimonials = () => {
	const [testimonials, setTestimonials] = useState<Testimonials[]>([]);

	useEffect(() => {
		fetchTestimonials();
	}, []);

	const decodeHTMLEntities = (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = text;
		return textArea.value;
	};

	const fetchTestimonials = async () => {
		try {
			const testimonialsData = await fetchAllTestimonials();
			const transformedTestimonials: Testimonials[] =
				testimonialsData.map((data) => ({
					Id_Testimonials: data.id,
					pseudo: decodeHTMLEntities(data.pseudo),
					userEmail: decodeHTMLEntities(data.userEmail),
					message: decodeHTMLEntities(data.message),
					valid: data.valid,
					note: data.note,
					createdAt: data.createdAt,
					Id_Users: data.Id_Users,
				}));
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
		try {
			await updateTestimonialValidationStatus(testimonialId, newValidity);
			setTestimonials((prevTestimonials) =>
				prevTestimonials.map((testimonial) =>
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

	return (
		<div className="admin-page px-4 md:px-8">
			<h1 className="text-5xl font-bold m-10">Gestion des Témoignages</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{testimonials.map((testimonial) => (
					<div
						key={testimonial.Id_Testimonials}
						className="bg-neutral text-neutral-content rounded-lg shadow-md p-4"
					>
						<h2 className="text-xl font-semibold mb-2">
							{testimonial.pseudo}
						</h2>
						<p className="font-semibold">{testimonial.message}</p>
						<div className="flex items-center justify-center space-x-2 mt-4">
							{testimonial.note}
							{[...Array(Math.floor(testimonial.note))].map(
								(_, index) => (
									<svg
										key={index}
										className="w-4 h-4 text-yellow-300 ms-1"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
									</svg>
								)
							)}
							{testimonial.note % 1 === 0.5 && (
								<svg
									key="half"
									className="w-4 h-4 text-yellow-300 ms-1"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 16 16"
								>
									<path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
								</svg>
							)}
						</div>
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
		</div>
	);
};

export default AdminTestimonials;
