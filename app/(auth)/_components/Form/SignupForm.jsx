"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 border p-3 rounded-lg shadow-md min-w-[90%] md:min-w-[50%] lg:min-w-[33%] bg-white"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <span className="block text-gray-500 text-sm">
            Please Register a new Account
          </span>
        </div>
        <div className="flex items-start justify-center gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start justify-center gap-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    {...field}
                    toggleButton={
                      <Button
                        type="button"
                        size="sm"
                        variant="white"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent border rounded-tl-none rounded-bl-none"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Retype Password"
                    {...field}
                    toggleButton={
                      <Button
                        type="button"
                        size="sm"
                        variant="white"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent border rounded-tl-none rounded-bl-none"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full pt-4">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
        <p className="pt-4 text-center">
          Already have an account?
          <Link href="/" className="text-secondary hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
