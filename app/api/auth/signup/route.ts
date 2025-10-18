import { hashPassword } from "@/lib/bcrypt-methods";
import { prisma } from "@/lib/db";
import { signUpSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { data, success, error } = signUpSchema.safeParse(await req.json());

  if (!success) {
    const message =
      error.issues.map((issue) => issue.message).join(", ") || "Invalid data";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  const { username, email, password, ...rest } = data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username, email }],
      },
      select: { id: true, username: true, email: true },
    });

    if (existingUser?.username) {
      return NextResponse.json(
        { success: false, message: "Username already in use" },
        { status: 409 }
      );
    }

    if (existingUser?.email) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, ...rest },
      select: { id: true },
    });

    if (!newUser) {
      return NextResponse.json(
        { success: false, message: "Error creating user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Error registering user",
      },
      { status: 500 }
    );
  }
};
