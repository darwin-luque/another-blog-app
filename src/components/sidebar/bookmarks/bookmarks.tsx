"use client";

import Link from "next/link";
import type { FC } from "react";
import { Bookmark, BookmarkPlus, Loader2 } from "lucide-react";
import { CreateBookmarkModal } from "@/components/bookmarks/create-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

export const SidebarBookmarks: FC = () => {
  const {
    data: bookmarks,
    isLoading,
    isRefetching,
  } = api.bookmarks.list.useQuery();

  return (
    <Dialog>
      <div className="px-3 py-2 space-y-2">
        <Link
          href="/bookmarks"
          className="px-4 text-lg font-semibold tracking-tight"
        >
          Bookmarks
        </Link>
        <div className="space-y-2">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </DialogTrigger>
          {isLoading || isRefetching ? (
            <div className="flex w-full justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : null}
          <div className="space-y-1">
            {bookmarks?.map((bookmark) => (
              <Link
                key={bookmark.id}
                href="/my-blogs"
                className={cn(
                  buttonVariants({
                    // variant: pathname === "/my-blogs" ? "secondary" : "ghost",
                    variant: "ghost",
                  }),
                  "w-full justify-start",
                )}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {bookmark.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CreateBookmarkModal />
    </Dialog>
  );
};
