import { useEffect, useState } from "react";
import ven from "../assets/venue.jpg";
import { Button } from "@/components/ui/button";

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
  const venuesArray = venues?.data;

  console.log(venuesArray);

  return (
    <div className="p-96">
      <div className=" flex">
        {venuesArray ? (
          venuesArray.map((venue) => (
            <div key={venue.id} className="rounded-md border bg-gray-50 md:w-1/3">
              <div>
                <img className="w-full" src={ven} alt="not available" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-start">
                  <p className="text-primary-90 text-xl">Beach apartment</p>
                  <p className="text-lg">{venue.price} per night</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-lg">very good</p>
                  <p className="bg-primary-90 rounded-t-lg rounded-br-lg p-2 text-lg text-white transition-shadow hover:rounded-lg">
                   8.9 
                  </p>
                </div>
              </div>
              <Button className="bg-secondary-100">Check Availability</Button>
            </div>
          ))
        ) : (
          <p>Loading venues...</p> // Show a loading state while data is being fetched
        )}
      </div>
    </div>
  );
}

export default Home;
