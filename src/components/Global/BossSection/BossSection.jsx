import React from "react";
import Image from "next/image";

const BossSection = () => {
	const imagePath = "/assets/BG.webp";

	return (
		<div className="flex flex-col lg:flex-row items-center m-10 rounded-lg">
			{/* Contenu */}
			<div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 rounded-lg max-w-2xl">
				<h2 className="text-5xl bg-base-100 font-bold m-6 p-4">
					Rencontrez le Boss
				</h2>
				<div className="flex flex-col lg:flex-row items-center lg:items-start">
					{/* Photo du boss */}
					<div className="lg:w-1/2">
						<Image
							className="rounded-full m-4 w-35 h-35 lg:w-40 lg:h-40 xl:w-48 xl:h-48 shadow-2xl"
							src="/assets/bossImage.webp"
							title="La photo du patron"
							alt="Image du patron"
							height={175}
							width={175}
						/>
					</div>
					{/* Texte */}
					<div className="lg:w-1/2">
						<h3 className="text-3xl font-bold mb-2">
							Vincent PARROT
						</h3>
						<p className="py-2">
							<strong>Vincent</strong>, 45 ans, est passionné par
							son travail depuis son plus jeune âge.{" "}
							<strong>Originaire de la région</strong>, il a
							toujours eu une affinité particulière avec les
							voitures. Son <strong>amour</strong> pour les
							automobiles l'a conduit à créer ce garage, où il
							propose à ses clients une{" "}
							<strong>large sélection</strong> de voitures
							d'occasion de <strong>qualité</strong>. Toujours à
							l'écoute de ses clients,{" "}
							<strong>Vincent et ses équipes</strong> s'efforcent
							de fournir un <strong>service exceptionnel</strong>{" "}
							et de <strong>satisfaire</strong> les besoins de
							chacun.
						</p>
					</div>
				</div>
			</div>
			{/* Background */}
			<div
				className="lg:block w-1/2 bg-no-repeat bg-center bg-cover relative rounded-lg flex flex-wrap"
				style={{
					backgroundImage: `url(${imagePath})`,
					minHeight: "18rem",
				}}
			></div>
		</div>
	);
};

export default BossSection;
