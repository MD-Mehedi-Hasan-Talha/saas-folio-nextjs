import { SidebarTrigger } from "@/components/ui/sidebar";
import LogoArea from "./LogoArea";

export default function Navbar() {
  return (
    <nav className="bg-primary dark:bg-dark_primary fixed top-0 left-0 w-full z-50 md:z-[60]">
      <div className="navigation text-secondary dark:text-dark_secondary max-w-[60%] flex p-2 md:pl-5 justify-start items-center">
        <SidebarTrigger />
        <LogoArea classes="logo_area font-medium text-3xl ml-2 md:ml-4 py-2" />
      </div>
    </nav>
  );
}
