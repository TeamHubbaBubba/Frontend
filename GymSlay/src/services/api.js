// Bas-URL till backend hämtas från .env-filen (VITE_API_URL)
// Om ingen .env finns används localhost som fallback.
export const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7067/api"


export async function createSession(payload) {
    const response = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    return response
}