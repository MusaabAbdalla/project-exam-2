import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to your API
    // For now, we'll just set the message as sent immediately
    setIsMessageSent(true);
    // Reset form data
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    if (isMessageSent) {
      const timer = setTimeout(() => {
        setIsMessageSent(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMessageSent]);

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto min-h-dvh px-4 pt-28">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              Get in touch with the Holidaze team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isMessageSent ? (
              <Alert className="mb-6">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your message is sent. We'll get back to you soon.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    name="subject"
                    onValueChange={(value) =>
                      handleInputChange({ target: { name: "subject", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="booking">Booking Issue</SelectItem>
                      <SelectItem value="hosting">Hosting Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
