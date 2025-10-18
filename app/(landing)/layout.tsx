import { Navbar } from "@/components/navbar";
import { ReactNodeProps } from "@/types";

const HomeLayout = ({ children }: ReactNodeProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
