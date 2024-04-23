import type { FC } from "react";
import { api } from "@/trpc/server";
import { BookmarksMenuSubItem } from "./item";

export type BookmarksListProps = {
  post: Awaited<ReturnType<typeof api.posts.getById>>;
};

export const BookmarksList: FC<BookmarksListProps> = async ({ post }) => {
  const bookmarks = await api.bookmarks.list();

  return (
    <>
      {bookmarks.map((bookmark) => (
        <BookmarksMenuSubItem
          key={bookmark.id}
          post={post}
          bookmark={bookmark}
        />
      ))}
    </>
  );
};
