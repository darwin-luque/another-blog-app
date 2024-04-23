import { protectedProcedure } from "@/server/api/trpc";
import { createInsertSchema } from "drizzle-zod";
import { bookmarksPosts } from "../../../db/schema";

export const createBookmarkPostSchema = createInsertSchema(bookmarksPosts);

export const addPostToBookmark = protectedProcedure
  .input(createBookmarkPostSchema)
  .mutation(
    ({ ctx, input }) => ctx.db.insert(bookmarksPosts).values(input).returning()
  );
