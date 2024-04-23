import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoriesRouter } from "./router/categories";
import { postsRouter } from "./router/posts";
import { filesRouter } from "./router/files";
import { bookmarksRouter } from "./router/bookmark";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  bookmarks: bookmarksRouter,
  files: filesRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
