const API_BASE = "https://v2.api.noroff.dev/";
const DELETE_VENUE = "holidaze/venues/";
import { load } from "@/storage/load";
import { API_KEY } from "@/var/variables";

export async function deleteVenue(id) {
  try {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "x-Noroff-API-Key": API_KEY,
      },
    };
    //this is the best way to fetch the status of the request
    const response = await fetch(API_BASE + DELETE_VENUE + id, option);
    console.log(response);
    const json = await response.json();
    console.log(json.data);

    let result, message;
    if (response.status === 204) {
      result = true;
      message = "Venue is Deleted";

      return { result, message };
    } else {
      result = false;
      message = "There is an Error";
      return { result, message };
    }
  } catch (error) {
    console.log(error);
  }
}
