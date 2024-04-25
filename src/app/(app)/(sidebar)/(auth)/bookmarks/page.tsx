import { BookmarksList } from "@/components/bookmarks/list";
import { api } from "@/trpc/server";

export default async function BookmarksPage() {
  const bookmarks = await api.bookmarks.list();

  return <BookmarksList bookmarks={bookmarks} />;
}
