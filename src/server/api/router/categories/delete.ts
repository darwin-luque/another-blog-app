import { z } from "zod";
import { eq } from "drizzle-orm";
import { categories } from "@/server/db/schema";
import { adminProcedure } from "@/server/api/trpc";

export const deleteCategory = adminProcedure
  .input(z.string().uuid())
  .mutation(({ ctx, input }) => {
    return ctx.db.delete(categories).where(eq(categories.id, input)).execute();
  });
