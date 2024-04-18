import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { paginationSchema } from "../../commons/schemas/pagination";
import { sortSchema } from "../../commons/schemas/sort";
import { fieldEnums } from "./schemas";
import { count, eq } from "drizzle-orm";
import { posts } from "../../../db/schema";

export const listPostsForCategorySchema = z.object({
  categoryId: z.string().uuid(),
})
  .merge(paginationSchema)
  .merge(sortSchema(fieldEnums.default("title")));

export const listPostsForCategory = publicProcedure
  .input(listPostsForCategorySchema)
  .query(async ({ ctx, input }) => {
    const whereClause = eq(posts.categoryId, input.categoryId);
    const [data, [total]] = await Promise.all([
      ctx.db.query.posts.findMany({
        orderBy: (post, op) => op[input.direction](post[input.field]),
        offset: input.offset,
        limit: input.limit,
        where: whereClause,
        with: {
          cateogry: true,
          preview: true,
        },
      }),
      ctx.db
        .select({
          count: count(posts.id),
        })
        .from(posts)
        .where(whereClause)
    ]);

    return {
      items: data,
      limit: input.limit,
      offset: input.offset,
      total: total?.count ?? 0,
      next: input.offset + input.limit < (total?.count ?? 0) ? {
        limit: input.limit,
        offset: input.offset + input.limit,
      } : null,
      prev: input.offset - input.limit >= 0 ? {
        limit: input.limit,
        offset: input.offset - input.limit,
      } : null,
    };
  });