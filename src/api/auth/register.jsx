const API_BASE = "https://v2.api.noroff.dev/";
const AUTH_REGISTER = "auth/register";

export async function userRegister(userName, userEmail, userPassword) {
  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    };

    const response = await fetch(API_BASE + AUTH_REGISTER, option);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
