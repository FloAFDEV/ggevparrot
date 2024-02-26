import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchOpeningHours } from "@/pages/api/apiService";
import { fetchGarageInfo } from "@/pages/api/apiService";

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
	console.log("Garage Info:", garageInfo);
	return (
		<footer className="footer footer-center p-10 bg-neutral text-white rounded">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div className="col-span-1 md:col-span-2 lg:col-span-1">
					{garageInfo ? (
						<div className="font-bold">
							<p>{garageInfo.garageName}</p>
							<p>{garageInfo.address}</p>
							<p>{garageInfo.phoneNumber}</p>
							<a
								className="font-extrabold text-secondary"
								href={`https://www.google.com/maps?q=${encodeURIComponent(
									garageInfo.address
								)}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Voir sur Google Maps
							</a>
						</div>
					) : (
						<p>Chargement des informations du garage...</p>
					)}
				</div>
				<div className="col-span-1">
					<h3 className="text-lg font-bold mb-4">
						Horaires d'ouverture :
					</h3>
					<ul>
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
					<nav>
						<h3 className="text-lg font-bold mb-4">
							Liens rapides :
						</h3>
						<ul>
							<li>
								<Link href="/about" className="link link-hover">
									À propos
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="link link-hover"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link href="/jobs" className="link link-hover">
									Jobs
								</Link>
							</li>
							<li>
								<Link
									href="/press-kit"
									className="link link-hover"
								>
									Press kit
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="mt-8">
				<nav>
					<div className="grid grid-flow-col gap-4">
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
							</svg>
						</a>
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
							</svg>
						</a>
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
							</svg>
						</a>
					</div>
				</nav>{" "}
			</div>

			<div className="mt-8 text-center">
				<p>Copyright © 2024 - All right reserved by AFDeVFlo</p>
			</div>
		</footer>
	);
};

export default Footer;
