// components/Global/Hero.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FunctionComponent = () => {
	return (
		<section className="hero pt-20">
			<div className="hero-content flex-col md:flex-row">
				<Image
					className="w-3/4 pt-5 md:w-1/2 m-4 rounded-2xl shadow-2xl"
					src="/assets/heroVParrot.jpeg"
					alt="Image principale représentant un perroquet mécanicien"
					width={1024}
					height={1024}
					priority={true}
				/>
				<div className="w-full md:w-1/2">
					<h1 className="text-5xl font-bold py-3">
						L&apos;Élite Automobile avec V.PARROT
					</h1>
					<h2 className="text-xl pb-3">
						Des véhicules d&apos;occasion exceptionnels, une
						confiance inégalée
					</h2>
					<Link
						href="#annonces"
						className="btn btn-primary rounded-box mb-5 text-lg"
					>
						Parcourez nos annonces
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Hero;
