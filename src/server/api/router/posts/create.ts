import { createInsertSchema } from 'drizzle-zod';
import { publicProcedure } from "@/server/api/trpc";
import { posts } from '@/server/db/schema';

export const insertPostSchema = createInsertSchema(posts);

export const createPost = publicProcedure
  .input(insertPostSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.insert(posts).values(input).execute();
  });
