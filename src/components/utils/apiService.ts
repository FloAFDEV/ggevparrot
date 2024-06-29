export const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

import { Annonce } from "@/pages/admin/adminComponents/ReadAnnonce";
import axios, { AxiosError } from "axios";

// Récupérer toutes les annonces
export async function fetchAllAnnonces(): Promise<Annonce[]> {
	try {
		const response = await axios.get(`${BASE_URL}annonces`);
		return response.data;
	} catch (error) {
		console.error("Erreur dans la récupération des annonces:", error);
		throw error;
	}
}

// Mettre à jour le statut de validation d'une annonce
export async function updateValidationStatus(
	annonceId: number,
	newValidity: boolean
) {
	try {
		await axios.put(`${BASE_URL}annonces/${annonceId}/validite`, {
			valid: newValidity,
		});
	} catch (error) {
		console.error(
			`Erreur lors de la mise à jour de la validité de l'annonce ${annonceId} :`,
			error
		);
		throw error;
	}
}

// Mettre à jour une annonce
export async function updateAnnonce(
	annonceId: number,
	updatedFields: Partial<Annonce>
): Promise<Annonce> {
	try {
		const response = await axios.put(
			`${BASE_URL}annonces/${annonceId}`,
			updatedFields
		);
		console.log("Annonce mise à jour avec succès !");
		return response.data;
	} catch (error: any) {
		console.error("Erreur lors de la mise à jour de l'annonce :", error);
		throw error;
	}
}

// Ajouter une annonce
export async function addAnnonce(formData: any): Promise<Annonce> {
	try {
		console.log("Contenu de formData :", formData);
		const response = await axios.post(`${BASE_URL}annonces`, formData);
		console.log("Annonce ajoutée avec succès !");
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'ajout de l'annonce :", error);
		throw error;
	}
}

// Supprimer une annonce
export async function deleteAnnonce(annonceId: number): Promise<void> {
	try {
		await axios.delete(`${BASE_URL}annonce/${annonceId}`);
		console.log("Annonce supprimée avec succès !");
	} catch (error) {
		console.error(`Erreur lors de la suppression de l'annonce :`, error);
		throw error;
	}
}

// Récupérer une annonce par son ID
export async function fetchAnnonceById(annonceId: number): Promise<Annonce> {
	try {
		const response = await axios.get(`${BASE_URL}annonces/${annonceId}`);
		return response.data;
	} catch (error) {
		console.error(
			`Erreur dans la récupération de l'annonce ${annonceId}:`,
			error
		);
		throw error;
	}
}

// Récupérer tous les services
export async function fetchAllServices(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}services`);
		return response.data;
	} catch (error) {
		console.error(`Erreur dans la récupération des services:`, error);
		throw error;
	}
}

// Les services par ID
export async function fetchServiceById(serviceId: number): Promise<any> {
	try {
		const response = await axios.get(`${BASE_URL}services/${serviceId}`);
		return response.data;
	} catch (error) {
		console.error(
			`Erreur lors de la récupération du service ${serviceId}:`,
			error
		);
		throw error;
	}
}

// Récupérer les info du garage
export async function fetchGarageInfo(): Promise<any> {
	try {
		const response = await axios.get(`${BASE_URL}garage`);
		return response.data;
	} catch (error) {
		console.error(`Erreur lors de la récupération des garages :`, error);
		throw error;
	}
}

//Récupérer les modeles
export async function fetchAllModels(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}models`);
		return response.data;
	} catch (error) {
		console.error(`Erreur dans la récupération des modèles :`, error);
		throw error;
	}
}

// Récupérer les marques
export async function fetchAllBrands(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}brands`);
		return response.data;
	} catch (error) {
		console.error(`Impossible d'accéder aux marques :`, error);
		throw error;
	}
}

// Récupérer les images
export async function fetchAllImages(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}images`);
		return response.data;
	} catch (error) {
		console.error(`Impossible d'accéder aux marques :`, error);
		throw error;
	}
}

// Récupérer toutes les voitures
export async function fetchAllCars(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}cars`);
		return response.data;
	} catch (error) {
		console.error(`Impossible d'accéder aux marques :`, error);
		throw error;
	}
}

// Interface pour les données des témoignages
export interface TestimonialFormData {
	Id_Users: any;
	valid: boolean;
	pseudo: string;
	userEmail: string;
	message: string;
	createdAt: string;
	botField: string; // pour empêcher l'envoi par les robots
	note: number;
	userId?: number;
}

// Envoie du témoignage
export async function sendTestimonial(
	formData: TestimonialFormData
): Promise<boolean> {
	try {
		const response = await axios.post(`${BASE_URL}testimonials`, formData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response);
		if (response.status === 200) {
			console.log("Témoignage envoyé avec succès !");
			return true;
		}
		throw new Error(
			`Erreur lors de l'envoi du témoignage : ${response.status}`
		);
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}

// Récupérer tous les témoignages
export const fetchAllTestimonials = async () => {
	try {
		const response = await axios.get(`${BASE_URL}testimonials`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la récupération des témoignages:", error);
		throw error;
	}
};

export const updateTestimonialValidation = async (
	testimonialId: number,
	newValidity: boolean
) => {
	try {
		const response = await axios.put(
			`${BASE_URL}testimonial/${testimonialId}`,
			{ valid: newValidity },

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error updating testimonial:", error);
		throw error;
	}
};

// Supprimer un témoignage
export const deleteTestimonial = async (
	testimonialId: number
): Promise<void> => {
	try {
		const url = `${BASE_URL}testimonial/${testimonialId}`;
		await axios.delete(url);
		console.log(`Témoignage ${testimonialId} supprimé avec succès !`);
	} catch (error) {
		console.error(
			`Erreur lors de la suppression du témoignage ${testimonialId} :`,
			error
		);
		throw error;
	}
};

// Récupérer les horaires d'ouverture
export async function fetchOpeningHours(): Promise<any> {
	try {
		const response = await axios.get(`${BASE_URL}opening`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}

// Récupérer toutes les options
export async function fetchAllOptions(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}options`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}
// Récupérer toutes les années de fabrication
export async function fetchAllManufactureYears(): Promise<number[]> {
	try {
		const response = await axios.get(`${BASE_URL}years`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}
// Récupérer tous les types d'énergie
export async function fetchAllEnergyTypes(): Promise<string[]> {
	try {
		const response = await axios.get(`${BASE_URL}energy`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}

// Récupérer tous les utilisateurs
export async function fetchAllUsers(): Promise<any[]> {
	try {
		const response = await axios.get(`${BASE_URL}users`);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du témoignage :", error);
		throw error;
	}
}

// Interface pour les données du message lié à une annonce par son Id
export interface MessageAnnonceData {
	userName: string;
	userEmail: string;
	userPhone: string;
	message: string;
	botField: string; // pour empêcher l'envoi par les robots
	Id_CarAnnonce: Number;
	createdAt: string;
	Id_Users?: number;
}

// Envoyer un message pour une annonce en particulier
export async function MessageAnnonce(
	messageData: MessageAnnonceData
): Promise<any> {
	try {
		const response = await axios.post(
			`${BASE_URL}message_annonce`,
			messageData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status !== 200) {
			throw new Error(
				`Erreur lors de l'envoi du message : ${response.status}`
			);
		}
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'envoi du message :", error);
		throw error;
	}
}

// Interface pour les données du formulaire global
export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	message: string;
	botField: string; // pour empêcher l'envoi par les robots
}

// Envoie du message
export async function sendMessage(formData: ContactFormData): Promise<boolean> {
	try {
		const response = await axios.post(
			`${BASE_URL}contact_message`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status !== 200) {
			console.error(
				`Erreur lors de l'envoi du message : ${response.status}`
			);
			return false;
		}
		console.log("Message envoyé avec succès !");
		return true;
	} catch (error) {
		console.error("Erreur lors de l'envoi du message :", error);
		throw error;
	}
}

export interface ContactMessage {
	id: number;
	name: string;
	email: string;
	phone: string;
	message: string;
	created_at: string;
}

// Récupérer tous les messages
export async function fetchAllMessages(): Promise<ContactMessage[]> {
	try {
		const response = await axios.get(`${BASE_URL}contact_message`);
		return response.data;
	} catch (error) {
		console.error("Erreur dans la récupération des annonces:", error);
		throw error;
	}
}
