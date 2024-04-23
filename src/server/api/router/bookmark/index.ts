import { createTRPCRouter } from "@/server/api/trpc";
import { addPostToBookmark } from "./add-post";
import { createBookmark } from "./create";
import { listBookmarks } from "./list";

export const bookmarksRouter = createTRPCRouter({
  list: listBookmarks,
  create: createBookmark,
  addPost: addPostToBookmark,
});
