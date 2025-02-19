"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(6, {
        message: "Name must be at least 6 characters.",
      })
      .refine((data) => data.trim() !== "", {
        message: "Name cannot be an empty string",
      }),
    username: z.string().min(6, {
      message: "Username must be at least 6 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const isInvalidUsername = /[^a-zA-Z-.]/.test(values.username);

      if (isInvalidUsername) {
        form.setError("username", {
          type: "manual",
          message: "Username can only contain letters, dots, and dashes.",
        });
        return;
      }

      let emailChackingBuffer = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/find/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );
      let emailChacking = await emailChackingBuffer.json();

      if (!emailChacking.availability) {
        // here i'm setting the toast message
        toast.error("Uh oh! This email already exists.", {
          description:
            "The email you want to use already exists. If you have forgotten your password, please try resetting it.",
        });
        return;
      }

      let usernameChackingBuffer = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/find/username`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: values.username }),
        }
      );
      let usernameChacking = await usernameChackingBuffer.json();

      if (!usernameChacking.availability) {
        // here i'm setting the toast message
        toast.error("Uh oh! This username already exists.", {
          description:
            "The username you want to use already exists. choose another.",
        });
        return;
      }

      let signupBuffer = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      let signup = await signupBuffer.json();

      if (!signup.register) {
        // here i'm setting the toast message
        toast.error("An error occurred while trying to register.");
        return;
      }

      toast.success("User created successfully.", {
        description: "You can now login using your new account.",
      });
      form.reset();
      router.push("/");
    } catch (err) {
      console.error(err.message);
      toast.error("An error occurred while trying to register.");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input {...field} placeholder="Enter your name" />
                <FormMessage className="mt-2" />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  {...field}
                  placeholder="Enter username (letters and hyphens only)"
                />
                <FormMessage className="mt-2" />
              </div>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" {...field} placeholder="Enter your email" />
              <FormMessage className="mt-2" />
            </div>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    placeholder="Enter password"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <FormMessage className="mt-2" />
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    placeholder="Confirm password"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <FormMessage className="mt-2" />
                </div>
              </div>
            )}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Sign Up
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
