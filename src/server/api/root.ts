import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoriesRouter } from "./router/categories";
import { postsRouter } from "./router/posts";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
