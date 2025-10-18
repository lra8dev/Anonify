"use client";

import { useParams } from "next/navigation";
import { SendMessage } from "../_components/send-message";
import { SuggestMessage } from "../_components/suggest-message";
import { useSendMessageForm } from "../_hooks";

const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const sendMessageForm = useSendMessageForm();

  return (
    <div className="container mx-auto my-8 p-6 rounded max-w-4xl">
      <SendMessage username={username} form={sendMessageForm} />
      <SuggestMessage form={sendMessageForm} />
    </div>
  );
};

export default PublicProfilePage;
