// Importation du  dotenv pour charger les variables d'environnement
import("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				hostname: "www.logo-voiture.com",
			},
			{
				hostname: "img.paruvendu.fr",
			},
			{ hostname: "images.unsplash.com" },

			{ hostname: "raw.githubusercontent.com" },
		],
	},
};

export default nextConfig;
