import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr" data-theme="corporate">
			<Head />
			<body>
				<Header />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
