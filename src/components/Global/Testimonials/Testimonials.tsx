import React from "react";

interface Testimonials {
	Id_Testimonials: number;
	pseudo: string;
	userEmail: string;
	message: string;
	valid: boolean;
	note: number;
	createdAt: string;
	Id_Users: number;
}

interface TestimonialsProps {
	testimonials: Testimonials[];
}

const Testimonials: React.FunctionComponent<TestimonialsProps> = ({
	testimonials,
}) => {
	// Filtre les témoignages avec valid à true
	const validTestimonials =
		testimonials && Array.isArray(testimonials)
			? testimonials.filter((testimonial) => testimonial.valid)
			: [];
	// On récupère les 3 derniers témoignages valides
	const recentTestimonials = validTestimonials.slice(-3);

	return (
		<section className="px-4 py-6 md:py-12 lg:py-24 mt-24">
			<div className="max-w-screen-xl mx-auto">
				<h2 className="font-bold text-5xl text-center leading-none max-w-2xl mx-auto mb-12">
					Ce que disent nos clients
				</h2>
				<div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
					{recentTestimonials.map((testimonial) => (
						<div
							key={testimonial.Id_Testimonials}
							className="bg-secondary-content rounded-lg p-8 text-center md:w-1/3"
						>
							<h3 className="font-bold text-xl uppercase">
								{testimonial.pseudo}
							</h3>
							<p className="text-xl font-light italic">
								{testimonial.message}
							</p>
							<div className="flex items-center justify-center space-x-2 mt-4">
								{testimonial.note}{" "}
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
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
