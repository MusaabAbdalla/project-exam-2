import { Button } from "@/components/ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "@/api/auth/login";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().email("Must be valid").required("email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters"),
  })
  .required();

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    const { email, password } = data;
    try {
      const result = await userLogin(email, password);
      if (result) {
        console.log("everything is fine");
        navigate("/profile");
      } else {
        setLoginError("Invalid Username of Password");
        setTimeout(() => {
          setLoginError("");
        }, 2000);
        console.log("Login Failed");
      }
    } catch (error) {
      setLoginError("Invalid Username of Password");
      console.error("Error during Login", error);
    }
  }
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  {...register("email")}
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <p className="text-red-600">{errors.password?.message}</p>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <p className="mt-4 text-center text-red-600">{loginError}</p>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

// .matches(
//   /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
//   "email must be a valid stud.noroff.no email address.",
// )
