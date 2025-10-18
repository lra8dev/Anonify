import { prisma } from "@/lib/db";
import { messageSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { success, data, error } = messageSchema.safeParse(await req.json());

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        message: error.issues.map((iss) => iss.message).join(", "),
      },
      { status: 400 }
    );
  }

  try {
    const receiver = await prisma.user.findUnique({
      where: { username: data.username },
      select: { id: true, isMessageAccepting: true },
    });

    if (!receiver || !receiver.id) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!receiver.isMessageAccepting) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    const message = await prisma.message.create({
      data: { username: data.username, content: data.content },
      select: { id: true },
    });

    if (!message || !message.id) {
      return NextResponse.json(
        { success: false, message: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully", data },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
