import { useState, useEffect } from "react";

// This API Hook will fetch all venues

function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, isLoading, isError };
}

export default useApi;
