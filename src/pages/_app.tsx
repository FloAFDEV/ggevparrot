import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		// Exécuter des actions globales basées sur la navigation
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	return <Component {...pageProps} />;
}

export default MyApp;
