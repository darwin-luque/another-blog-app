import { z } from "zod";
import { eq } from "drizzle-orm";
import { categories } from "@/server/db/schema";
import { publicProcedure } from "@/server/api/trpc";

export const deleteCategory = publicProcedure
  .input(z.string().uuid())
  .mutation(({ ctx, input }) => {
    return ctx.db.delete(categories).where(eq(categories.id, input)).execute();
  });
