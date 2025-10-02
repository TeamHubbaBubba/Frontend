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

export async function bookSession(id) {
  return fetch(`${API_URL}/bookings/sessions/${id}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });
}

export async function getSession(id) {
  return fetch(`${API_URL}/sessions/${id}`, {
    credentials: "include"
  });
}