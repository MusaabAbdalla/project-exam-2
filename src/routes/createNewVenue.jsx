import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Wifi,
  Car,
  Coffee,
  PawPrint,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenue } from "@/api/auth/createVenue";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
//form validation schema setup
const schema = yup
  .object({
    name: yup.string().required("Venue name is required"),
    description: yup.string().required("Description is required"),
    mediaUrl: yup.string().required("A valid image url is required"),
    mediaAlt: yup.string().required("Media Alt is required"),
    price: yup
      .number()
      .typeError("A valid number is required")
      .positive("Price must be positive")
      .integer("Price must be integer")
      .required("This field is required"),
    maxGuests: yup
      .number()
      .typeError("A valid number is required")
      .positive("Guests max number  must be positive")
      .integer("Guests max number  must be integer")
      .required("This field is required"),
    rating: yup
      .number()
      .typeError("A valid number is required")
      .min(0, "Rating cannot be less than 0")
      .max(5, "Rating cannot be greater than 5")
      .required("This field is required"),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    city: yup.string(),
    country: yup.string(),
  })
  .required();

export default function CreateNewVenue() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //initialize  react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //form submission handler
  async function onSubmit(formData) {
    console.log(formData);
    const { result, data, message } = await createVenue(formData);

    if (result) {
      console.log(result, data, message);
      setSuccess(
        <div>
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-green-600">Venue Created</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>,
      );
      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 3000);
    } else {
      console.log(result, data, message);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create New Venue</CardTitle>
            <CardDescription>
              Fill in the details to create a new venue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {success}
              {error}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Venue Name</Label>
              <Input id="name" name="name" {...register("name")} />
              <p className="text-red-600">{errors.name?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                {...register("description")}
              />
              <p className="text-red-600">{errors.description?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL</Label>
              <Input id="mediaUrl" name="mediaUrl" {...register("mediaUrl")} />
              <p className="text-red-600">{errors.mediaUrl?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaAlt">Media Alt Text</Label>
              <Input id="mediaAlt" name="mediaAlt" {...register("mediaAlt")} />
              <p className="text-red-600">{errors.mediaAlt?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" {...register("price")} />
              <p className="text-red-600">{errors.price?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGuests">Max Guests</Label>
              <Input
                id="maxGuests"
                name="maxGuests"
                {...register("maxGuests")}
              />
              <p className="text-red-600">{errors.maxGuests?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" name="rating" {...register("rating")} />
              <p className="text-red-600">{errors.rating?.message}</p>
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="wifi"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    {...register("wifi")}
                  />
                  <Label htmlFor="wifi">
                    <Wifi className="mr-1 inline h-4 w-4" /> WiFi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    {...register("parking")}
                  />
                  <Label htmlFor="parking">
                    <Car className="mr-1 inline h-4 w-4" /> Parking
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="breakfast"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    {...register("breakfast")}
                  />
                  <Label htmlFor="breakfast">
                    <Coffee className="mr-1 inline h-4 w-4" /> Breakfast
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pets"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    {...register("pets")}
                  />
                  <Label htmlFor="pets">
                    <PawPrint className="mr-1 inline h-4 w-4" /> Pets Allowed
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <Input
                  placeholder="City"
                  name="city"
                  id="city"
                  {...register("city")}
                />
                <Input
                  placeholder="Country"
                  name="country"
                  id="country"
                  {...register("country")}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => navigate("/profile")} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Venue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
