import { z } from "zod";

export const paginationSchema = z.object({
  limit: z.number().int().positive().default(10),
  offset: z.number().int().min(0).default(0),
});
