// Bas-URL till backend hämtas från .env-filen (VITE_API_URL)
// Om ingen .env finns används localhost som fallback.
export const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7067/api"

// Authentication functions
export async function signIn(credentials) {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password
    }),
    credentials: 'include' // Include cookies for authentication
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.Message || errorData.message || 'Inloggning misslyckades');
  }

  // Since backend returns Ok() with no body, we return a success indicator
  return { success: true, message: 'Inloggning lyckades' };
}

export async function handleRegister(userData) {
  const response = await fetch(`${API_URL}/users/createuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.Message || errorData.message || 'Registrering misslyckades');
  }

  return { success: true, message: 'Registrering lyckades' };
}

export async function signOut() {
  const response = await fetch(`${API_URL}/auth/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include' // Include cookies for authentication
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.Message || errorData.message || 'Utloggning misslyckades');
  }

  // Clear local storage
  localStorage.removeItem("session");
  localStorage.removeItem("token");

  return true;
}


export async function createSession(payload) {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  return response
}

export async function bookSession(id) {
  
  const response = await fetch(`${API_URL}/Bookings/sessions/${id}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });
  
  return response;
}

export async function getSession(id) {
  return fetch(`${API_URL}/sessions/${id}`, {
    credentials: "include"
  });
}