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
		],
	},
};

export default nextConfig;
