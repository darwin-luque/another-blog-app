import Link from "next/link";
import type { FC } from "react";
import { Bookmark, BookmarkPlus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateBookmarkModal } from "../create-modal";
import type { api } from "@/trpc/server";
import { cn } from "@/lib/utils";

export type BookmarksListProps = {
  bookmarks: Awaited<ReturnType<typeof api.bookmarks.list>>;
};

export const BookmarksList: FC<BookmarksListProps> = ({ bookmarks }) => {
  return (
    <Dialog>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <DialogTrigger asChild>
          <Button
            className="justify-start gap-2 truncate px-2"
            variant="outline"
            size="lg"
          >
            <BookmarkPlus />
            Create
          </Button>
        </DialogTrigger>
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={`/bookmarks/${bookmark.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "justify-start gap-2 truncate px-2",
            )}
          >
            <Bookmark />
            {bookmark.name}
          </Link>
        ))}
      </div>
      <CreateBookmarkModal />
    </Dialog>
  );
};
