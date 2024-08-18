export function getToken(): string | null {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
}
