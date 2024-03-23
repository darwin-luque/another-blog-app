import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getPostById = publicProcedure
  .input(z.string())
  .query(({ input, ctx }) => {
    return ctx.db.query.posts.findFirst({
      where: eq(posts.id, input),
    });
  });
