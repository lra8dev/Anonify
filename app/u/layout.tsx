import { Navbar } from "@/components/navbar";
import { ReactNodeProps } from "@/types";

const ProfileLayout = async ({ children }: ReactNodeProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default ProfileLayout;
