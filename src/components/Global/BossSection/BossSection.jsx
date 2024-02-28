import React from "react";
import Image from "next/image";

const BossSection = () => {
	return (
		<section className="flex justify-center mt-10">
			<div className="hero max-h-2/4 w-1/2">
				<div className="hero-content flex-col lg:flex-row-reverse items-center lg:items-start">
					<Image
						className="rounded-full w-35 h-35 lg:w-40 lg:h-40 xl:w-48 xl:h-48 shadow-2xl mb-6 lg:mb-0"
						src="/assets/bossImage.webp"
						title="La photo du patron"
						alt="Image du patron"
						height={175}
						width={175}
					/>
					<div className="text-center lg:text-left">
						<h3 className="text-5xl font-bold">
							Notre Patron Vincent PARROT
						</h3>
						<p className="py-6">
							<strong>Vincent</strong>, 45 ans, est passionné par
							son travail depuis son plus jeune âge.{" "}
							<strong>Originaire de la région</strong>, il a
							toujours eu une affinité particulière avec les
							voitures. Son <strong>amour</strong> pour les
							automobiles l'a conduit à créer ce garage, où il
							propose à ses clients une{" "}
							<strong>large sélection</strong> de voitures
							d'occasion de <strong>qualité</strong>. Toujours à
							l'écoute de ses clients,
							<strong>Vincent et ses équipes</strong> s'efforcent
							de fournir un{" "}
							<strong>
								service exceptionnel et de satisfaire
							</strong>{" "}
							les besoins de chacun.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BossSection;
