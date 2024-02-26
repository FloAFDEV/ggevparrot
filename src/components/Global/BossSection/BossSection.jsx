import React from "react";

const BossSection = () => {
	return (
		<section className="relative">
			<div className="hero bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse blur-md">
					<img
						src="/assets/background_image.webp"
						alt="Background Image"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
					<h3 className="text-5xl font-bold m-8 p-6">
						Notre Patron - Vincent PARROT
					</h3>
					<div className="rounded-xl overflow-hidden sm:rounded-10 sm:overflow-visible p-4">
						<img
							src="/assets/bossImage.webp"
							alt="Image du patron"
							className="rounded-b-xl"
							width={450}
							height={450}
						/>
					</div>
					<p className="mt-4 text-lg">
						Texte de présentation sur Vincent Parrot...
					</p>
				</div>
			</div>
		</section>
	);
};

export default BossSection;
