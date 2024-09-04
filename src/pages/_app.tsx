import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/Global/Context/ThemeContext";
import ClientThemeWrapper from "@/components/Global/Context/ClientThemeWrapper";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Banner from "@/components/utils/banner";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [hasConsented, setHasConsented] = useState(false);
	const [hasNoConsented, setHasNoConsented] = useState(false);

	useEffect(() => {
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	useEffect(() => {
		const consent = localStorage.getItem("cookieConsent");
		if (consent === "accepted") {
			setHasConsented(true);
		} else if (consent === "declined") {
			setHasNoConsented(true);
		}
	}, []);

	const handleConsent = () => {
		localStorage.setItem("cookieConsent", "accepted");
		setHasConsented(true);
		setHasNoConsented(false);
	};

	const handleNoConsent = () => {
		localStorage.setItem("cookieConsent", "declined");
		setHasNoConsented(true);
		setHasConsented(false);
	};

	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Garage V.PARROT</title>
				<meta
					name="description"
					content="Garage, réparations, financements, occasions, véhicules, voiture, Vincent PARROT"
				/>
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
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<ThemeProvider>
				<ClientThemeWrapper>
					{!hasConsented && !hasNoConsented && (
						<Banner
							onAccept={handleConsent}
							onDecline={handleNoConsent}
						/>
					)}
					<Component {...pageProps} />
				</ClientThemeWrapper>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
