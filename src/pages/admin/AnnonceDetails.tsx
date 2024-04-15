// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { fetchAnnonceById } from "@/components/utils/apiService";

// interface Annonce {
// 	Id_CarAnnonce: number;
// 	annonce_title: string;
// 	annonce_createdAt: string;
// 	brand_name: string;
// 	main_image_url: string;
// }

// const AnnonceDetails: React.FunctionComponent = () => {
// 	const router = useRouter();
// 	const { Id_CarAnnonce } = router.query;
// 	const [annonce, setAnnonce] = useState<Annonce | null>(null);

// 	useEffect(() => {
// 		const fetchAnnonce = async () => {
// 			try {
// 				if (Id_CarAnnonce) {
// 					const annonceData = await fetchAnnonceById(
// 						Number(Id_CarAnnonce)
// 					);
// 					setAnnonce(annonceData);
// 				}
// 			} catch (error) {
// 				console.error(
// 					"Erreur lors de la récupération des détails de l'annonce :",
// 					error
// 				);
// 			}
// 		};
// 		fetchAnnonce();
// 	}, [Id_CarAnnonce]);
// 	console.log(annonce);

// 	return (
// 		<div className="annonce-details">
// 			{annonce ? (
// 				<>
// 					<h2>{annonce.annonce_title}</h2>
// 					<p>Date de création : {annonce.annonce_createdAt}</p>
// 					<Image
// 						src={annonce.main_image_url}
// 						alt={annonce.annonce_title}
// 						width={100}
// 						height={100}
// 					/>
// 				</>
// 			) : (
// 				<p>Chargement des détails de l'annonce...</p>
// 			)}
// 		</div>
// 	);
// };

// export default AnnonceDetails;
