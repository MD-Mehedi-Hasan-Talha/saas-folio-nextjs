import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import LoginForm from "./_components/Form/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Please sign in to continue
          </p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}
