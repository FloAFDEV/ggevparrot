import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "email",
					type: "text",
					placeholder: "johnDoe@example.com",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials, req) {
				try {
					const { email, password } = credentials as {
						email: string;
						password: string;
					};
					console.log(
						"Credentials entering authorize function:",
						JSON.stringify({
							email: email,
							password: password,
						})
					);
					const res = await fetch(`${BASE_URL}/admin`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					});
					const user = await res.json();
					if (!res.ok && user) {
						throw new Error("Failed to authenticate");
					}
					return user;
				} catch (error: any) {
					console.error("Authentication error:", error.message);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "../../signIn/",
	},
	callbacks: {
		jwt: ({ token, user }) => {
			console.log(user);
			if (!user) {
				return token;
			}
			if ("token" in user) {
				token = user as unknown as JWT;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user = token;
			}
			return session;
		},
	},
});
