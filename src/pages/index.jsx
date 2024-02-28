// index.jsx
import React from "react";
import Navbar from "@/components/Global/Navbar";
import Hero from "@/components/Global/Hero";
import FeaturesServices from "@/components/Global/FeaturesServices/FeaturesServices";
import Annonces from "@/components/Global/Annonces/Annonces";
import Footer from "@/components/Global/Footer/Footer";
import BossSection from "@/components/Global/BossSection/BossSection";
import {
	fetchGarageInfo,
	fetchAllServices,
	fetchOpeningHours,
} from "@/pages/api/apiService";

export default function Home({
	servicesData,
	annonces,
	garageData,
	openingHours,
}) {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<section>
					<BossSection />
				</section>
				<section className="mt-16">
					<FeaturesServices servicesData={servicesData} />
				</section>
				<section>
					<div className="w-full text-center font-bold mt-4">
						<Annonces annonces={annonces} />
					</div>
				</section>
			</main>
			<footer>
				<Footer garageInfo={garageData} openingHours={openingHours} />
			</footer>
		</>
	);
}

export async function getServerSideProps() {
	try {
		const [garageData, servicesData, openingHours] = await Promise.all([
			fetchGarageInfo(),
			fetchAllServices(),
			fetchOpeningHours(),
		]);

		return {
			props: {
				garageData,
				servicesData,
				openingHours,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				garageData: [],
				servicesData: [],
				openingHours: [],
			},
		};
	}
}
