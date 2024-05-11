import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const requireAuth = (WrappedComponent: React.ComponentType) => {
	const WithAuth = (props: any) => {
		const router = useRouter();

		useEffect(() => {
			const { jwtToken } = parseCookies();
			if (!jwtToken) {
				// Si le jeton JWT n'est pas présent dans les cookies, redirige l'utilisateur vers la page principale
				router.push("/");
			}
		}, [router]);
		return <WrappedComponent {...props} />;
	};

	return WithAuth;
};

export default requireAuth;
