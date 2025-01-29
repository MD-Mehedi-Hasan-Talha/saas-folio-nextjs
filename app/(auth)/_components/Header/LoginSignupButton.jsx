"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginSignupButton() {
  const pathname = usePathname();

  const fromSignup = pathname.includes("/signup");

  return (
    <Link href={fromSignup ? "/" : "/signup"}>
      <Button variant={"secondary"} size={"lg"}>
        {fromSignup ? "Login" : "Signup"}
      </Button>
    </Link>
  );
}
