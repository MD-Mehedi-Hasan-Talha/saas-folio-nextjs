import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "@/components/ui/card";
import SignupForm from "../_components/Form/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>
        <SignupForm />
      </Card>
    </div>
  );
}
