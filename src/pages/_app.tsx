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
			{" "}
			<>
				<Head>
					{/* Titre */}
					<title>Garage V.PARROT</title>
					{/* Méta-description */}
					<meta
						name="description"
						content="Garage, réparations, financements, occasions, véhicules, voiture, Vincent PARROT"
					/>
					{/* Méta pour Facebook */}
					<meta property="og:title" content="Garage V.PARROT" />
					<meta
						property="og:description"
						content="Garage de réparation, conseil et vente de véhicules d'occasion avec option de financement"
					/>
					<meta
						property="og:image"
						content="https://ggevparrot.vercel.app/"
					/>
					{/* URL du site web pour Facebook */}
					<meta
						property="og:url"
						content="https://ggevparrot.vercel.app/"
					/>
					{/* Type de contenu pour Facebook */}
					<meta property="og:type" content="website" />
					{/* Méta pour LinkedIn */}
					{/* Nom du site pour LinkedIn */}
					<meta property="og:site_name" content="Garage V.PARROT" />
					{/* Image pour LinkedIn */}
					<meta
						property="og:image"
						content="https://ggevparrot.vercel.app/"
					/>
					{/* Largeur de l'image pour LinkedIn */}
					<meta property="og:image:width" content="1200" />
					{/* Hauteur de l'image pour LinkedIn */}
					<meta property="og:image:height" content="630" />
					{/* Type de l'image pour LinkedIn */}
					<meta property="og:image:type" content="image/jpeg" />
					{/* Description du contenu pour LinkedIn */}
					<meta
						property="og:description"
						content="Garage de réparation, conseil et vente de véhicules d'occasion avec option de financement"
					/>
					{/* favicon */}
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<ThemeProvider>
					<ClientThemeWrapper>
						<Component {...pageProps} />
					</ClientThemeWrapper>
				</ThemeProvider>
			</>
		</SessionProvider>
	);
}

export default MyApp;
