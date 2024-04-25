import { z } from "zod";
import { asc, count, desc, eq } from "drizzle-orm";
import { paginationSchema } from "@/server/api/commons/schemas/pagination";
import { sortSchema } from "@/server/api/commons/schemas/sort";
import { bookmarksPosts, categories, files, posts } from "@/server/db/schema";
import { publicProcedure } from "@/server/api/trpc";
import { fieldEnums } from "./schemas";

export const listPostsForBookmarkSchema = z.object({
  bookmarkId: z.string().uuid(),
})
  .merge(paginationSchema)
  .merge(sortSchema(fieldEnums.default("title")));

export const listPostsForBookmark = publicProcedure
  .input(listPostsForBookmarkSchema)
  .query(async ({ ctx, input }) => {
    const whereClause = eq(bookmarksPosts.bookmarkId, input.bookmarkId);
    const orderFunc = { asc, desc }[input.direction];
    const [data, [total]] = await Promise.all([
      ctx.db.select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdBy: posts.createdBy,
        categoryId: posts.categoryId,
        previewId: posts.previewId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          icon: categories.icon,
          slug: categories.slug,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        },
        preview: {
          id: files.id,
          name: files.name,
          url: files.url,
          key: files.key,
          size: files.size,
          type: files.type,
          createdBy: files.createdBy,
          createdAt: files.createdAt,
          updatedAt: files.updatedAt,
        }
      })
        .from(posts)
        .innerJoin(bookmarksPosts, eq(posts.id, bookmarksPosts.postId))
        .innerJoin(categories, eq(posts.categoryId, categories.id))
        .innerJoin(files, eq(posts.previewId, files.id))
        .where(whereClause)
        .orderBy(orderFunc(posts[input.field]))
        .limit(input.limit)
        .offset(input.offset),
      ctx.db.select({
        count: count(posts.id),
      })
        .from(posts)
        .innerJoin(bookmarksPosts, eq(posts.id, bookmarksPosts.postId))
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