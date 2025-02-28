import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the auth token cookie
    response.cookies.set({
      name: "auth-token",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: true,
    });

    // Clear the user info cookie
    response.cookies.set({
      name: "user-info",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: false, // Must be false to match the setting in login
    });

    console.log("Cookies cleared on logout");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
