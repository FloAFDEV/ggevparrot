import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/Global/Context/ThemeContext";
import ClientThemeWrapper from "@/components/Global/Context/ClientThemeWrapper";
import Head from "next/head";
import { middleware } from "./_middleware";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		// Exécute des actions globales basées sur la navigation
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>Garage V.PARROT</title>
			</Head>
			<ThemeProvider>
				<ClientThemeWrapper>
					<Component {...pageProps} />
				</ClientThemeWrapper>
			</ThemeProvider>
		</>
	);
}

export default middleware(MyApp);
