import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Calendar,
  Star,
} from "lucide-react";
import pic1 from "../assets/pic1.jpg";
import pic2 from "@/assets/pic2.jpg";
import pic3 from "@/assets/pic3.jpg";
import venue from "@/assets/venue.jpg";
export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About Holidaze</CardTitle>
          <CardDescription>
            Your gateway to unforgettable stays since 2020
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Holidaze is a premier platform for booking unique and inspiring
            venues around the world. Our mission is to connect travelers with
            extraordinary spaces, creating memorable experiences while
            empowering property owners to showcase their unique offerings to a
            global audience.
          </p>
          <p className="mb-4">
            Founded in 2020, we've rapidly grown from a small startup to a
            trusted name in the travel industry. Our team is driven by a passion
            for travel, cutting-edge technology, and the desire to create
            unforgettable moments for our users.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Users className="text-primary mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">10,000+</h3>
                <p className="text-muted-foreground text-center">
                  Happy Customers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Home className="text-primary mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">5,000+</h3>
                <p className="text-muted-foreground text-center">
                  Unique Venues
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Globe className="text-primary mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">50+</h3>
                <p className="text-muted-foreground text-center">Countries</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Star className="text-primary mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">4.8/5</h3>
                <p className="text-muted-foreground text-center">
                  Average Rating
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Discover Unique Stays</h2>
            <p className="mb-4">
              At Holidaze, we believe that where you stay is just as important
              as where you go. Our platform offers a curated selection of unique
              accommodations, from cozy cabins in the woods to luxurious
              beachfront villas and everything in between.
            </p>
            <p>
              Whether you're planning a romantic getaway, a family vacation, or
              a solo adventure, Holidaze has the perfect venue to make your trip
              truly special.
            </p>
          </div>
          <div className="relative h-64 md:h-auto md:w-1/2">
            <img
              src={pic1}
              alt="Unique accommodation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>

      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row-reverse">
          <div className="p-6 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Empower Hosts Worldwide</h2>
            <p className="mb-4">
              Holidaze isn't just for travelers – we're also dedicated to
              empowering property owners and hosts. Our platform provides the
              tools and exposure needed to showcase your unique space to a
              global audience of eager travelers.
            </p>
            <p>
              From cozy apartments to sprawling estates, Holidaze helps you turn
              your property into a thriving hospitality business, connecting you
              with guests from around the world.
            </p>
          </div>
          <div className="relative h-64 md:h-auto md:w-1/2">
            <img
              src={pic2}
              alt="Host welcoming guests"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
          <CardDescription>Get in touch with our team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-muted-foreground mr-2 h-5 w-5" />
              <span>support@holidaze.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-muted-foreground mr-2 h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
              <span>123 Holiday Street, San Francisco, CA 94105</span>
            </div>
          </div>
          <Button className="mt-6 bg-primary-100 text-white">
            <Mail className="mr-2 h-4 w-4" /> Contact Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
