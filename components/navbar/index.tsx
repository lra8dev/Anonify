// TODO: remove later
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { onSignOut } from "@/utils/auth-actions";

interface NavbarProps {
  user?: {
    userName?: string | null;
    email?: string | null;
  };
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-200 dark:bg-gray-800">
      <div className="container flex gap-4 justify-between items-center max-md:flex-wrap">
        <Link href="/" className="text-xl font-bold">
          Anonify
        </Link>
        {user ? (
          <>
            <span>Welcome, {user.userName || user.email}</span>
            <Button onClick={() => onSignOut()} variant="outline">
              Logout
            </Button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline">Join Now</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
