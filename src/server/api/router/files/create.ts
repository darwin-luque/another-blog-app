import { createInsertSchema } from "drizzle-zod";
import { protectedProcedure } from "../../trpc";
import { files } from "@/server/db/schema";

export const createFileInputSchema = createInsertSchema(files);

export const createFile = protectedProcedure
  .input(createFileInputSchema)
  .mutation(({ input, ctx }) => {
    return ctx.db.insert(files).values(input).returning();
  });
