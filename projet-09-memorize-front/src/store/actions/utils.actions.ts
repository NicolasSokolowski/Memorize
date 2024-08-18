import { AxiosResponse } from "axios";

export const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    headers: {
      authorization: `Bearer: ${JSON.stringify(accessToken)}`,
      "x-refresh-token": JSON.stringify(refreshToken),
    },
  };
};

export const updateTokens = (response: AxiosResponse) => {
  if (response.headers["authorization"]) {
    const newAccessToken = response.headers["authorization"].split(" ")[1];
    localStorage.setItem("accessToken", newAccessToken);
  }
  if (response.headers["x-refresh-token"]) {
    const newRefreshToken = response.headers["refreshToken"];
    localStorage.setItem("refreshToken", newRefreshToken);
  }
};
