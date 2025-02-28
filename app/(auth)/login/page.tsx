"use client";

import { useEffect, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUser } from "./actions";
import { type State } from "@/lib/auth/types";
import { Label } from "@/components/ui/label";

// SearchParamsHandler component to handle URL params
function SearchParamsHandler({
  setSuccess,
}: {
  setSuccess: (msg: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("registered")) {
      setSuccess("Account created successfully! Please sign in.");
    }
  }, [searchParams, setSuccess]);

  return null;
}

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [state, setSuccess] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize form state with useActionState
  const initialState: State = { status: "idle" };
  const [formState, formAction] = useActionState(loginUser, initialState);

  // Handle successful login
  useEffect(() => {
    if (formState.status === "success") {
      // Manual login to ensure client-side storage works
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            // Store user info in localStorage as a fallback
            localStorage.setItem("user-info", JSON.stringify(data.user));
            console.log("Stored user info in localStorage:", data.user);

            // Also set a client-side cookie
            document.cookie = `user-info=${encodeURIComponent(
              JSON.stringify(data.user)
            )};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;

            console.log("Set user-info cookie manually");
          }
        })
        .catch((error) => {
          console.error("Error in manual login:", error);
        })
        .finally(() => {
          // Navigate to home page
          router.push("/");
          router.refresh();
        });
    }
  }, [formState, router, email, password]);

  return (
    <div className="container flex h-[calc(100vh-120px)] w-screen mx-auto flex-col items-center justify-center">
      <Suspense fallback={null}>
        <SearchParamsHandler setSuccess={setSuccess} />
      </Suspense>
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>

          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            {formState.status === "error" && (
              <div className="text-sm font-medium text-red-500">
                {formState.message}
              </div>
            )}
            {state && (
              <div className="text-sm font-medium text-green-500">{state}</div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton />
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
