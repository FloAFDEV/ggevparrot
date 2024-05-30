import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Avvvatars from "avvvatars-react";

const LoginButton = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isAdminPage, setIsAdminPage] = useState(false);

	if (!user) session && setUser(jwtDecode((session as any)?.user.token));

	const handleLogout = () => {
		signOut({ callbackUrl: "/" });
	};

	// Mettre à jour l'état isAdminPage lorsque la route change
	useEffect(() => {
		setIsAdminPage(router.pathname === "/admin");
	}, [router.pathname]);

	return (
		<div className="ml-auto flex items-center gap-2 p-4">
			{status === "authenticated" && session ? (
				<>
					<div className="hidden sm:flex items-center space-x-2 pl-2">
						<Avvvatars value={(user as any)?.email} size={40} />
						<p className="text-primary font-bold text-lg m-1">
							{(user as any)?.userRole}
						</p>
					</div>
					{isAdminPage ? (
						<Link href="/">
							<Link
								href="/"
								className="btn btn-sm btn-ghost text-primary hover:bg-accent-content border font-light border-primary"
							>
								Site
							</Link>
						</Link>
					) : (
						<Link
							href="/admin"
							className="btn btn-sm btn-ghost text-primary hover:bg-accent-content border font-light border-primary"
						>
							Admin
						</Link>
					)}
					<button
						onClick={handleLogout}
						className="btn btn-sm btn-ghost text-primary bg-content hover:bg-accent-content border font-light border-primary"
					>
						Se déconnecter
					</button>
				</>
			) : (
				<>
					<button
						onClick={() => signIn("credentials")}
						className="btn btn-ghost text-primary hover:bg-accent-content border font-light border-primary"
					>
						Connexion
					</button>
				</>
			)}
		</div>
	);
};

export default LoginButton;
