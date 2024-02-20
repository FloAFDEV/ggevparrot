// components/Global/Hero.tsx
import React from "react";
import Image from "next/image";

const Hero: React.FunctionComponent = () => {
	return (
		<section className="hero pt-20">
			<div className="hero-content flex-col md:flex-row">
				<Image
					className="w-full pt-5 md:w-1/2 rounded-2xl shadow-2xl"
					src="/assets/heroVParrot.jpeg"
					alt="Image principale représentant un perroquet mécanicien"
					width={1024}
					height={1024}
				/>
				<div className="w-full md:w-1/2">
					<h1 className="text-5xl font-bold py-3">
						L'Élite Automobile avec V.PARROT
					</h1>
					<h2 className="text-xl pb-3">
						Des véhicules d'occasion exceptionnels, une confiance
						inégalée
					</h2>
					<a
						href="#annonces"
						className="btn btn-secondary rounded-box mb-5 text-lg"
					>
						Parcourez nos annonces
					</a>
				</div>
			</div>
		</section>
	);
};

export default Hero;
