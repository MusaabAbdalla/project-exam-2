import ven from "../assets/venue.jpg";
import { LiaUtensilsSolid } from "react-icons/lia";
import { LuDog, LuWifi, LuCar } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import useVenueApi from "@/hooks/useVenueApi";
const API = "https://v2.api.noroff.dev/holidaze/venues";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Venue({ id }) {
  const { data, isLoading, isError } = useVenueApi(`${API}/${id}`);
  if (isLoading || !data) {
    return <div>Product is Loading</div>;
  }
  if (isError) {
    return <div>There is a Problem</div>;
  }

  return (
    <div className="mx-auto my-32 max-w-screen-lg border">
      <div className="mx-auto h-full w-full">
        <img
          className="w-full object-center"
          src={data.media[0].url}
          alt={data.media[0].alt}
        />
      </div>

      <div className="mx-8 flex items-center justify-between">
        <div className="mt-4 flex gap-4">
          {data.meta.breakfast && (
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LiaUtensilsSolid />
              </p>
              <p>Breakfast</p>
            </div>
          )}

          {data.meta.parking && (
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuDog />
              </p>
              <p>Pets</p>
            </div>
          )}
          {data.meta.pets && (
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuWifi />
              </p>
              <p>Wifi</p>
            </div>
          )}
          {data.meta.wifi && (
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuCar />
              </p>
              <p>Parking</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <p className="text-xs">very good</p>
          <p className="bg-primary-90 rounded-t-lg rounded-br-lg p-2 text-xs text-white transition-shadow hover:rounded-lg">
            {data.rating}
          </p>
        </div>
      </div>
      <div className="mx-8 mt-8 flex flex-wrap items-center justify-center gap-8 md:justify-between md:gap-0">
        <div className="left w-full md:max-w-[350px]">
          <div className="">
            <p className="text-primary-100 text-3xl font-bold">{data.name}</p>
            <div className="flex items-center gap-1">
              <p>
                <IoLocationOutline className="text-secondary-100 text-lg" />
              </p>
              <p className="text-xs">
                {data.location.city},{data.location.country}
              </p>
            </div>
          </div>
          <div className="text-md mt-4 flex items-center gap-1">
            <p>
              <BsPersonArmsUp />
            </p>
            <p>{data.maxGuests} guests</p>
          </div>
          <div>
            <p className="mt-4 text-lg font-normal">
              ${data.price}, -per night
            </p>
          </div>
          <div className="max-w-96">
            <p className="mt-2 text-2xl font-semibold">Description</p>
            <p className="line-clamp-4 text-sm">{data.description}</p>
          </div>
          <div className="mt-8">
            <p>Owner</p>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm font-light">
                <p>Erick James</p>
                <p>erickjames@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Card className="w-[350px] bg-gray-50">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Availability
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="mb-6">
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <DateRangePicker />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Number of Guests</Label>
                    <Select>
                      <SelectTrigger id="guests" className="bg-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="grid w-full items-center gap-8">
              <div>
                <div className="flex items-center justify-center gap-20 text-xl font-bold">
                  <p>Total</p>
                  <p> $850</p>
                </div>
                <div className="rounded bg-gray-700 py-[0.5px]"></div>
              </div>
              <Button className="bg-secondary-100 text-xl">Book Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Venue;
