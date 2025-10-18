import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;

  try {
    await prisma.message.delete({
      where: { id },
      select: { id: true },
    });

    return NextResponse.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
};
