export const tokenUtils = {
  getAccessToken: () => typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  getRefreshToken: () => typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};