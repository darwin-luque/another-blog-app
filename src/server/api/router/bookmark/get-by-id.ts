import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";

export const getBookmarkById = protectedProcedure
  .input(z.string().uuid())
  .query(async ({ ctx, input }) => {
    const bookmark = await ctx.db.query.bookmarks.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, input);
      },
    });

    if (!bookmark) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Bookmark not found",
      });
    }

    if (bookmark.createdBy !== ctx.auth.userId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Naughty naughty! You can't access this bookmark!",
      });
    }

    return bookmark;
  });