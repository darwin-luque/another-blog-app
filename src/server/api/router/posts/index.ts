import { createTRPCRouter } from "@/server/api/trpc";
import { listPostsForCategory } from "./list-for-category";
import { listPostsForBookmark } from "./list-for-bookmark";
import { getPostById } from "./get-by-id";
import { getMyPosts } from "./get-mine";
import { createPost } from "./create";

export const postsRouter = createTRPCRouter({
  listForCategory: listPostsForCategory,
  listForBookmark: listPostsForBookmark,
  getById: getPostById,
  create: createPost,
  mine: getMyPosts,
});
