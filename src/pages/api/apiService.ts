const API_URL = "http://localhost:8888/ECF-Gge-PARROT/SERVEURGARAGE/backend/";
export async function put(path: string, body: any) {
	const response = await fetch(`${API_URL}${path}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(`PUT request failed: ${response.status}`);
	}
	return await response.json();
}

export async function del(path: string) {
	const response = await fetch(`${API_URL}${path}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error(`DELETE request failed: ${response.status}`);
	}
	return await response.json();
}

// Path: ggevparrot/src/pages/api/apiService.ts
// 1072569384
