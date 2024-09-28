import ven from "../assets/no-image.webp";
import hero from "../assets/hero-image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://v2.api.noroff.dev/holidaze/venues";

function Home() {
  const { data, isLoading, isError } = useApi(API);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleVenueClick(venueId) {
    navigate(`venues/${venueId}`);
  }

  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (isError) {
    return <div>There is an Error</div>;
  }

  // this will filter all venues with search value
  const venuesArray = data;
  const filteredVenues = venuesArray.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(venuesArray);

  return (
    <div className="mx-auto mt-2 max-w-screen-2xl px-16">
      <div className="flex max-w-full flex-col-reverse items-center justify-between bg-gradient-to-r from-primary-100 via-primary-90 to-secondary-100 px-4 py-1 md:flex-row md:px-8">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            Find your perfect holiday accommodation with Holidaze
          </h1>
          <p className="mb-8 text-lg text-white md:text-xl">
            Discover a wide range of holiday venues for your next getaway. Book
            now and create unforgettable memories.
          </p>
          <form
            className="relative"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              className="w-full bg-white py-3 pl-4 pr-12 text-lg"
              type="search"
              placeholder="  Search for venues"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="p-4 md:w-1/2 md:p-8">
          <img
            className="h-[400px] w-full rounded-lg object-cover object-center shadow-xl"
            src={hero}
            alt="hero image"
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {filteredVenues ? (
          filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="group relative rounded-md border bg-gray-50"
            >
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden group-hover:opacity-75 lg:h-80">
                {venue.media && venue.media.length > 0 ? (
                  <img
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    src={ven}
                    alt="not available"
                  />
                )}
              </div>
              <div className="mt-2 flex items-start justify-between px-4">
                <div className="flex flex-col items-start">
                  <p className="text-xl text-primary-90">{venue.name}</p>
                  <p className="text-lg">
                    US$ {venue.price} <span>per night</span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm">very good</p>
                  <p className="rounded-t-lg rounded-br-lg bg-primary-90 p-2 text-xs text-white transition-shadow hover:rounded-lg">
                    {venue.rating}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end p-2">
                <Button
                  onClick={() => handleVenueClick(venue.id)}
                  className="bg-secondary-100 font-bold hover:bg-secondary-100 hover:opacity-75"
                >
                  Check Availability
                </Button>
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
