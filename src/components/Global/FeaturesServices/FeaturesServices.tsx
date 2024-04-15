import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FeaturesServicesProps {
	servicesData: Array<{
		Id_GarageService: number;
		serviceName: string;
		description: string;
		phoneNumber: string;
		image_url: string;
	}>;
}

const FeaturesServices: React.FunctionComponent<FeaturesServicesProps> = ({
	servicesData,
}) => {
	// Vérifier si servicesData est défini et s'il s'agit d'un tableau
	if (!Array.isArray(servicesData) || servicesData.length === 0) {
		return (
			<div className="flex flex-col justify-center text-center mt-4 font font-extrabold">
				Aucun service disponible pour le moment.
			</div>
		);
	}
	return (
		<section className="text-center mt-40 ">
			<h3 className="text-5xl bg-base-100 font-bold m-8 p-6">
				Nos services
			</h3>
			<div
				id="services"
				className="flex flex-wrap justify-center md:justify-around"
			>
				{servicesData?.map((service) => (
					<div
						key={service.Id_GarageService}
						className="w-full md:w-1/4 lg:w-1/4 text-xl mb-8 md:mx-2"
					>
						<div className="card card-side flex flex-col max-w-full md:max-w-md mx-4">
							<div className="flex justify-center">
								<div className="overflow-hidden sm:overflow-visible p-4 flex justify-center max-w-[320px]">
									<figure>
										<Image
											src={service.image_url}
											alt={`Image de ${service.serviceName}`}
											width={320}
											height={320}
											className="rounded-badge shadow-base-content w-full h-72 object-cover"
											priority={true}
										/>
									</figure>
								</div>
							</div>
							<h4 className="whitespace-normal break-words overflow-wrap text-2xl sm:text-2xl xs:text-xl font-bold pb-2 pt-2 text-center justify-center">
								{service.serviceName}
							</h4>
							<div className="pb-2 mt-4">
								<p className="text-start">
									{service.description}
								</p>
								<p className="font-bold text-lg pt-4">
									Contacter le service {service.serviceName}:
								</p>
								<p>
									<Link
										href={`tel:${service.phoneNumber}`}
										className="font-bold text-lg text-green-700 hover:text-accent"
									>
										{service.phoneNumber}
									</Link>{" "}
								</p>
								<p className="mt-2">
									<Link
										href="/#contact"
										className="text-green-700 font-bold hover:text-accent"
									>
										Vous préférez nous écrire?
									</Link>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturesServices;
