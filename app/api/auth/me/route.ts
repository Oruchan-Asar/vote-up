import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Get the auth token from cookies
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token");
    const userInfoCookie = cookieStore.get("user-info");

    // If no auth token, user is not authenticated
    if (!authToken || !userInfoCookie) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    try {
      // Parse the user info from the cookie
      const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.value));

      // Return the user info
      return NextResponse.json({
        user: userInfo,
      });
    } catch (error) {
      console.error("Error parsing user info:", error);
      return NextResponse.json(
        { message: "Error parsing user info" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
