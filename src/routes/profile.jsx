import ven from "@/assets/venue.jpg";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  Home,
  Star,
  Users,
  Clock,
  User,
  Edit,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { load } from "@/storage/load";
import useGetBookingsByProfile from "@/hooks/getBookingsByProfile";
import useGetVenuesByProfile from "@/hooks/getVenuesByProfile";
import { format, differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockBookings = [
  {
    id: 1,
    venueName: "Cozy Cabin",
    date: "2023-07-15",
    status: "Upcoming",
    guests: 4,
    nights: 3,
    checkIn: "2023-07-15",
    checkOut: "2023-07-18",
    owner: "Alice Smith",
    location: "Aspen, Colorado",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    venueName: "Beach House",
    date: "2023-06-20",
    status: "Completed",
    guests: 6,
    nights: 7,
    checkIn: "2023-06-20",
    checkOut: "2023-06-27",
    owner: "Bob Johnson",
    location: "Malibu, California",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    venueName: "Mountain Retreat",
    date: "2023-08-05",
    status: "Upcoming",
    guests: 2,
    nights: 2,
    checkIn: "2023-08-05",
    checkOut: "2023-08-07",
    owner: "Carol Williams",
    location: "Banff, Alberta",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const mockVenues = [
  {
    id: 1,
    name: "City Loft",
    location: "New York",
    rating: 4.8,
    description: "Modern loft in the heart of the city with stunning views.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Lakeside Cottage",
    location: "Michigan",
    rating: 4.6,
    description:
      "Charming cottage by the lake, perfect for a peaceful getaway.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Desert Oasis",
    location: "Arizona",
    rating: 4.9,
    description: "Luxurious retreat in the desert with a private pool and spa.",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const profile = load("profile");
  const { bookingsData, isLoading, isError } = useGetBookingsByProfile();
  const { venuesData, isVenuesLoading, isVenuesError } =
    useGetVenuesByProfile();
  // console.log(venuesData);

  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (isError) {
    return <div>There is an Error</div>;
  }

  return (
    // <div className="flex min-h-screen flex-col items-center justify-center">
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar.url} alt={profile.avatar.alt} />
            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-muted-foreground mb-4">{profile.email}</p>
            <div className="flex gap-4">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate("/createvenue")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Venue
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex min-h-dvh w-full flex-col items-center justify-center"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="venues">My Venues</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <div className="grid gap-6">
            {bookingsData.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-6 sm:w-2/3">
                    <div className="flex-grow">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <CardTitle className="mb-1 text-xl">
                            {booking.venue.name}
                          </CardTitle>
                          <Badge
                            variant={
                              booking.status === "Upcoming"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              Check-in:{" "}
                              {format(new Date(booking.dateFrom), "dd-MM-yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              Check-out:
                              {format(new Date(booking.dateTo), "dd-MM-yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {differenceInDays(
                                booking.dateTo,
                                booking.dateFrom,
                              )}{" "}
                              nights
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{booking.guests} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {booking.venue.location.city}{" "}
                              {booking.venue.location.country}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Owner: {booking.owner}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 border-t pt-4">
                      <Button variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="venues">
          <div className="grid gap-6">
            {venuesData.length > 0 ? (
              venuesData.map((venue) => (
                <Card key={venue.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img
                        src={ven}
                        alt={venue.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative flex flex-col p-6 sm:w-2/3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-4"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <div className="flex-grow">
                        <div className="mb-4">
                          <CardTitle className="mb-1 text-xl">
                            {venue.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{venue.location}</span>
                          </CardDescription>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {venue.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{venue.rating}</span>
                        </div>
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <Button variant="outline" className="w-full">
                          View Bookings
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center text-xl">No Venue Created</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    // </div>
  );
}
