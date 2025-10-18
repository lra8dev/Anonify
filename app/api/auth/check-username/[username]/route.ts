import { NextRequest, NextResponse } from "next/server";
import { checkUsernameSchema } from "@/lib/validators";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ username: string }>;
}

export const GET = async (req: NextRequest, { params }: Params) => {
  const {
    data,
    success,
    error: err,
  } = checkUsernameSchema.safeParse(await params);

  if (!success) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { username: data.username },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
};
