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
    <div className="mx-auto max-w-screen-2xl px-16">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {venuesArray ? (
          venuesArray.map((venue) => (
            <div key={venue.id} className="rounded-md border bg-gray-50">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden group-hover:opacity-75 lg:h-80">
                <img
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  src={ven}
                  alt="not available"
                />
              </div>
              <div className="mt-2 flex items-start justify-between px-4">
                <div className="flex flex-col items-start">
                  <p className="text-primary-90 text-xl">Beach apartment</p>
                  <p className="text-lg">{venue.price} per night</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm">very good</p>
                  <p className="bg-primary-90 rounded-t-lg rounded-br-lg p-2 text-xs text-white transition-shadow hover:rounded-lg">
                    8.9
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end p-2">
                <Button className="bg-secondary-100">Check Availability</Button>
              </div>
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
