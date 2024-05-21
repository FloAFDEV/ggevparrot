export const BASE_URL =
	process.env.NODE_ENV === "production"
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

// Récupérer toutes les annonces
export async function fetchAllAnnonces() {
	try {
		const response = await fetch(`${BASE_URL}annonces`);
		if (!response.ok) {
			throw new Error(
				`Erreur dans la récupération des annonces: ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Mettre à jour une annonce
export async function updateAnnonce(annonceId: number, formData: any) {
	try {
		const response = await fetch(`${BASE_URL}annonces/${annonceId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la mise à jour de l'annonce : ${response.status}`
			);
		}
		console.log("Annonce mise à jour avec succès !");
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Ajouter une annonce
export async function addAnnonce(formData: any) {
	try {
		const response = await fetch(`${BASE_URL}annonces`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
			throw new Error(
				`Erreur lors de l'ajout de l'annonce : ${response.status}`
			);
		}
		console.log("Annonce ajoutée avec succès !");
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Ssupprimer une annonce
export async function deleteAnnonce(annonceId: number) {
	try {
		const response = await fetch(`${BASE_URL}annonces/${annonceId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la suppression de l'annonce : ${response.status}`
			);
		}
		console.log("Annonce supprimée avec succès !");
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer une annonce par son ID
export async function fetchAnnonceById(annonceId: number) {
	try {
		const response = await fetch(`${BASE_URL}annonces/${annonceId}`);
		if (!response.ok) {
			throw new Error(
				`Erreur dans la récupération de l'annonce ${annonceId}: ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer tous les services
export async function fetchAllServices() {
	try {
		const response = await fetch(`${BASE_URL}services`);
		if (!response.ok) {
			throw new Error(
				`Erreur dans la récupération des services : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Les services par ID
export async function fetchServiceById(serviceId: number) {
	try {
		const response = await fetch(`${BASE_URL}services/${serviceId}`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération du service ${serviceId}: ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer les info du garage
export async function fetchGarageInfo() {
	try {
		const response = await fetch(`${BASE_URL}garage`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des garages : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

//Récupérer les modeles
export async function fetchAllModels() {
	try {
		const response = await fetch(`${BASE_URL}models`);
		if (!response.ok) {
			throw new Error(
				`Erreur dans la récupération des modèles : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
// Récupérer les marques
export async function fetchAllBrands() {
	try {
		const response = await fetch(`${BASE_URL}brands`);
		if (!response.ok) {
			throw new Error(
				`Impossible d'accéder aux marques : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer les images
export async function fetchAllImages() {
	try {
		const response = await fetch(`${BASE_URL}images`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des images : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer toutes les voitures
export async function fetchAllCars() {
	try {
		const response = await fetch(`${BASE_URL}cars`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des voitures : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Interface pour les données des témoignages
export interface TestimonialFormData {
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
		const response = await fetch(`${BASE_URL}testimonials`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
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

// Récupérer tous les témoignages
export async function fetchAllTestimonials() {
	try {
		const response = await fetch(`${BASE_URL}testimonials`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des témoignages : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer les horaires d'ouverture
export async function fetchOpeningHours() {
	try {
		const response = await fetch(`${BASE_URL}opening`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des horaires d'ouverture : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer toutes les options
export async function fetchAllOptions() {
	try {
		const response = await fetch(`${BASE_URL}options`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des options : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer toutes les années de fabrication
export async function fetchAllManufactureYears() {
	try {
		const response = await fetch(`${BASE_URL}years`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des années de fabrication : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer tous les types d'énergie
export async function fetchAllEnergyTypes() {
	try {
		const response = await fetch(`${BASE_URL}energy`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des types d'énergie : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// Récupérer tous les utilisateurs
export async function fetchAllUsers() {
	try {
		const response = await fetch(`${BASE_URL}users`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération des utilisateurs : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
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
		const response = await fetch(`${BASE_URL}message_annonce`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageData),
		});
		if (!response.ok) {
			throw new Error(
				`Erreur lors de l'envoi du message : ${response.status}`
			);
		}
		return response;
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
		const response = await fetch(`${BASE_URL}contact_message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
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
