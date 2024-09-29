import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { load } from "@/storage/load";
import { save } from "@/storage/save";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfile } from "@/api/auth/updateProfile";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "@radix-ui/react-icons";

const schema = yup.object({
  bio: yup.string(),
  url: yup.string(),
  alt: yup.string(),
});

const EditProfile = () => {
  const profile = load("profile");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(formData) {
    const { result, profileData, message } = await updateProfile(formData);

    console.log(profile);
    console.log(profileData);
    if (result) {
      setSuccess(
        <div>
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="text-green-600">
              Profile Avatar changed
            </AlertTitle>
            <AlertDescription></AlertDescription>
          </Alert>
        </div>,
      );
      setTimeout(() => {
        save("profile", profileData);
        navigate("/profile");
      }, 2000);
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
    <div className="flex min-h-dvh w-full flex-col items-center justify-start">
      <div className="container mx-auto px-4 py-8">
        <div className="pb-8">
          {success}
          {error}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Edit Your Profile
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself"
                    {...register("bio")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Avatar</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={profile.avatar.url}
                        alt={profile.avatar.alt}
                      />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Avatar URL"
                        //   defaultValue={profile.avatar.url}
                        {...register("url")}
                      />
                      <Input
                        placeholder="Avatar Alt Text"
                        //   defaultValue={profile.avatar.alt}
                        {...register("alt")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
