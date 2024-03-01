// Importation du  dotenv pour charger les variables d'environnement
// import { config } from 'dotenv';
// config();
// Décommenter pour passer en prod et commenter pour passer en dev

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
