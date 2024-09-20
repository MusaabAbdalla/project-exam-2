import ven from "../assets/venue.jpg";
import { LiaUtensilsSolid } from "react-icons/lia";
import { LuDog, LuWifi, LuCar } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import * as React from "react";

import { Button } from "@/components/ui/button";
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

import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Venue() {
  return (
    <div className="mx-auto my-32 max-w-screen-2xl border">
      <div className="mx-auto h-full w-full object-contain object-center">
        <img src={ven} alt="" />
      </div>
      <div className="flex items-end justify-between">
        <div className="left">
          <div className="mt-4 flex gap-4">
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LiaUtensilsSolid />
              </p>
              <p>Breakfast</p>
            </div>
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuDog />
              </p>
              <p>Pets</p>
            </div>
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuWifi />
              </p>
              <p>Wifi</p>
            </div>
            <div className="bg-secondary-70 flex items-center rounded-md p-1 text-sm">
              <p>
                <LuCar />
              </p>
              <p>Parking</p>
            </div>
          </div>
          <div className="">
            <p className="text-primary-100 text-3xl font-bold">
              Beach Apartment
            </p>
            <div className="flex items-center gap-1">
              <p>
                <IoLocationOutline className="text-secondary-100 text-lg" />
              </p>
              <p className="text-xs">Oslo,Norway</p>
            </div>
          </div>
          <div className="text-md mt-4 flex items-center gap-1">
            <p>
              <BsPersonArmsUp />
            </p>
            <p>10 guest</p>
          </div>
          <div>
            <p className="mt-4 text-lg font-normal">$120, -per night</p>
          </div>
          <div className="max-w-96">
            <p className="mt-2 text-2xl font-semibold">Description</p>
            <p className="line-clamp-4 text-sm">
              A charming studio apartment within walking distance to all the
              attractions in Oslo. Conveniently close to the city center, yet
              nestled in the popular hillsides of Oslo, offering easy access to
              nature.
            </p>
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
          <p className="text-2xl">Availabilty</p>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Venue;
