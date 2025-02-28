"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logoutUser(): Promise<void> {
  try {
    // Call the logout API endpoint
    await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/auth/logout`,
      {
        method: "POST",
      }
    );

    // Redirect to login page
    redirect("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, try to clear cookies on the server side as a fallback
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    cookieStore.delete("user-info");
    redirect("/login");
  }
}
