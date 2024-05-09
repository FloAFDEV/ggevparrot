import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/Global/Context/ThemeContext";
import ClientThemeWrapper from "@/components/Global/Context/ClientThemeWrapper";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		// Exécute des actions globales basées sur la navigation
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	return (
		<>
			<Head>
				{/* Titre */}
				<title>Garage V.PARROT</title>
				{/* Méta-description */}
				<meta
					name="description"
					content="Garage, réparations, financements, occasions, véhicules, voiture, Vincent PARROT"
				/>
				<meta
					property="og:description"
					content="Garage de réparation, conseil et vente de véhicules d'occasion avec option de financement"
				/>
			</Head>
			<ThemeProvider>
				<ClientThemeWrapper>
					<Component {...pageProps} />
				</ClientThemeWrapper>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
