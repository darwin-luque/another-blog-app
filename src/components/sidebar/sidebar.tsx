"use client";

import {
  SquarePen,
  LayoutGrid,
  LibraryBig,
  BookOpenText,
  SearchCheck,
} from "lucide-react";
import type { FC, HTMLAttributes } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = HTMLAttributes<HTMLDivElement>;

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: pathname === "/" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <BookOpenText className="mr-2 h-4 w-4" />
              Read Now
            </Link>
            <Link
              href="/browse"
              className={cn(
                buttonVariants({
                  variant: pathname === "/browse" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <SearchCheck className="mr-2 h-4 w-4" />
              Browse
            </Link>
            <Link
              href="/by-genre"
              className={cn(
                buttonVariants({
                  variant: pathname === "/by-genre" ? "secondary" : "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              By Genre
            </Link>
          </div>
        </div>
        {userId ? (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Library
            </h2>
            <div className="space-y-1">
              <Link
                href="/create"
                className={cn(
                  buttonVariants({
                    variant: pathname === "/create" ? "secondary" : "ghost",
                  }),
                  "w-full justify-start",
                )}
              >
                <SquarePen className="mr-2 h-4 w-4" />
                Create
              </Link>
              <Link
                href="/my-blogs"
                className={cn(
                  buttonVariants({
                    variant: pathname === "/my-blogs" ? "secondary" : "ghost",
                  }),
                  "w-full justify-start",
                )}
              >
                <LibraryBig className="mr-2 h-4 w-4" />
                My Blogs
              </Link>
            </div>
          </div>
        ) : null}
        {/* <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div> */}
      </div>
    </div>
  );
};
