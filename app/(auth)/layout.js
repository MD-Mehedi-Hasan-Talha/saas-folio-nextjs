import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <div className="bg-gray-100 w-full h-screen">{children}</div>;
}
