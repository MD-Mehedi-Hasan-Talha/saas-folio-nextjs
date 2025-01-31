"use client";

import { credntialLogin } from "@/actions/userActions";
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
// import { useSession } from "next-auth/react"; //* for client components
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      let response = await credntialLogin(values);
      if (response.error) {
        toast.error(response.error);
        return;
      }

      // here you can redirect the user to the dashboard or home page
      toast.success("Logged in successfully!");
      router.push("/home");
    } catch (error) {
      toast.error("Uh oh! Something went wrong!.");
      console.log(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 border p-3 rounded-lg shadow-md min-w-[90%] md:min-w-[50%] lg:min-w-[33%] bg-white"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <span className="block text-gray-500 text-sm">
            Please Login to Your Account
          </span>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
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
        <div className="w-full pt-4">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
        <p className="pt-4 text-center">
          Don't have an account?
          <Link href="/signup" className="text-secondary hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}
