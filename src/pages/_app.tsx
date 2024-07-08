import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/Global/Context/ThemeContext";
import ClientThemeWrapper from "@/components/Global/Context/ClientThemeWrapper";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Logo from "@/components/Global/Logo/Logo";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [hasConsented, setHasConsented] = useState(false);
	const [hasNoConsented, setHasNoConsented] = useState(false);

	useEffect(() => {
		console.log("La page a changé :", router.pathname);
	}, [router.pathname]);

	useEffect(() => {
		const consent = localStorage.getItem("cookieConsent");
		if (consent === "true") {
			setHasConsented(true);
		} else if (consent === "false") {
			setHasNoConsented(true);
		}
	}, []);

	const handleConsent = () => {
		localStorage.setItem("cookieConsent", "true");
		setHasConsented(true);
		setHasNoConsented(false);
	};

	const handleNoConsent = () => {
		localStorage.setItem("cookieConsent", "false");
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
						<div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-50 flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-4 sm:space-y-0">
							<Link href="/">
								<Logo
									src="/favicon.ico"
									className="cursor-pointer rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 hidden sm:block"
								/>
							</Link>
							<p className="text-center sm:text-left">
								Ce site utilise des cookies afin de garantir une
								expérience optimale.
							</p>
							<div className="flex space-x-4">
								<button
									onClick={handleConsent}
									className="mt-2 px-4 py-2 bg-info text-gray-800 rounded hover:bg-success transition-colors"
									aria-label="Accepter les cookies"
								>
									Accepter les Cookies
								</button>
								<button
									onClick={handleNoConsent}
									className="mt-2 ml-4 px-4 py-2 bg-warning-content rounded hover:bg-neutral transition-colors"
									aria-label="Refuser les cookies"
								>
									Refuser les cookies
								</button>
							</div>
						</div>
					)}
					<Component {...pageProps} />
				</ClientThemeWrapper>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
