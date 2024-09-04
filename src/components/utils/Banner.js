import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Global/Logo/Logo";

const Banner = ({ onAccept, onDecline }) => {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Vérifiez si l'utilisateur a déjà accepté ou refusé les cookies
		const consent = localStorage.getItem("cookieConsent");
		if (!consent) {
			setShowBanner(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("cookieConsent", "accepted");
		setShowBanner(false);
		onAccept();
	};

	const handleDecline = () => {
		localStorage.setItem("cookieConsent", "declined");
		setShowBanner(false);
		onDecline();
	};

	if (!showBanner) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-50 flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-4 sm:space-y-0">
			<Link href="/">
				<Logo
					src="/favicon.ico"
					className="cursor-pointer rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 hidden sm:block"
				/>
			</Link>
			<p className="text-center sm:text-left">
				Ce site utilise des cookies afin de garantir une expérience
				optimale.
			</p>
			<div className="flex space-x-4">
				<button
					onClick={handleAccept}
					className="mt-2 px-4 py-2 bg-info text-gray-800 rounded hover:bg-success transition-colors"
					aria-label="Accepter les cookies"
				>
					Accepter les Cookies
				</button>
				<button
					onClick={handleDecline}
					className="mt-2 ml-4 px-4 py-2 bg-warning-content rounded hover:bg-neutral transition-colors"
					aria-label="Refuser les cookies"
				>
					Refuser les cookies
				</button>
			</div>
		</div>
	);
};

export default Banner;
