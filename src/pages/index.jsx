import React from "react";
import Hero from "@/components/Global/Hero";
import Image from "next/image";
import FeaturesServices from "@/components/Global/FeaturesServices";
import Annonces from "@/components/Global/Annonces/Annonces";
import Footer from "@/components/Global/Footer";
import ThemeSwitcher from "@/components/Global/ThemeSwitcher";

export default function Home({ servicesData, annonces }) {
	return (
		<>
			<main>
				<Hero />
				<section className="text-center mt-4">
					<h3 className="text-5xl bg-base-100 font-bold m-8 p-6">
						Nos services
					</h3>
					<div className="flex flex-wrap justify-center md:justify-around">
						{servicesData.map((service) => (
							<div
								key={service.Id_GarageService}
								className="w-full md:w-1/4 text-xl mb-8 md:mx-2"
							>
								<FeaturesServices
									title={service.serviceName}
									description={service.description}
									image={`/assets/service_image1.webp`}
									alt={`Image de ${service.serviceName}`}
									titleClassName="text-4xl md:text-xl"
									descriptionClassName="text-lg md:text-base mt-4"
								/>
							</div>
						))}
					</div>
				</section>
				<section>
					<div className="w-full text-center font-bold mt-4">
						<Annonces annonces={annonces} />
					</div>
				</section>
			</main>
			<footer>
				<Footer />
				<ThemeSwitcher />
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
