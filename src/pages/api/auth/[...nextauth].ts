import bcrypt from "bcrypt";
import { fetchAllUsers } from "@/components/utils/apiService";
import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
	Id_Users: number;
	email: string;
	name: string;
	phone: string;
	pseudo: string;
	role: string;
	primaryGarage_Id: number;
	Id_Garage: number;
	password_hash: string;
}

// Fonction pour comparer les mots de passe hashés
async function comparePasswords(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}

// Fonction pour l'authentification
async function authenticate(
	email: string,
	password: string
): Promise<User | null> {
	try {
		// Récupérer tous les utilisateurs
		const users: User[] = await fetchAllUsers();
		// Rechercher l'utilisateur par son email
		const user: User | undefined = users.find(
			(user: User) => user.email === email
		);
		if (!user) {
			throw new Error("Utilisateur non trouvé");
		}
		// Comparer les mots de passe hashés
		const passwordMatch = await comparePasswords(
			password,
			user.password_hash
		);
		if (!passwordMatch) {
			throw new Error("Mot de passe incorrect");
		}
		// Vérifier si l'utilisateur a le rôle requis
		if (
			user.role !== "superAdmin" &&
			user.role !== "admin" &&
			user.role !== "employe"
		) {
			throw new Error("Accès non autorisé");
		}
		// Authentification réussie
		return {
			Id_Users: user.Id_Users,
			email: user.email,
			name: user.name,
			phone: user.phone,
			pseudo: user.pseudo,
			role: user.role,
			primaryGarage_Id: user.primaryGarage_Id,
			Id_Garage: user.Id_Garage,
			password_hash: user.password_hash,
		};
	} catch (error) {
		console.error("Erreur lors de l'authentification :", error);
		return null;
	}
}

// Configuration de NextAuth
const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Votre e-mail",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(
				credentials: Record<"email" | "password", string> | undefined,
				req: any
			): Promise<DefaultUser | null> {
				if (
					!credentials ||
					!credentials.email ||
					!credentials.password
				) {
					// Si les informations d'identification sont absentes ou incomplètes, retournez null
					return null;
				}
				const { email, password } = credentials;
				try {
					// Appel de la fonction authenticate
					const user: User | null = await authenticate(
						email,
						password
					);
					if (!user) {
						throw new Error("Authentification échouée");
					}
					return {
						...user,
						id: user.Id_Users.toString(),
					};
				} catch (error) {
					console.error("Erreur lors de l'authentification :", error);
					return null; // Retourne null en cas d'erreur
				}
			},
		}),
	],
};

export default NextAuth(authOptions);
