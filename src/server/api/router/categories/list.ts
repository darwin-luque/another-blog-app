import { z } from "zod";
import { publicProcedure } from "@/server/api/trpc";
import { paginationSchema } from "@/server/api/commons/schemas/pagination";
import { sortSchema } from "@/server/api/commons/schemas/sort";

const listCategoriesSchema = z.object({})
  .merge(paginationSchema)
  .merge(sortSchema(
    z.enum([
      "id",
      "name",
      "createdAt",
      "updatedAt",
    ])
  ));

export const listCategories = publicProcedure
  .input(listCategoriesSchema)
  .query(({ input, ctx }) => {
    return ctx.db.query.categories.findMany({
      orderBy: (cats, op) => op[input.direction](cats[input.field]),
      limit: input.limit,
      offset: input.offset,
    });
  });
