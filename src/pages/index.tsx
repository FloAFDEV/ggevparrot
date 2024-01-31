import { FeaturesServices } from "@/components/FeaturesServices";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<main>
				<section className="hero">
					<div className="hero-content flex-col md:flex-row">
						<Image
							className="w-full md:w-1/2"
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
							<span className="btn btn-primary rounded-box">
								Explorez maintenant
							</span>
						</div>
					</div>
				</section>
				<section className="text-center mt-4">
					<h3 className="text-4xl font-bold">Nos services</h3>
					<div className="flex w-full md:justify-around flex-col md:flex-row">
						<FeaturesServices
							className="w-full md:w-1/4 text-xl"
							title="Véhicules d'occasion de qualité"
							description="Explorez notre sélection soigneusement révisée de voitures d'occasion, toutes garanties pour assurer une conduite fiable et satisfaisante."
							image="/preparationVParrot.webp"
						/>
						<FeaturesServices
							className="w-full md:w-1/4 text-xl"
							title="Garanties et tranquillité d'esprit"
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
				</section>
			</main>
		</>
	);
}
