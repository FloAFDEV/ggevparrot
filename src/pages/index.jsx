// Home.jsx
import React from "react";
import Navbar from "@/components/Global/Navbar";
import Hero from "@/components/Global/Hero";
import FeaturesServices from "@/components/Global/FeaturesServices";
import Annonces from "@/components/Global/Annonces/Annonces";
import Footer from "@/components/Global/Footer";

export default function Home({ servicesData, annonces }) {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
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
				<Footer />
			</footer>
		</>
	);
}

export async function getServerSideProps(context) {
	try {
		const [garageResponse, servicesResponse] = await Promise.all([
			fetch(
				"http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/garage",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: "",
					}),
				}
			),
			fetch(
				"http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/services",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: "",
					}),
				}
			),
		]);

		const [garageData, servicesData] = await Promise.all([
			garageResponse.json(),
			servicesResponse.json(),
		]);

		return {
			props: {
				garageData,
				servicesData,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				garageData: [],
				servicesData: [],
			},
		};
	}
}
