import Header from "./_components/Header/Header";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-gray-100 w-full h-full">
      <Header hrefProps={"/signup"} name={"Signup"} />
      {children}
    </div>
  );
}
