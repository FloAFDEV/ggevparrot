import React from "react";
import Navbar from "@/components/Global/Navbar/Navbar";
import Footer from "@/components/Global/Footer/Footer";

const MentionsLegales = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto pt-40">
				<div className="bg-white p-6 rounded-lg shadow-lg">
					<p className="mb-2 text-lg">
						Merci de lire avec attention les différentes modalités
						d’utilisation du présent site avant d’y parcourir ses
						pages. En vous connectant sur ce site, vous acceptez,
						sans réserves, les présentes modalités.
					</p>
					<p className="mb-4 text-lg">
						Aussi, conformément à l’article n°6 de la Loi n°2004-575
						du 21 Juin 2004 pour la confiance dans l’économie
						numérique, les responsables du présent site internet
						https://ggevparrot.vercel.app sont :
					</p>
					<p className="mb-2 text-xl font-semibold">
						Éditeur du Site :
					</p>
					<p className="mb-2 text-lg">
						SARL AFDeVFlo Numéro de SIRET : 0000000000000
					</p>
					<p className="mb-2 text-lg">
						Responsable éditorial : Florent PEREZ
					</p>
					<p className="mb-2 text-lg">
						04 impasse Paul Mesplé 31000 Toulouse
					</p>
					<p className="mb-2 text-lg">Téléphone : 06 06 06 06 06</p>
					<p className="mb-2 text-lg">Email : ########@parrot.fr</p>
					<p className="mb-4 text-lg">Site Web : en cours</p>
					<p className="mb-2 text-xl font-semibold">Hébergement :</p>
					<p className="mb-2 text-lg">Hébergeur : alwaysdata</p>
					<p className="mb-4 text-lg">
						Site Web : 'https://ggevparrot.vercel.app/
					</p>
					<p className="mb-2 text-xl font-semibold">
						Développement :
					</p>
					<p className="mb-4 text-lg">Florent PEREZ</p>
					<p className="mb-2 text-xl font-semibold">
						Conditions d’utilisation :
					</p>
					<p className="mb-2 text-lg">
						Ce site est proposé en différents langages web (HTML,
						Javascript, CSS, PHP) pour un meilleur confort
						d’utilisation et un graphisme plus agréable.
					</p>
					<p className="mb-2 text-lg">
						Nous vous recommandons de recourir à des navigateurs
						modernes comme Internet explorer, Safari, Firefox,
						Google Chrome, etc…
					</p>
					<p className="mb-2 text-lg">
						Le développeur met en œuvre tous les moyens dont il
						dispose, pour assurer une information fiable et une mise
						à jour fiable de ses sites internet.
					</p>
					<p className="mb-2 text-lg">
						Toutefois, des erreurs ou omissions peuvent survenir.
						L’internaute devra donc s’assurer de l’exactitude des
						informations auprès de l'entreprise , et signaler toutes
						modifications du site qu’il jugerait utile. l'entreprise
						n’est en aucun cas responsable de l’utilisation faite de
						ces informations, et de tout préjudice direct ou
						indirect pouvant en découler.
					</p>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default MentionsLegales;
