import { protectedProcedure } from "@/server/api/trpc";

export const listBookmarks = protectedProcedure
  .query(
    ({ ctx }) => ctx.db.query.bookmarks.findMany({
      where(fields, { eq }) {
        return eq(fields.createdBy, ctx.auth.userId);
      },
    }),
  );
