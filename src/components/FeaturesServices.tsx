import Image from "next/image";

interface FeaturesServicesInterface {
	title: string;
	description: string;
	image: string;
	className?: string;
	titleClassName?: string;
}

export const FeaturesServices: React.FC<FeaturesServicesInterface> = ({
	title,
	description,
	image,
	className,
	titleClassName,
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
			<Image
				className="p-2"
				src={image}
				alt={title}
				width={768}
				height={512}
			/>
			<span className="pb-26 mt-4">{description}</span>
		</div>
	);
};
