import Navbar from "@/components/Global/Navbar";
import ThemeSwitcher from "@/components/Global/ThemeSwitcher";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="fr" data-theme="garden">
			<Head />
			<body>
				<Navbar />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
