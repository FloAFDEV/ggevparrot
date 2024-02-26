const BASE_URL = "http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/";

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

// Récupérer le message
export async function fetchMessage() {
	try {
		const response = await fetch(`${BASE_URL}message`);
		if (!response.ok) {
			throw new Error(
				`Erreur lors de la récupération du message : ${response.status}`
			);
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
// Envoie du message

export async function sendMessage(annonceId: number, formData: any) {
	try {
		const response = await fetch(`${BASE_URL}message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ Id_CarAnnonce: annonceId, ...formData }),
		});
		if (!response.ok) {
			throw new Error(
				`Erreur lors de l'envoi du message : ${response.status}`
			);
		}
		console.log("Message envoyé avec succès !");
		return true;
	} catch (error) {
		console.error("Erreur lors de l'envoi du message :", error);
		throw error;
	}
}
