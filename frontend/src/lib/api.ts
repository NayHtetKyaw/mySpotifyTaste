const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const fetcher = async (url: string) => {
  const token = localStorage.getItem("jwt");
  console.log("token: ", token);

  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("API error:", response.status, response.statusText);
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const { token } = await response.json();
    localStorage.setItem("jwt", token);
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }
};
