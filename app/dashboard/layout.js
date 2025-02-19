import { auth } from "@/auth";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import Header from "./_components/Header/Header";
import SidebarComponent from "./_components/Header/SidebarComponent";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
      <Header />
      <SidebarInset>
        <div className="mt-20 ml-2 md:mt-24 md:ml-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
