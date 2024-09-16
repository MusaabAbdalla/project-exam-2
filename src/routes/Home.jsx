import { useEffect, useState } from "react";

const API = "https://v2.api.noroff.dev/holidaze/venues";

function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(API);
      const json = await response.json();
      setVenues(json);
    }
    getData();
  }, []);

  console.log(venues);

  return (
    <div className="p-96">
      <h1 className="font-bold">This is Home</h1>
    </div>
  );
}

export default Home;
