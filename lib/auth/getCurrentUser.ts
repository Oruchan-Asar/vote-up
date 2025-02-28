import { cookies } from "next/headers";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get("user-info");

    if (!userInfoCookie) {
      return null;
    }

    // Parse the user info from the cookie
    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.value));

    return userInfo as CurrentUser;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
