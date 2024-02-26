import Image from "next/image";

export default function BossSection() {
	return (
		<section className="text-center">
			<h3 className="text-5xl bg-base-100 font-bold m-8 p-6">
				Notre Patron
			</h3>
			<div className="flex justify-center">
				<div className="rounded-xl overflow-hidden sm:rounded-10 sm:overflow-visible p-4">
					<Image
						src="/assets/bossImage.webp"
						alt="Image du patron"
						className="rounded-b-xl"
						width={450}
						height={450}
					/>
				</div>
			</div>
		</section>
	);
}
