import { createInsertSchema } from 'drizzle-zod';
import { protectedProcedure } from "@/server/api/trpc";
import { posts } from '@/server/db/schema';

export const insertPostSchema = createInsertSchema(posts);

export const createPost = protectedProcedure
  .input(insertPostSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.insert(posts).values(input).execute();
  });
