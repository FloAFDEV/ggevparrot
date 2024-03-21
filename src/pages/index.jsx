import React, { useState } from "react";
import Navbar from "@/components/Global/Navbar/Navbar";
import LoginModal from "@/components/Global/Modal/LoginModal";
import Hero from "@/components/Global/Hero/Hero";
import FeaturesServices from "@/components/Global/FeaturesServices/FeaturesServices";
import Annonces from "@/components/Global/Annonces/Annonces";
import Footer from "@/components/Global/Footer/Footer";
import BossSection from "@/components/Global/BossSection/BossSection";
import Testimonials from "@/components/Global/Testimonials/Testimonials";
import TestimonialsMessage from "@/components/Global/Testimonials/TestimonialsMessage";
import {
	fetchGarageInfo,
	fetchAllServices,
	fetchOpeningHours,
	fetchAllTestimonials,
} from "../components/utils/apiService";
import Contact from "../components/Global/Contact/Contact";

export default function Home({
	servicesData,
	annonces,
	garageData,
	openingHours,
	testimonials,
}) {
	const [showLoginModal, setShowLoginModal] = useState(false);

	const toggleLoginModal = () => {
		setShowLoginModal(!showLoginModal);
	};

	return (
		<>
			<Navbar />
			<button onClick={toggleLoginModal}>Connexion</button>
			<main>
				<Hero />
				<section>
					<BossSection />
				</section>
				<section className="mt-16">
					<FeaturesServices servicesData={servicesData} />
				</section>
				<section>
					<Testimonials testimonials={testimonials} />
					<TestimonialsMessage
						testimonialsMessage={TestimonialsMessage}
					/>
				</section>
				<section>
					<div className="w-full text-center font-bold mt-4">
						<Annonces annonces={annonces} />
					</div>
				</section>{" "}
				<section>
					{" "}
					<Contact />
				</section>
			</main>
			<footer>
				<Footer garageInfo={garageData} openingHours={openingHours} />
			</footer>
			{showLoginModal && <LoginModal closeModal={toggleLoginModal} />}
		</>
	);
}

export async function getServerSideProps() {
	try {
		const [garageData, servicesData, openingHours, testimonials] =
			await Promise.all([
				fetchGarageInfo(),
				fetchAllServices(),
				fetchOpeningHours(),
				fetchAllTestimonials(),
			]);
		return {
			props: {
				garageData,
				servicesData,
				openingHours,
				testimonials,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				garageData: [],
				servicesData: [],
				openingHours: [],
				testimonials: [],
			},
		};
	}
}
