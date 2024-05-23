import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { JwtPayload } from "jwt-decode";

const LoginButton = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [user, setUser] = useState<JwtPayload | null>(null);

	if (!user) session && setUser(jwtDecode((session as any)?.user.token));

	useEffect(() => {
		if (session && session.user && (session.user as any).token) {
			const decodedUser = jwtDecode((session.user as any).token);
			setUser(decodedUser);
		}
	}, [session]);
	console.log("Session:", session);

	return (
		<div className="ml-auto flex gap-2">
			{status === "authenticated" && session ? (
				<>
					<p className="text-primary font-bold text-lg content-center pl-6">
						{(user as any)?.name} {(user as any)?.userRole}
					</p>
					<Link
						href="/admin"
						className="btn btn-ghost text-primary hover:bg-accent-content border font-light border-primary"
					>
						Admin
					</Link>
					<button
						onClick={() => signOut({ callbackUrl: "/" })}
						className="btn btn-ghost text-primary bg-content hover:bg-accent-content border font-light border-primary"
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
