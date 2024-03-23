import { createTRPCRouter } from "@/server/api/trpc";
import { createPost } from "./create";
import { getPostById } from "./get-by-id";

export const postsRouter = createTRPCRouter({
  create: createPost,
  getById: getPostById,
});
