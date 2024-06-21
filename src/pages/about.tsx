import React from "react";
import Image from "next/image";
import Navbar from "@/components/Global/Navbar/Navbar";
import Footer from "@/components/Global/Footer/Footer";

const About = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto pt-40">
				<div className="p-6 mb-14 flex flex-col items-center">
					<div className="float-right ml-4 mb-14">
						<Image
							src="/assets/about.webp"
							alt="Vincent"
							width={300}
							height={300}
							className="rounded-full"
						/>
					</div>
					<h1 className="mb-4 text-3xl font-bold">
						À propos de Vincent
					</h1>
					<p className="mb-4 text-lg">
						Je m'appelle Vincent, j'ai 45 ans et je suis passionné
						par le monde automobile depuis mon plus jeune âge.
						Originaire de cette belle région, j'ai toujours eu une
						affinité particulière avec les voitures. Mon amour pour
						les automobiles m'a conduit à créer ce garage, un lieu
						où se rencontrent expertise et passion.
					</p>
					<p className="mb-4 text-lg">
						Depuis l'ouverture de ce garage, mon objectif a toujours
						été de proposer à mes clients une large sélection de
						voitures d'occasion de qualité. Chaque véhicule est
						soigneusement sélectionné et inspecté pour garantir une
						performance optimale et une sécurité maximale. Je crois
						fermement que chaque voiture a une histoire à raconter,
						et je suis déterminé à aider mes clients à trouver celle
						qui correspondra le mieux à leurs besoins et à leurs
						désirs.
					</p>
					<p className="mb-4 text-lg">
						Ce qui me distingue, c'est mon engagement envers mes
						clients. Toujours à l'écoute, je m'efforce, avec mon
						équipe dévouée, de fournir un service exceptionnel. Nous
						mettons un point d'honneur à comprendre les attentes de
						chacun pour offrir des solutions sur mesure et des
						conseils avisés. Que vous cherchiez votre première
						voiture, une berline familiale ou un modèle de
						collection, nous sommes là pour vous accompagner dans
						votre choix.
					</p>
					<p className="mb-4 text-lg">
						La satisfaction de mes clients est ma priorité, et voir
						un sourire sur leur visage quand ils repartent avec la
						voiture de leurs rêves est ma plus grande récompense.
						Mon équipe et moi-même travaillons avec passion et
						professionnalisme pour que chaque expérience dans notre
						garage soit unique et agréable.
					</p>
					<p className="mb-4 text-lg">
						Bienvenue dans notre univers automobile, où chaque
						détail compte et où la passion pour les voitures est
						partagée avec enthousiasme.
					</p>{" "}
					<p className="mb-4 text-lg font-extrabold">Vincent</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default About;
