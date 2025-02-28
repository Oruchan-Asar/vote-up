"use server";

import { RegisterSchema, type State } from "@/lib/auth/types";

export async function registerUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate form data
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
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

  const { name, email, password } = validatedFields.data;

  try {
    // Call the register API endpoint
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Something went wrong",
      };
    }

    // Successful registration
    return {
      status: "success",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
