import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header/Header";

export default function AuthLayout({ children }) {
  return (
    <body className="bg-gray-100">
      <Header hrefProps={"/signup"} name={"Signup"} />
      {children}
      <Toaster position="top-right" richColors />
    </body>
  );
}
