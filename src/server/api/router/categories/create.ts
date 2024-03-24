import { createInsertSchema } from "drizzle-zod";
import { publicProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";

const insertCategorySchema = createInsertSchema(categories);

export const createCategory = publicProcedure
  .input(insertCategorySchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.insert(categories).values(input).execute();
  });
