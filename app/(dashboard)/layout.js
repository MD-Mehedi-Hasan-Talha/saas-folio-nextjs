import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "./_components/Header/Header";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
