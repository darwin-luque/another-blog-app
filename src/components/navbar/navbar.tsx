import { Rss } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "./search";

export const Navbar = () => {
  const { userId } = auth();

  return (
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
