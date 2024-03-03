export function middleware(req, res, next) {
	// Autoriser l'accès depuis toutes les origines
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Autoriser les méthodes HTTP spécifiques
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);

	// Autoriser certains en-têtes personnalisés
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	// Appeler la fonction next() pour passer au middleware suivant
	next();
}
