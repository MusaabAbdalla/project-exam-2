const API_BASE = "https://v2.api.noroff.dev/";
const AUTH_REGISTER = "auth/register";

export async function userRegister(
  userName,
  userEmail,
  userPassword,
  venueManager,
) {
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
        venueManager: venueManager,
      }),
    };
    //this is the best way to fetch the status of the request
    const response = await fetch(API_BASE + AUTH_REGISTER, option);
    const json = await response.json();
    let result, message;
    if (response.status === 201) {
      result = true;
      message = "";
      return { result, message };
    } else {
      result = false;
      message = json.errors[0].message;
      return { result, message };
    }
    // console.log(response);
    // console.log(response.status);
    // console.log(typeof response.status);
    // console.log(json.errors[0].message);
  } catch (error) {
    console.log(error);
  }
}
