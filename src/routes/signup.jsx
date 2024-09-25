import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userRegister } from "@/api/auth/register";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be valid email")
      .required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters"),
  })
  .required();

export default function SingUpForm() {
  const navigate = useNavigate();
  const [signupSuccess, setSingupSuccess] = useState("");
  const [signupError, setSignupError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    const { name, email, password } = data;

    const { result, message } = await userRegister(name, email, password);

    if (result) {
      setSingupSuccess(
        "Registration successful! You are being redirected to the login page.",
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSignupError(message);
      setTimeout(() => {
        setSignupError("");
      }, 2000);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm shadow-lg shadow-primary-100/70">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">name</Label>
                <Input id="name" placeholder="" {...register("name")} />
                <p className="text-red-600">{errors.name?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@stud.noroff.no"
                  {...register("email")}
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <p className="text-red-600">{errors.password?.message}</p>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-100 shadow-primary-60 hover:bg-primary-90"
              >
                Create an account
              </Button>
              <p className="mt-4 text-center text-red-600">{signupError}</p>
              <p className="mt-4 text-center text-green-600">{signupSuccess}</p>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
