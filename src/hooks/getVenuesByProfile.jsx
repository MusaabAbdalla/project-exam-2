import { useState, useEffect } from "react";
import { load } from "@/storage/load";
import {
  API_BASE,
  ALL_VENUES_BY_PROFILE,
  HOLIDAZE_PROFILES,
  API_KEY,
} from "@/var/variables";

function useGetVenuesByProfile() {
  const profile = load("profile");
  const token = load("token");
  const [venuesData, setData] = useState([]);
  const [isVenuesLoading, setIsLoading] = useState(false);
  const [isVenuesError, setIsError] = useState(false);

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
          API_BASE + HOLIDAZE_PROFILES + profile.name + ALL_VENUES_BY_PROFILE,
          option,
        );
        const json = await response.json();
        setData(json.data);
        console.log(venuesData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return { venuesData, isVenuesLoading, isVenuesError };
}

export default useGetVenuesByProfile;
