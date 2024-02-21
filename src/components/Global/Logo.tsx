import Image from "next/image";
import Link from "next/link";

interface Logo {
	src: string;
	className: string;
}

export const Logo: React.FunctionComponent<Logo> = ({ src, className }) => {
	return (
		<div className="p-2">
			<Image
				className="w-full h-auto rounded-full"
				src={src}
				alt="logo vparrot"
				width={50}
				height={50}
			/>
		</div>
	);
};

export default Logo;

<Logo
	href="/"
	src="/favicon.ico"
	className="p-2 rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
/>;
