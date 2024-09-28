const API_BASE = "https://v2.api.noroff.dev/";
const CREATE_VENUE = "holidaze/venues";
import { load } from "@/storage/load";
import { API_KEY } from "@/var/variables";

export async function createVenue(formData) {
  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "x-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        media: [
          {
            url: formData.mediaUrl,
            alt: formData.mediaAlt,
          },
        ],
        price: formData.price,
        maxGuests: formData.maxGuests,
        rating: formData.rating,
        meta: {
          wifi: formData.wifi,
          parking: formData.parking,
          breakfast: formData.breakfast,
          pets: formData.pets,
        },
        location: {
          city: formData.city,
          country: formData.country,
        },
      }),
    };
    //this is the best way to fetch the status of the request
    const response = await fetch(API_BASE + CREATE_VENUE, option);
    console.log(response);
    const json = await response.json();
    console.log(json.data);

    let result, message;
    if (response.status === 201) {
      result = true;
      message = "Venue is created successfully";
      let data = json.data;

      return { result, data, message };
    } else {
      result = false;
      message = json.errors[0].message;
      let data = "";
      return { result, data, message };
    }
  } catch (error) {
    console.log(error);
  }
}
