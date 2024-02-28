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
					className="rounded-full"
					src="/assets/logo_vparrot.webp"
					alt="logo vparrot"
					width={50}
					height={50}
				/>
			</Link>
		</div>
	);
};

export default Logo;
