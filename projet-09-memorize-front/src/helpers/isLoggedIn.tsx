// Function to convert the presence of the token into a boolean (unused).
export function isLoggedIn(): boolean {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
}
