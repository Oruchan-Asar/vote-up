"use server";

import { LoginSchema, type State } from "@/lib/auth/types";

export async function loginUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate form data
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.errors[0].message,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // Call the login API endpoint
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "An error occurred",
      };
    }

    // Successful login
    return {
      status: "success",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: "error",
      message: "An error occurred. Please try again.",
    };
  }
}
