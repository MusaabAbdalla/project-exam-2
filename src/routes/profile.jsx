"use client";

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
  Star,
  Users,
  Clock,
  User,
  Edit,
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="venues">My Venues</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <div className="grid gap-6">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img
                      src={booking.image}
                      alt={booking.venueName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:w-2/3">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <CardTitle className="mb-1 text-xl">
                          {booking.venueName}
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
                          <span>Check-in: {booking.checkIn}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>Check-out: {booking.checkOut}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.nights} nights</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{booking.guests} guests</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Owner: {booking.owner}</span>
                    </div>
                    <CardFooter className="px-0 pt-4">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="venues">
          <div className="grid gap-6">
            {mockVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative p-6 sm:w-2/3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-4"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
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
                    <CardFooter className="px-0 pt-4">
                      <Button variant="outline" className="w-full">
                        View Bookings
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
