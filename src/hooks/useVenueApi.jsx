import { useState, useEffect } from "react";

function useVenueApi(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }
        const json = await response.json();
        if (json.data) {
          setData(json.data);
        } else {
          console.log("Cannot fetch Venue data", data);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return { data, isLoading, isError };
}

export default useVenueApi;
