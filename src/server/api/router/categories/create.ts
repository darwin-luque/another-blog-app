import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { adminProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

const inputSchema = createInsertSchema(categories, {
  icon: z.string(),
});
const insertCategorySchema = createInsertSchema(categories);

export const createCategory = adminProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }) => {
    const parsedInput = await insertCategorySchema.safeParseAsync(input);
    if (!parsedInput.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: parsedInput.error.errors.map((e) => e.message).join(", "),
      });
    }
    return ctx.db.insert(categories).values(parsedInput.data).execute();
  });
