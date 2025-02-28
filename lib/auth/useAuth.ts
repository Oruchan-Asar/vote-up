"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to parse cookies
  const getCookie = (name: string) => {
    try {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          const cookieValue = cookie.substring(name.length + 1);
          return cookieValue;
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting cookie:", error);
      return null;
    }
  };

  // Function to manually set a cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  useEffect(() => {
    const checkUserAuth = () => {
      try {
        // Try multiple methods to get user info

        // 1. Try the regular user-info cookie
        let userInfoValue = getCookie("user-info");

        // 2. If not found, try the js-user-info cookie
        if (!userInfoValue) {
          userInfoValue = getCookie("js-user-info");
        }

        // 3. If still not found, try localStorage
        if (!userInfoValue) {
          userInfoValue = localStorage.getItem("user-info");
        }

        if (userInfoValue) {
          try {
            // Parse the user info
            const userInfo = JSON.parse(decodeURIComponent(userInfoValue));

            // Store in localStorage as fallback
            localStorage.setItem("user-info", JSON.stringify(userInfo));

            // Also set as cookie for redundancy
            setCookie("user-info", JSON.stringify(userInfo), 30);

            setUser(userInfo);
          } catch (parseError) {
            console.error(
              "Error parsing user info JSON:",
              parseError,
              "Raw value:",
              userInfoValue
            );
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Check auth status on mount
    checkUserAuth();

    // Set up an interval to periodically check auth status
    const interval = setInterval(checkUserAuth, 5000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      // Clear cookies
      document.cookie =
        "user-info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "js-user-info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Clear localStorage
      localStorage.removeItem("user-info");

      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { user, loading, logout };
}
