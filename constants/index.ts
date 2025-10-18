import { GitHubIcon, GoogleIcon } from "@/icons";

export const OAUTH_PROVIDERS = [
  {
    name: "google" as const,
    label: "Continue with Google",
    icon: GoogleIcon,
  },
  {
    name: "github" as const,
    label: "Continue with GitHub",
    icon: GitHubIcon,
  },
];

export const MESSAGES = [
  {
    title: "Message from Hawkeye",
    content: "Hey, how are you doing today?",
    received: "10 minutes ago",
  },
  {
    title: "Message from SecretAdmirer",
    content: "I really liked your recent post!",
    received: "2 hours ago",
  },
  {
    title: "Message from MysteryGuest",
    content: "Do you have any book recommendations?",
    received: "1 day ago",
  },
];

export const messagePrompt =
  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

export const systemInstruction =
  "You are a helpful assistant that generates engaging and open-ended questions for a social messaging platform. Ensure the questions are suitable for a diverse audience and avoid personal or sensitive topics.";
