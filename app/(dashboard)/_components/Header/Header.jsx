import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import SidebarComponent from "./SidebarComponent";

export default function Header() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--sidebar-width-mobile": "16rem",
      }}
    >
      <header>
        <Navbar />

        <SidebarComponent />
      </header>
    </SidebarProvider>
  );
}
