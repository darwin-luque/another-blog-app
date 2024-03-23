"use client";

import { Rss } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "./search";

export const Navbar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return isAuthPage ? null : (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <Rss className="h-5 w-5 font-bold" />
          <h1 className="text-xl font-bold tracking-tight">
            Yet Another Blog App
          </h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          {userId ? (
            <UserButton />
          ) : (
            <a
              href="/sign-in"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
