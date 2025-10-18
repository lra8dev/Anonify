import type { Metadata } from "next";
import { ThemeProvider } from "@/context/theme";
import { QueryProvider } from "@/context/react-query";
import { SonnerProvider } from "@/context/sonner-toast";
import { AuthProvider } from "@/context/auth-session";
import { ReactNodeProps } from "@/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anonify - Anonymous Messaging Platform",
  description:
    "Send anonymous messages to anyone - confessions, jokes, feedback - the possibilities are endless! 😉 Sign up is quick & easy, and your identity stays hidden.🤫 Start messaging anonymously now! ➡️",
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = ({ children }: ReactNodeProps) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SonnerProvider>{children}</SonnerProvider>
            </QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
