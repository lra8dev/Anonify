import { auth } from "@/auth";
import { ReactNodeProps } from "@/types";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: ReactNodeProps) => {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
