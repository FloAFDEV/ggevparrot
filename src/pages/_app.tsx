import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/Global/Context/ThemeContext";
import ClientThemeWrapper from "@/components/Global/Context/ClientThemeWrapper";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		// Exécute des actions globales basées sur la navigation
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				{/* Titre */}
				<title>Garage V.PARROT</title>
				{/* Méta-description */}
				<meta
					name="description"
					content="Garage, réparations, financements, occasions, véhicules, voiture, Vincent PARROT"
				/>
				{/* Balises Open Graph pour les réseaux sociaux */}
				<meta property="og:title" content="Garage V.PARROT" />
				<meta
					property="og:description"
					content="Garage de réparation, conseil et vente de véhicules d'occasion avec option de financement"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://ggevparrot.vercel.app/"
				/>
				<meta
					property="og:image"
					content="https://ggevparrot.vercel.app/_next/image?url=%2Fassets%2FheroVParrot.jpeg&w=2048&q=75"
				/>
				{/* Méta-informations pour les appareils mobiles */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<ThemeProvider>
				<ClientThemeWrapper>
					<Component {...pageProps} />
				</ClientThemeWrapper>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
