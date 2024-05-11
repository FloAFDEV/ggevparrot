import { JSX, useEffect } from "react";
import { parseCookies } from "nookies";

const requireAuth = (WrappedComponent: React.ComponentType) => {
	const WithAuth = (props: JSX.IntrinsicAttributes) => {
		useEffect(() => {
			const { jwtToken } = parseCookies();
			if (!jwtToken) {
				// Affiche un message d'erreur dans la console ou une alerte
				console.error(
					"Le jeton JWT est manquant dans les cookies. L'utilisateur n'est pas authentifié."
				);
			}
		}, []);

		return <WrappedComponent {...props} />;
	};

	return WithAuth;
};

export default requireAuth;
