import Image from "next/image";
import Link from "next/link";

interface Logo {
	src: string;
	className: string;
}

export const Logo: React.FunctionComponent<Logo> = ({ src, className }) => {
	return (
		<Link href="/">
			<div className="p-2">
				<Image
					className="w-full h-auto rounded-full"
					src={src}
					alt="logo vparrot"
					width={50}
					height={50}
				/>
			</div>
		</Link>
	);
};
