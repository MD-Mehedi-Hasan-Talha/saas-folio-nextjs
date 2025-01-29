import LoginSignupButton from "./LoginSignupButton";

export default function Header() {
  return (
    <header className="w-full bg-primary dark:bg-dark_primary">
      <nav className="w-10/12 lg:w-8/12 flex items-center justify-between mx-auto py-4 text-secondary dark:text-dark_secondary">
        <div className="text-xl md:text-3xl">Logo.</div>
        <div className="nav">
          <LoginSignupButton />
        </div>
      </nav>
    </header>
  );
}
