import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { ReactNodeProps } from "@/types";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: ReactNodeProps) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <div className="min-h-screen">
      <Navbar
        user={{ userName: session.user.name, email: session.user.email }}
      />
      {children}
    </div>
  );
};

export default DashboardLayout;
