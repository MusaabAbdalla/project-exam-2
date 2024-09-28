import { save } from "@/storage/save";

const API_BASE = "https://v2.api.noroff.dev/";
const AUTH_LOGIN = "auth/login?_holidaze=true";

export async function userLogin(userEmail, userPassword) {
  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    };

    const response = await fetch(API_BASE + AUTH_LOGIN, option);
    if (!response) {
      const errorMessage = await response.text();
      console.error("login failed", errorMessage);
      return false;
    }
    const json = await response.json();
    console.log("Full Response JSON:", json);

    const { accessToken, ...profile } = json?.data || {};

    if (accessToken) {
      save("token", accessToken);
      save("profile", profile);

      return true;
    }
    console.error("Login failed, no access token");
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
