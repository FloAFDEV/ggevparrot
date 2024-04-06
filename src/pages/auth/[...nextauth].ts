// import bcrypt from "bcrypt";
// import { fetchAllUsers } from "@/components/utils/apiService";
// import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Définition du type pour un utilisateur
// interface User {
// 	Id_Users: number;
// 	email: string;
// 	name: string;
// 	phone: string;
// 	pseudo: string;
// 	role: string;
// 	primaryGarage_Id: number;
// 	Id_Garage: number;
// 	password_hash: string;
// }

// // Fonction pour comparer les mots de passe
// async function comparePasswords(
// 	password: string,
// 	hashedPassword: string
// ): Promise<boolean> {
// 	console.log("Password:", password);
// 	console.log("Hashed Password:", hashedPassword);
// 	// Utilise la fonction bcrypt pour comparer le mot de passe fourni avec le mot de passe hashé stocké
// 	const result = await bcrypt.compare(password, hashedPassword);
// 	return result;
// }

// // Fonction pour authentifier l'utilisateur
// async function authenticate(
// 	email: string,
// 	password: string
// ): Promise<User | null> {
// 	try {
// 		// Récupère tous les utilisateurs depuis l'API
// 		const users: User[] = await fetchAllUsers();
// 		// Recherche l'utilisateur par son adresse e-mail
// 		const user: User | undefined = users.find(
// 			(user) => user.email === email
// 		);
// 		console.log(user);
// 		// Si l'utilisateur n'est pas trouvé ou si le mot de passe ne correspond pas, retourne null
// 		if (!user || !(await comparePasswords(password, user.password_hash))) {
// 			return null;
// 		}
// 		// Authentification réussie, affiche les informations de l'utilisateur dans la console
// 		console.log("Utilisateur authentifié :", user);
// 		// Retourne les informations de l'utilisateur
// 		return user;
// 	} catch (error) {
// 		// En cas d'erreur lors de l'authentification, affiche l'erreur dans la console et retourne null
// 		console.error("Erreur lors de l'authentification :", error);
// 		return null;
// 	}
// }

// // Configuration des options d'authentification pour NextAuth
// const authOptions: NextAuthOptions = {
// 	session: {
// 		strategy: "jwt", // Utilise la stratégie JWT pour gérer les sessions
// 	},
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials", // Nom du type de provider
// 			credentials: {
// 				email: { label: "Email", type: "email" }, // Champ pour l'e-mail
// 				password: { label: "Password", type: "password" }, // Champ mot de passe
// 			},
// 			async authorize(credentials) {
// 				if (
// 					!credentials ||
// 					!credentials.email ||
// 					!credentials.password
// 				) {
// 					// Si les informations d'identification sont manquantes, retourne null
// 					return null;
// 				}
// 				try {
// 					// Appelle la fonction d'authentification pour vérifier les informations d'identification
// 					const user = await authenticate(
// 						credentials.email,
// 						credentials.password
// 					);
// 					if (!user) {
// 						// Si l'authentification échoue, retourne null
// 						return null;
// 					}
// 					// Si l'authentification réussit, retourne les informations de l'utilisateur avec l'ID converti en chaîne
// 					return { ...user, id: user.Id_Users.toString() };
// 				} catch (error) {
// 					// En cas d'erreur lors de l'authentification, affiche l'erreur dans la console et retourne null
// 					console.error("Erreur lors de l'authentification :", error);
// 					return null;
// 				}
// 			},
// 		}),
// 	],
// };

// // Exporte NextAuth avec les options d'authentification configurées
// export default NextAuth(authOptions);
