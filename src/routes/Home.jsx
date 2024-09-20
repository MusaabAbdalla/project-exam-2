import ven from "../assets/no-image.webp";
import hero from "../assets/hero-image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useApi from "@/hooks/useApi";
import { useState } from "react";

const API = "https://v2.api.noroff.dev/holidaze/venues";

function Home() {
  const { data, isLoading, isError } = useApi(API);
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (isError) {
    return <div>There is an Error</div>;
  }

  //   const venuesArray = venues?.data;
  const venuesArray = data;

  console.log(venuesArray);

  return (
    <div className="mx-auto mt-2 max-w-screen-2xl px-16">
      <div className="from-primary-100 via-primary-90 to-secondary-100 flex max-w-full items-center justify-between bg-gradient-to-r">
        <div className="px-8">
          <p className="mb-6 line-clamp-3 text-5xl text-white">
            Find your perfect holiday <br /> accommodation with Holidaze
          </p>
          <p className="text-md line-clamp-4 text-white">
            Discover a wide rage of holiday <br /> venues for your next getaway.{" "}
            <br />
            Book now and create unforgettable memories
          </p>
          <form className="" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control border-secondary-90 mt-6 w-full rounded-md border py-2"
              type="search"
              placeholder="  Search for venues"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="w-1/2 p-8">
          <img
            className="object-cover object-center"
            src={hero}
            alt="hero image"
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {venuesArray ? (
          venuesArray.map((venue) => (
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
                  <p className="text-primary-90 text-xl">{venue.name}</p>
                  <p className="text-lg">
                    US$ {venue.price} <span>per night</span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm">very good</p>
                  <p className="bg-primary-90 rounded-t-lg rounded-br-lg p-2 text-xs text-white transition-shadow hover:rounded-lg">
                    {venue.rating}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end p-2">
                <Button className="bg-secondary-100 hover:bg-secondary-100 font-bold hover:opacity-75">
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
