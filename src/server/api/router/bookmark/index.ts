import { createTRPCRouter } from "@/server/api/trpc";
import { addPostToBookmark } from "./add-post";
import { createBookmark } from "./create";
import { listBookmarks } from "./list";
import { getBookmarkById } from "./get-by-id";

export const bookmarksRouter = createTRPCRouter({
  list: listBookmarks,
  create: createBookmark,
  getById: getBookmarkById,
  addPost: addPostToBookmark,
});
