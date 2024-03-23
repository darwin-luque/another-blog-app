import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { postsRouter } from "./router/posts";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
