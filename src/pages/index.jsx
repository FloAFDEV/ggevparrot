import { FeaturesServices } from "@/components/Global/FeaturesServices";
import { Inter } from "next/font/google";
import Image from "next/image";
import Annonces from "@/components/Global/Annonces/Annonces";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ annonces }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(
			"http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/annonces"
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`La réponse du réseau n'est pas correcte ${response.status}`
					);
				}
				return response.json();
			})
			.then((data) => setData(data))
			.catch((error) =>
				console.error(
					"There has been a problem with your fetch operation: ",
					error
				)
			);
	}, []);

	return (
		<>
			<main>
				<section className="hero">
					<div className="hero-content flex-col md:flex-row">
						<Image
							className="w-full pt-5 md:w-1/2 rounded-2xl shadow-2xl"
							src="/heroVParrot.webp"
							width={1024}
							height={1024}
							alt="Image principale représentant un perroquet mécanicien"
						/>
						<div className="w-full md:w-1/2">
							<h1 className="text-5xl font-bold py-3">
								L'Élite Automobile avec V.PARROT
							</h1>
							<h2 className="text-xl pb-3">
								Des véhicules d'occasion exceptionnels, une
								confiance inégalée
							</h2>
							<span className="btn btn-secondary rounded-box mb-5">
								Explorez maintenant
							</span>
						</div>
					</div>
				</section>
				<section className="text-center mt-4">
					<h3 className="text-5xl bg-base-1 font-bold m-8">
						Nos services
					</h3>
					<div className="flex w-full md:justify-around flex-col md:flex-row">
						<FeaturesServices
							className="w-full md:w-1/4 text-xl"
							title="Véhicules d'occasion de qualité"
							description="Explorez notre sélection soigneusement révisée de voitures d'occasion, toutes garanties pour assurer une conduite fiable et satisfaisante."
							image="/preparationVParrot.webp"
						/>
						<FeaturesServices
							className="w-full md:w-1/4 text-xl"
							title="Garanties et tranquillité"
							description="Profitez de nos options de garantie étendue pour une protection supplémentaire, offrant une expérience d'achat sans souci."
							image="/garantieVParrot.webp"
						/>
						<FeaturesServices
							className="w-full md:w-1/4 text-xl"
							title="Entretien spécialisé"
							description="Bénéficiez de notre service d'entretien professionnel pour assurer la longévité de votre véhicule. Nous sommes là pour vous, même après l'achat."
							image="/entretienVParrot.webp"
						/>
					</div>
					<div className="w-full text-center font-bold mt-4">
						{/* <ButtonLink href="">Contactez-nous</ButtonLink> */}
						<Annonces annonces={annonces} />
					</div>
				</section>
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	// Récupére les données du garage
	const garageResponse = await fetch(
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
	);
	const garageData = await garageResponse.json(); // Extrait les données JSON

	// Récupére les données des services
	const servicesResponse = await fetch(
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
	);
	const servicesData = await servicesResponse.json(); // Extrait les données JSON

	// Retourne les données du garage et des services comme props
	return {
		props: {
			garageData: garageData,
			servicesData: servicesData,
		},
	};
}
