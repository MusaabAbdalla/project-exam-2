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

export default function CreateNewVenue() {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      city: "",
      country: "",
    },
  });

  const [alert, setAlert] = useState({ type: null, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMetaChange = (name) => {
    setVenueData((prevData) => ({
      ...prevData,
      meta: {
        ...prevData.meta,
        [name]: !prevData.meta[name],
      },
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the venueData to your API
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAlert({ type: "success", message: "Venue created successfully!" });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error creating venue. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    // Here you would typically handle the cancellation, e.g., navigate back
    console.log("Venue creation cancelled");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Venue</CardTitle>
          <CardDescription>
            Fill in the details to create a new venue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alert.type && (
            <Alert
              variant={alert.type === "error" ? "destructive" : "default"}
              className="mb-6"
            >
              {alert.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <AlertTitle>
                {alert.type === "error" ? "Error" : "Success"}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Venue Name</Label>
              <Input
                id="name"
                name="name"
                value={venueData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={venueData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-url">Media URL</Label>
              <Input
                id="media-url"
                name="media-url"
                value={venueData.media[0].url}
                onChange={(e) =>
                  setVenueData((prevData) => ({
                    ...prevData,
                    media: [{ ...prevData.media[0], url: e.target.value }],
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="media-alt">Media Alt Text</Label>
              <Input
                id="media-alt"
                name="media-alt"
                value={venueData.media[0].alt}
                onChange={(e) =>
                  setVenueData((prevData) => ({
                    ...prevData,
                    media: [{ ...prevData.media[0], alt: e.target.value }],
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={venueData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxGuests">Max Guests</Label>
              <Input
                id="maxGuests"
                name="maxGuests"
                type="number"
                value={venueData.maxGuests}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={venueData.rating}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={venueData.meta.wifi}
                    onCheckedChange={() => handleMetaChange("wifi")}
                  />
                  <Label htmlFor="wifi">
                    <Wifi className="mr-1 inline h-4 w-4" /> WiFi
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={venueData.meta.parking}
                    onCheckedChange={() => handleMetaChange("parking")}
                  />
                  <Label htmlFor="parking">
                    <Car className="mr-1 inline h-4 w-4" /> Parking
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="breakfast"
                    checked={venueData.meta.breakfast}
                    onCheckedChange={() => handleMetaChange("breakfast")}
                  />
                  <Label htmlFor="breakfast">
                    <Coffee className="mr-1 inline h-4 w-4" /> Breakfast
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pets"
                    checked={venueData.meta.pets}
                    onCheckedChange={() => handleMetaChange("pets")}
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
                  value={venueData.location.city}
                  onChange={handleLocationChange}
                />
                <Input
                  placeholder="Country"
                  name="country"
                  value={venueData.location.country}
                  onChange={handleLocationChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Venue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
