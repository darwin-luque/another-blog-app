import { createTRPCRouter } from "@/server/api/trpc";
import { createPost } from "./create";
import { getPostById } from "./get-by-id";
import { getMyPosts } from "./get-mine";
import { listPostsForCategory } from "./list-for-category";

export const postsRouter = createTRPCRouter({
  listForCategory: listPostsForCategory,
  getById: getPostById,
  create: createPost,
  mine: getMyPosts,
});
