import { useState, useEffect } from "react";
import { load } from "@/storage/load";
import {
  API_BASE,
  ALL_BOOKINGS_BY_PROFILE,
  HOLIDAZE_PROFILES,
  API_KEY,
} from "@/var/variables";

function useGetBookingsByProfile() {
  const profile = load("profile");
  const token = load("token");
  const [bookingsData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-Noroff-API-Key": API_KEY,
    },
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          API_BASE + HOLIDAZE_PROFILES + profile.name + ALL_BOOKINGS_BY_PROFILE,
          option,
        );
        const json = await response.json();
        setData(json.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return { bookingsData, isLoading, isError };
}

export default useGetBookingsByProfile;
