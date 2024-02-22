import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	src: string;
	className: string;
}

const Logo: React.FunctionComponent<LogoProps> = ({ src }) => {
	return (
		<div className="p-2">
			<Link href="/" legacyBehavior>
				<Image
					className="w-full h-auto rounded-full"
					src={src}
					alt="logo vparrot"
					width={50}
					height={50}
				/>
			</Link>
		</div>
	);
};

export default Logo;
