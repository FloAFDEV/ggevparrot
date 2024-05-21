import { Html, Head, Main, NextScript } from "next/document";
import Provider from "./Providers";
import { ReactNode } from "react";

interface IProps {
	children: ReactNode;
}
export default function Document({ children }: IProps) {
	return (
		<Html lang="fr">
			<Head />
			<body>
				<Provider>
					<Main />
					<div className={""}>{children}</div>
					<NextScript />
				</Provider>
			</body>
		</Html>
	);
}
