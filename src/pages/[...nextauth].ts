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
	// return await bcrypt.compare(password, hashedPassword);
	return false; // Replace with your desired implementation
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
		return user;
	} catch (error) {
		// Erreur lors de l'authentification
		console.error("Erreur lors de l'authentification :", error);
		return null;
	}
}

// // Configuration de NextAuth
// const authOptions: NextAuthOptions = {
// 	session: {
// 		strategy: "jwt",
// 	},
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: {
// 					label: "Email",
// 					type: "email",
// 					placeholder: "Votre e-mail",
// 				},
// 				password: {
// 					label: "Password",
// 					type: "password",
// 				},
// 			},
// 			async authorize(
// 				credentials: Record<"email" | "password", string> | undefined,
// 				req: any
// 			): Promise<DefaultUser | null> {
// 				try {
// 					// Console log pour les credentials
// 					console.log("Credentials:", credentials);
// 					if (
// 						!credentials ||
// 						!credentials.email ||
// 						!credentials.password
// 					) {
// 						// Informations d'identification incomplètes
// 						console.log(
// 							"Informations d'identification incomplètes."
// 						);
// 						return null;
// 					}
// 					const { email, password } = credentials;
// 					// Console log pour l'email et le mot de passe
// 					console.log("Email:", email);
// 					console.log("Password:", password);
// 					try {
// 						// Appel de la fonction authenticate
// 						const user: User | null = await authenticate(
// 							email,
// 							password
// 						);
// 						if (!user) {
// 							throw new Error("Authentification échouée");
// 						}
// 						return {
// 							...user,
// 							id: user.Id_Users.toString(),
// 						};
// 					} catch (error) {
// 						// Erreur lors de l'authentification
// 						console.error(
// 							"Erreur lors de l'authentification :",
// 							error
// 						);
// 						return null; // Retourne null en cas d'erreur
// 					}
// 				} catch (error) {
// 					// Erreur lors de l'authentification
// 					console.error("Erreur lors de l'authentification :", error);
// 					return null; // Retourne null en cas d'erreur
// 				}
// 			},
// 		}),
// 	],
// };

// export default NextAuth(authOptions);
