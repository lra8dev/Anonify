import { Input } from "@/components/ui/input";
import { CopyToClipboard } from "../copy-to-clipboard";
import { headers } from "next/headers";

interface ProfileUrlProps {
  username: string;
}

export const ProfileUrl = async ({ username }: ProfileUrlProps) => {
  const { get } = await headers();
  const host = get("host") || "localhost:3000";
  const protocol = get("x-forwarded-proto") || "http";

  const profileUrl = `${protocol}://${host}/u/${username}`;

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
      <div className="flex items-center">
        <Input
          type="text"
          value={profileUrl}
          disabled
          className="w-full p-2 mr-2"
        />
        <CopyToClipboard url={profileUrl} />
      </div>
    </div>
  );
};
