import React, { useState, useEffect } from "react";

const WindowResize: React.FC = () => {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
		window.innerWidth <= 768
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			setIsMobileScreen(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		// Nettoyage de l'écouteur d'événements lors du démontage du composant
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []); // Le tableau vide indique que cet effet ne dépend d'aucune valeur, il ne s'exécutera donc qu'une seule fois

	return <></>;
};

export default WindowResize;
