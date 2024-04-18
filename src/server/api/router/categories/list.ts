import { z } from "zod";
import { count, type SQL } from "drizzle-orm";
import { paginationSchema } from "@/server/api/commons/schemas/pagination";
import { sortSchema } from "@/server/api/commons/schemas/sort";
import { publicProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";
import { fieldEnums } from "./schemas";

export const listCategoriesSchema = z.object({
  q: z.string().optional(),
})
  .merge(paginationSchema)
  .merge(sortSchema(fieldEnums.default("name")));

export const listCategories = publicProcedure
  .input(listCategoriesSchema)
  .query(async ({ input, ctx }) => {
    const [data, [total]] = await Promise.all([
      ctx.db.query.categories.findMany({
        orderBy(fields, op) {
          return op[input.direction](fields[input.field]);
        },
        offset: input.offset,
        limit: input.limit,
        where(fields, op) {
          let query: SQL | undefined = undefined;
          if (input.q) {
            query = op.ilike(fields.name, `%${input.q}%`);
          }
          return query;
        },
      }),
      ctx.db
        .select({
          count: count(categories.id),
        })
        .from(categories)
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
