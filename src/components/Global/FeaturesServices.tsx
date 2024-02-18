// components/Global/FeaturesServices.tsx
import React from "react";
import Image from "next/image";

interface FeaturesServicesProps {
	title: string;
	description: string;
	image: string;
	className?: string;
	titleClassName?: string;
	descriptionClassName?: string;
}

const FeaturesServices: React.FC<FeaturesServicesProps> = ({
	title,
	description,
	image,
	className,
	titleClassName,
	descriptionClassName,
}) => {
	return (
		<div className={`flex flex-col ${className || ""}`}>
			<h4
				className={`text-xl font-bold pb-5 pt-8 ${
					titleClassName || ""
				}`}
			>
				{title}
			</h4>
			<div className="flex justify-center">
				<div className="rounded-xl overflow-hidden sm:rounded-10 sm:overflow-visible p-4">
					<Image
						src={image}
						alt={title}
						width={450}
						height={300}
						className="rounded-b-xl"
						priority
					/>
				</div>
			</div>
			<span className={`pb-26 mt-4 ${descriptionClassName || ""}`}>
				{description}
			</span>
		</div>
	);
};

export default FeaturesServices;
