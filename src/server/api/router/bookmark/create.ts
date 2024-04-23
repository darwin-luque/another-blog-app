import { createInsertSchema } from "drizzle-zod";
import { protectedProcedure } from "@/server/api/trpc";
import { bookmarks } from "@/server/db/schema";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const insertBookmarkSchema = createInsertSchema(bookmarks, {
  createdBy: z.string().optional(),
});

export const createBookmark = protectedProcedure
  .input(insertBookmarkSchema)
  .mutation(async ({ ctx, input }) => {
    const anyOtherBookmark = await ctx.db.query.bookmarks.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.name, input.name), eq(fields.createdBy, ctx.auth.userId));
      },
    });

    if (!!anyOtherBookmark) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A bookmark with this name already exists.",
      });
    }

    return ctx.db
      .insert(bookmarks)
      .values({
        ...input,
        createdBy: ctx.auth.userId,
      })
      .returning();
  });
