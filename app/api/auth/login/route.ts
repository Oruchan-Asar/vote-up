import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a session token
    const sessionToken = uuidv4();
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Return user data (without password) and session info
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };

    const response = NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    });

    // Set cookies in the response with more permissive settings for development
    response.cookies.set("auth-token", sessionToken, {
      expires,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Create a user info object with all necessary fields
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image || null,
    };

    // Set the user-info cookie with more permissive settings
    response.cookies.set("user-info", JSON.stringify(userInfo), {
      expires,
      httpOnly: false, // Must be false to be accessible by JavaScript
      path: "/",
      secure: false, // Set to false for development
      sameSite: "lax",
    });

    // Also set a JavaScript-accessible cookie directly in the response headers
    // This is a fallback approach for development environments
    response.headers.append(
      "Set-Cookie",
      `js-user-info=${encodeURIComponent(
        JSON.stringify(userInfo)
      )}; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax`
    );

    console.log("Setting user cookies for:", userInfo.email);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
