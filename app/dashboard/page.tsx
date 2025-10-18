import { ToggleMessage } from "./_components/toggle-message";
import { ProfileUrl } from "./_components/profile-url";
import { Messages } from "./_components/messages";
import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="py-8 px-4 lg:mx-auto rounded w-full max-w-6xl sm:px-8">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <ProfileUrl username={session?.user?.username || ""} />
      <ToggleMessage />
      <Messages />
    </div>
  );
};

export default DashboardPage;
