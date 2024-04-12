import { createTRPCRouter } from "@/server/api/trpc";
import { createPost } from "./create";
import { getPostById } from "./get-by-id";
import { getMyPosts } from "./get-mine";

export const postsRouter = createTRPCRouter({
  create: createPost,
  getById: getPostById,
  mine: getMyPosts,
});
