import { useEffect, useState } from "react";
import venue from "../assets/venue.jpg";
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
      <div>
        {venuesArray.map((venue) => (
          <div key={venue.id} className="rounded-md border bg-gray-50 md:w-1/3">
            <div>
              <img className="w-full" src={venue} alt="not available" />
            </div>
            <div className="flex items-start justify-between">
              <div className="flex flex-col items-start">
                <p className="text-primary-90 text-xl">Beach apartment</p>
                <p className="text-lg">US$ 120, - per night</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-lg">Very Good</p>
                <p className="bg-primary-90 rounded-t-lg rounded-br-lg p-2 text-lg text-white transition-shadow hover:rounded-lg">
                  8.9
                </p>
              </div>
            </div>
            <Button className="bg-secondary-100">Check Availability</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
