import { createInsertSchema } from "drizzle-zod";
import { publicProcedure } from "../../trpc";
import { files } from "@/server/db/schema";

export const createFileInputSchema = createInsertSchema(files);

export const createFile = publicProcedure
  .input(createFileInputSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.insert(files).values(input).returning();
  });