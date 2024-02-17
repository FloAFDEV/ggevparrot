import Navbar from "@/components/Global/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr" data-theme="corporate">
			<Head />
			<body>
				<Navbar />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
