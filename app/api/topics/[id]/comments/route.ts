import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { content } = body;
    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }
    // Get the current user from cookies
    const cookieStore = await cookies();
    const userInfoCookie = cookieStore.get("user-info");
    if (!userInfoCookie) {
      return NextResponse.json(
        { error: "You must be logged in to comment" },
        { status: 401 }
      );
    }
    const userInfo = JSON.parse(decodeURIComponent(userInfoCookie.value));
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userInfo.id,
        topicId: params.id,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { topicId: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
