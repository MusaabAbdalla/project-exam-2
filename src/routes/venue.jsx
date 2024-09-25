import { LiaUtensilsSolid } from "react-icons/lia";
import { LuDog, LuWifi, LuCar } from "react-icons/lu";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { BsPersonArmsUp } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import useVenueApi from "@/hooks/useVenueApi";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
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

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { createBooking } from "@/api/auth/createBooking";

import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validation schema using yup
const schema = yup.object().shape({
  dateRange: yup.object().shape({
    from: yup.date().required("Start date is required"),
    to: yup.date().required("End date is required"),
  }),
  numberField: yup
    .number()
    .typeError("A valid number is required")
    .required("This field is required")
    .positive("The number must be positive")
    .integer("The number must be an integer"),
});

function Venue({ id }) {
  //initialize react-hook-form with yup validation schema
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    console.log(data);
    const dateFrom = data.dateRange.from.toString();
    const dateTo = data.dateRange.to.toString();
    const guests = data.numberField;

    const { result, booking, message } = await createBooking(
      dateFrom,
      dateTo,
      guests,
      id,
    );

    if (result) {
      console.log(result, booking, message);
      setSuccess(
        <div>
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-green-600">Booking Created</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>,
      );
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      console.log(result, booking, message);
      setError(
        <div>
          <Alert variant="destructive" className="mx-auto mt-4 w-[350px]">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </div>,
      );
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }
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
            <div className="flex items-center rounded-md bg-secondary-70 p-1 text-sm">
              <p>
                <LiaUtensilsSolid />
              </p>
              <p>Breakfast</p>
            </div>
          )}

          {data.meta.parking && (
            <div className="flex items-center rounded-md bg-secondary-70 p-1 text-sm">
              <p>
                <LuDog />
              </p>
              <p>Pets</p>
            </div>
          )}
          {data.meta.pets && (
            <div className="flex items-center rounded-md bg-secondary-70 p-1 text-sm">
              <p>
                <LuWifi />
              </p>
              <p>Wifi</p>
            </div>
          )}
          {data.meta.wifi && (
            <div className="flex items-center rounded-md bg-secondary-70 p-1 text-sm">
              <p>
                <LuCar />
              </p>
              <p>Parking</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <p className="text-xs">very good</p>
          <p className="rounded-t-lg rounded-br-lg bg-primary-90 p-2 text-xs text-white transition-shadow hover:rounded-lg">
            {data.rating}
          </p>
        </div>
      </div>
      <div className="mx-8 mt-8 flex flex-wrap items-center justify-center gap-8 md:justify-between md:gap-0">
        <div className="left w-full md:max-w-[350px]">
          <div className="">
            <p className="text-3xl font-bold text-primary-100">{data.name}</p>
            <div className="flex items-center gap-1">
              <p>
                <IoLocationOutline className="text-lg text-secondary-100" />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-[350px] bg-gray-50">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                  Availability
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="mb-6">
                {/* DateRangePicker controlled by react-hook-form */}
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col -space-y-1.5">
                    <Controller
                      name="dateRange"
                      control={control}
                      defaultValue={{ from: null, to: null }}
                      render={({ field }) => (
                        <DateRangePicker
                          date={field.value}
                          onDateChange={field.onChange}
                        />
                      )}
                    />
                    {errors?.dateRange?.from && (
                      <p className="pt-2 text-center text-red-600">
                        {errors.dateRange.from.message} and{" "}
                        {errors.dateRange.to.message}
                      </p>
                    )}
                    {/* {errors?.dateRange?.to && (
                      <p className="text-center text-red-600">
                        {errors.dateRange.to.message}
                      </p>
                    )} */}
                  </div>
                  <div className="flex flex-col -space-y-1.5">
                    {/* Input field for number */}
                    <div>
                      <label htmlFor="numberField">Enter a number:</label>
                      <Controller
                        name="numberField"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            id="numberField"
                            placeholder="Enter number of guests"
                            className="bg-white"
                          />
                        )}
                      />
                      {errors?.numberField && (
                        <p className="pt-2 text-center text-red-600">
                          {errors.numberField.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid w-full items-center gap-8">
                {/* <div>
                  <div className="flex items-center justify-center gap-20 text-xl font-bold">
                    <p>Total</p>
                    <p> $850</p>
                  </div>
                  <div className="rounded bg-gray-700 py-[0.5px]"></div>
                </div> */}
                <Button type="submit" className="bg-secondary-100 text-xl">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </form>
          <div>
            {success}
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venue;
