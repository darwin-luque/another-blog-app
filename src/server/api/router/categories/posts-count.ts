import { z } from "zod";
import { count, eq } from "drizzle-orm";
import { posts } from "@/server/db/schema";
import { publicProcedure } from "@/server/api/trpc";

// TODO: Append this functionality to the list procedure
export const postsCount = publicProcedure
  .input(z.string().uuid())
  .query(async ({ ctx, input }) => {
    return ctx.db
      .select({
        count: count(posts.id)
      })
      .from(posts)
      .where(eq(posts.categoryId, input))
      .then((res) => {
        if (!res[0]) {
          return 0;
        }
        return res[0].count;
      });
  });
