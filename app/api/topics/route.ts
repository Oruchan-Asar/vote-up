import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    // Get the current user from cookies
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get("user-info");

    if (!userInfoCookie) {
      return NextResponse.json(
        { message: "You must be logged in to create a topic" },
        { status: 401 }
      );
    }

    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.value));

    // Create the topic
    const topic = await prisma.topic.create({
      data: {
        title,
        content,
        authorId: userInfo.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        topic,
        message: "Topic created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the topic" },
      { status: 500 }
    );
  }
}
