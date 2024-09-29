const API_BASE = "https://v2.api.noroff.dev/";
const PROFILES = "holidaze/profiles/";
import { load } from "@/storage/load";
import { API_KEY } from "@/var/variables";
const profile = load("profile");

export async function updateProfile(formData) {
  try {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "x-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        bio: formData.bio,
        avatar: {
          url: formData.url,
          alt: formData.url,
        },
      }),
    };
    //this is the best way to fetch the status of the request
    const response = await fetch(API_BASE + PROFILES + profile.name, option);
    console.log(response);
    const json = await response.json();
    console.log(json.data);

    let result, message;
    if (response.status === 200) {
      result = true;
      message = "Avatar image has been changed";
      let profileData = json.data;

      return { result, profileData, message };
    } else {
      result = false;
      message = "There is an Error";
      let profileData = "";
      return { result, profileData, message };
    }
  } catch (error) {
    console.log(error);
  }
}
