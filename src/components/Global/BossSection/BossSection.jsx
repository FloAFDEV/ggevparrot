import React from "react";
import Image from "next/image";

const BossSection = () => {
	const imagePath = "/assets/BG.webp";

	return (
		<div className="flex flex-col items-center m-10 rounded-lg pt-20">
			{/* Titre et texte */}
			<div className="w-full p-4">
				<h2 className="text-5xl font-bold m-4 text-center">
					Rencontrez le Boss
				</h2>
				{/* Image du boss */}
				<div className="w-full p-4">
					<Image
						className="rounded-full m-auto w-30 h-30 lg:w-40 lg:h-40 xl:w-48 xl:h-48 shadow-2xl"
						src="/assets/bossImage.webp"
						title="La photo du patron"
						alt="Image du patron"
						height={170}
						width={170}
						priority={true}
					/>
				</div>
				<h3 className="text-3xl font-bold mb-2 text-center">
					Vincent PARROT
				</h3>
				<p className="py-6 text-lg">
					<strong>Vincent</strong>, 45 ans, je suis passionné par le{" "}
					<strong>monde automobile</strong> depuis mon plus jeune âge.{" "}
					<strong>Originaire de la région</strong>, j'ai toujours eu
					une affinité particulière avec les voitures. Mon{" "}
					<strong>amour</strong> pour les automobiles m'a conduit à
					créer ce garage, où je propose à mes clients une{" "}
					<strong>large sélection</strong> de voitures d'occasion de{" "}
					<strong>qualité</strong>. Toujours à l'écoute de mes
					clients, <strong>mes équipes et moi-même</strong> nous
					efforçons de fournir un{" "}
					<strong>service exceptionnel</strong> et de{" "}
					<strong>satisfaire</strong> les besoins de chacun.
				</p>
			</div>
			{/* Background */}
			<div
				className="w-full bg-no-repeat bg-center bg-cover rounded-lg"
				style={{
					backgroundImage: `url(${imagePath})`,
					minHeight: "20rem", // Ajustez la hauteur selon vos besoins
				}}
			></div>
		</div>
	);
};

export default BossSection;
