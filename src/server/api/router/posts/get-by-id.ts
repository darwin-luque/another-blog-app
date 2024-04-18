import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { posts } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const getPostById = publicProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      where: eq(posts.id, input),
      with: {
        cateogry: true,
        preview: true,
      }
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    return post;
  });
