import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchOpeningHours } from "@/components/utils/apiService";
import { fetchGarageInfo } from "@/components/utils/apiService";
import Logo from "@/components/Global/Logo/Logo";

interface OpeningHour {
	Id_Opening: number;
	storeStatus: string;
	dayOfWeek: string;
	morningOpen: string | null;
	morningClose: string | null;
	eveningOpen: string | null;
	eveningClose: string | null;
	Id_Garage: number;
}

interface GarageInfo {
	Id_Garage: number;
	garageName: string;
	address: string;
	phoneNumber: string;
}

const Footer: React.FunctionComponent = () => {
	const [openingHours, setOpeningHours] = useState<any[]>([]);
	const [garageInfo, setGarageInfo] = useState<GarageInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const hours = await fetchOpeningHours();
				const garageDataArray = await fetchGarageInfo();
				const garageData = garageDataArray[0]; // Parcours le tableau depuis le premier éléement
				// console.log("Garage Data:", garageData);
				setOpeningHours(hours);
				setGarageInfo(garageData);
			} catch (error) {
				console.error(
					"Erreur dans la récupération des données :",
					error
				);
			}
		};
		fetchData();
	}, []);

	const formatHour = (hour: string | null) => {
		return hour && hour !== "Fermé" ? hour.substring(0, 2) + "h" : "Fermé";
	};

	// console.log("Garage Info:", garageInfo);
	return (
		<footer className="footer footer-center p-10 bg-neutral text-white rounded">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="col-span-1">
					<p className="text-3xl pb-4">{garageInfo?.garageName}</p>
					<h3 className="text-lg font-extrabold mb-8">
						Horaires d'ouverture :
					</h3>
					<ul className="font-thin">
						{openingHours.map(
							(hour: OpeningHour, index: number) => (
								<li key={index} className="mb-2">
									<strong>{hour.dayOfWeek} :</strong>{" "}
									{formatHour(hour.morningOpen)} -{" "}
									{formatHour(hour.morningClose)} /{" "}
									{formatHour(hour.eveningOpen)} -{" "}
									{formatHour(hour.eveningClose)}
								</li>
							)
						)}
					</ul>
				</div>
				<div className="col-span-1">
					{garageInfo ? (
						<div className="font-extrabold uppercase m-4 text-xl">
							<p className="p-4">{garageInfo.address}</p>
							<p>
								<Link
									href={`tel:${garageInfo.phoneNumber}`}
									className="hero-overlay text-primary text-2xl"
								>
									{garageInfo.phoneNumber}
								</Link>
							</p>
							<div className="flex justify-center p-4">
								<iframe
									className="rounded-lg w-5/6 h-5/6"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.629497220637!2d1.3886775999999874!3d43.572602800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb9906686201%3A0xe6bb691bb3194fcf!2s4%20Imp.%20Paul%20Mespl%C3%A9%2C%2031100%20Toulouse!5e0!3m2!1sfr!2sfr!4v1709111311494!5m2!1sfr!2sfr"
									width="300"
									height="300"
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
						</div>
					) : (
						<p>Chargement des informations du garage...</p>
					)}
				</div>
				<div className="col-span-1">
					<nav>
						<h3 className="text-lg font-bold mb-4">
							Liens rapides :
						</h3>
						<ul className="text-lg font-thin">
							<li>
								<Link href="/" className="link link-hover">
									À propos
								</Link>
							</li>
							<li>
								<Link href="/" className="link link-hover">
									Jobs
								</Link>
							</li>
							<li>
								<Link
									href="/mentions_legales"
									className="link link-hover"
								>
									Mentions Légales
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="mt-2 flex flex-wrap gap-4">
				<Link href="/">
					<Logo
						src="/favicon.ico"
						className="p-2 rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
					/>
				</Link>
			</div>
			<div className="text-center">
				<p>Copyright © 2024 - All right reserved by AFDeVFlo</p>
			</div>
		</footer>
	);
};

export default Footer;
