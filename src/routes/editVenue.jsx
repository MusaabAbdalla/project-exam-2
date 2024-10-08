import { useState, useEffect } from "react";
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
import { Wifi, Car, Coffee, PawPrint, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenue } from "@/api/auth/createVenue";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import useVenueApi from "@/hooks/useVenueApi";
import { load } from "@/storage/load";
import { editVenue } from "@/api/auth/editVenue";

// Form validation schema setup
const schema = yup
  .object({
    name: yup.string().required("Venue name is required"),
    description: yup.string().required("Description is required"),
    mediaUrl: yup.string().required("A valid image URL is required"),
    mediaAlt: yup.string().required("Media Alt text is required"),
    price: yup
      .number()
      .positive("Price must be positive")
      .integer("Price must be an integer")
      .required("This field is required"),
    maxGuests: yup
      .number()
      .positive("Guests max number must be positive")
      .integer("Guests max number must be an integer")
      .required("This field is required"),
    rating: yup
      .number()
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

export default function EditVenue({ id }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize react-hook-form with validation and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}, // Default values will be updated after data is fetched
  });

  const { data, isLoading, isError } = useVenueApi(
    `https://v2.api.noroff.dev/holidaze/venues/${id}`,
  );

  // Update form fields with fetched venue data when data is loaded
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        mediaUrl: data.media[0].url || "", // Assuming media array, adjust if necessary
        mediaAlt: data.media[0].alt || "", // Assuming mediaAlt exists, adjust if necessary
        price: data.price || "",
        maxGuests: data.maxGuests || "",
        rating: data.rating || 0,
        wifi: data.meta?.wifi || false,
        parking: data.meta?.parking || false,
        breakfast: data.meta?.breakfast || false,
        pets: data.meta?.pets || false,
        city: data.location?.city || "",
        country: data.location?.country || "",
      });
    }
  }, [data, reset]);

  // Form submission handler
  async function onSubmit(formData) {
    console.log(formData);
    const { result, data, message } = await editVenue(formData, id);

    if (result) {
      setSuccess(
        <div>
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-green-600">Venue Updated</AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>,
      );
      setTimeout(() => {
        setSuccess("");
        navigate("/profile");
      }, 3000);
    } else {
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
            <CardTitle>Edit Venue</CardTitle>
            <CardDescription>Edit the details of the venue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {success}
              {error}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Venue Name</Label>
              <Input id="name" {...register("name")} />
              <p className="text-red-600">{errors.name?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
              <p className="text-red-600">{errors.description?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL</Label>
              <Input id="mediaUrl" {...register("mediaUrl")} />
              <p className="text-red-600">{errors.mediaUrl?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaAlt">Media Alt Text</Label>
              <Input id="mediaAlt" {...register("mediaAlt")} />
              <p className="text-red-600">{errors.mediaAlt?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...register("price")} />
              <p className="text-red-600">{errors.price?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGuests">Max Guests</Label>
              <Input id="maxGuests" {...register("maxGuests")} />
              <p className="text-red-600">{errors.maxGuests?.message}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" {...register("rating")} />
              <p className="text-red-600">{errors.rating?.message}</p>
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" {...register("wifi")} />
                  <Label htmlFor="wifi">
                    <Wifi className="mr-1 inline h-4 w-4" /> WiFi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parking" {...register("parking")} />
                  <Label htmlFor="parking">
                    <Car className="mr-1 inline h-4 w-4" /> Parking
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="breakfast" {...register("breakfast")} />
                  <Label htmlFor="breakfast">
                    <Coffee className="mr-1 inline h-4 w-4" /> Breakfast
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pets" {...register("pets")} />
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
                <Input placeholder="City" {...register("city")} />
                <Input placeholder="Country" {...register("country")} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => navigate("/profile")} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Update Venue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
