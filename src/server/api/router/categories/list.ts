import { z } from "zod";
import { count } from "drizzle-orm";
import { paginationSchema } from "@/server/api/commons/schemas/pagination";
import { sortSchema } from "@/server/api/commons/schemas/sort";
import { publicProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";
import { fieldEnums } from "./schemas";

export const listCategoriesSchema = z.object({})
  .merge(paginationSchema)
  .merge(sortSchema(fieldEnums.default("name")));

export const listCategories = publicProcedure
  .input(listCategoriesSchema)
  .query(async ({ input, ctx }) => {
    const data = await ctx.db.query.categories.findMany({
      orderBy: (cat, op) => op[input.direction](cat[input.field]),
      offset: input.offset,
      limit: input.limit,
    });
    const [total] = await ctx.db.select({
      count: count(categories.id),
    }).from(categories);

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
