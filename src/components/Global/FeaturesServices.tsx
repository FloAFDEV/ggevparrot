import React from "react";
import Image from "next/image";

interface FeaturesServicesProps {
	servicesData: Array<{
		Id_GarageService: number;
		serviceName: string;
		description: string;
	}>;
}

const FeaturesServices: React.FC<FeaturesServicesProps> = ({
	servicesData,
}) => {
	return (
		<section className="text-center mt-4">
			<h3 className="text-5xl bg-base-100 font-bold m-8 p-6">
				Nos services
			</h3>
			<div className="flex flex-wrap justify-center md:justify-around">
				{servicesData.map((service) => (
					<div
						key={service.Id_GarageService}
						className="w-full md:w-1/4 text-xl mb-8 md:mx-2"
					>
						<div className={`flex flex-col`}>
							<h4 className={`text-xl font-bold pb-5 pt-8`}>
								{service.serviceName}
							</h4>
							<div className="flex justify-center">
								<div className="rounded-xl overflow-hidden sm:rounded-10 sm:overflow-visible p-4">
									<Image
										src={`/assets/service_image1.webp`}
										alt={`Image de ${service.serviceName}`}
										width={450}
										height={450}
										className="rounded-b-xl"
										priority={true}
									/>
								</div>
							</div>
							<span className={`pb-26 mt-4`}>
								{service.description}
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturesServices;
