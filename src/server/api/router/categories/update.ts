import { z } from "zod";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { adminProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

const inputSchema = createInsertSchema(categories, {
  id: z.string().uuid(),
  icon: z.string().optional(),
  name: (schema) => schema.name.optional(),
});
const updateCategorySchema = createInsertSchema(categories, {
  id: z.string().uuid(),
  icon: (schema) => schema.icon.optional(),
  name: (schema) => schema.name.optional(),
});

export const updateCategory = adminProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }) => {
    const parsedInput = await updateCategorySchema.safeParseAsync(input);
    if (!parsedInput.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: parsedInput.error.errors.map((e) => e.message).join(", "),
      });
    }
    await ctx.db.update(categories)
      .set({ ...parsedInput.data, updatedAt: new Date() })
      .where(eq(categories.id, parsedInput.data.id ?? ""))
      .execute();

    return ctx.db.query.categories.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, parsedInput.data.id ?? "");
      },
    });
  });
