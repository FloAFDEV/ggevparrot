import React from "react";
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
		<section className="text-center mt-4">
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
						className="w-full md:w-1/2 lg:w-1/4 text-xl mb-8 md:mx-2"
					>
						<div
							className={`card card-side flex flex-col max-w-full md:max-w-md mx-4`}
						>
							<h4
								className={`whitespace-nowrap overflow-ellipsis card-title text-2xl font-bold pb-5 pt-8 text-center justify-center`}
							>
								{service.serviceName}
							</h4>
							<div className="flex justify-center">
								<div className="overflow-hidden sm:overflow-visible p-4 flex justify-center">
									<figure>
										<Image
											src={service.image_url}
											alt={`Image de ${service.serviceName}`}
											width={225}
											height={225}
											className="rounded-es-badge shadow-lg w-full h-full"
											priority={true}
										/>
									</figure>
								</div>
							</div>
							<div className={`pb-4 mt-4 text-center`}>
								<p>{service.description}</p>
								<p className="font-bold">
									Contacter le service au
								</p>
								<p className="font-bold">
									{service.phoneNumber}
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
