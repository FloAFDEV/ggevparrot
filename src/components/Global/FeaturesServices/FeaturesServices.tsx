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
						<div className={`flex flex-col max-w-full md:max-w-md`}>
							<h4
								className={`text-2xl font-bold pb-5 pt-8`}
								style={{ whiteSpace: "nowrap" }}
							>
								{service.serviceName}
							</h4>
							<div className="flex justify-center">
								<div className="overflow-hidden sm:overflow-visible p-4 flex justify-center">
									<Image
										// src={`/assets/service_image1.webp`}
										src={service.image_url}
										alt={`Image de ${service.serviceName}`}
										width={225}
										height={225}
										className="rounded-xl shadow-lg w-full"
										priority={true}
									/>
								</div>
							</div>
							<span className={`pb-26 mt-4`}>
								{service.description}
							</span>
							<span className={`pb-26 mt-4 font-bold`}>
								{service.phoneNumber}
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturesServices;
