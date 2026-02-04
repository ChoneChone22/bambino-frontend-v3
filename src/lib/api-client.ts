const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

/** Restaurant table order flow uses only X-Section-Id; no auth required. */
const isRestaurantTableRoute = () =>
  typeof window !== "undefined" &&
  window.location.pathname.includes("/restaurant/table/");

// Centralized refresh function that can be used by both api-client and auth-context
export const refreshAuthToken = async (): Promise<boolean> => {
  if (isRestaurantTableRoute()) {
    return false;
  }

  if (!baseURL) {
    console.error("NEXT_PUBLIC_BASE_URL is not configured");
    return false;
  }

  try {
    const response = await fetch(`${baseURL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        // Not an error - expected when refresh token expires
        return false;
      }
      // Other errors (500, network issues, etc.)
      console.error(`Token refresh failed with status: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
};
