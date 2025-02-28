"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a user-info cookie
    const userInfoCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user-info="));

    if (userInfoCookie) {
      try {
        // Parse the user info from the cookie
        const userInfoValue = userInfoCookie.split("=")[1];
        const userInfo = JSON.parse(decodeURIComponent(userInfoValue));
        setUser(userInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { user, loading, logout };
}
