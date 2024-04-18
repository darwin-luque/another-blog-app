import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { count, eq } from "drizzle-orm";
import { posts } from "../../../db/schema";
import { TRPCError } from "@trpc/server";

export const getCategoryBySlug = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const category = await ctx.db.query.categories.findFirst({
      where(fields, operators) {
        return operators.eq(fields.slug, input);
      },
    });

    if (!category) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Category not found",
      });
    }

    const postCount = await ctx.db
      .select({
        count: count(posts.id),
      })
      .from(posts)
      .where(eq(posts.categoryId, category.id));

    return {
      ...category,
      postCount: postCount[0]?.count ?? 0,
    };
  });