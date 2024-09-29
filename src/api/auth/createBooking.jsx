const API_BASE = "https://v2.api.noroff.dev/";
const CREATE_BOOKING = "holidaze/bookings";
import { load } from "@/storage/load";
import { API_KEY } from "@/var/variables";

export async function createBooking(dateFrom, dateTo, guests, venueId) {
  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "x-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        dateFrom: dateFrom,
        dateTo: dateTo,
        guests: guests,
        venueId: venueId,
      }),
    };
    //this is the best way to fetch the status of the request
    const response = await fetch(API_BASE + CREATE_BOOKING, option);
    console.log(response);
    const json = await response.json();
    console.log(json.data);

    let result, message;
    if (response.status === 201) {
      result = true;
      message = "";
      let booking = json.data;

      return { result, booking, message };
    } else {
      result = false;
      message = json.errors[0].message;
      let booking = "";
      return { result, booking, message };
    }
  } catch (error) {
    console.log(error);
  }
}
