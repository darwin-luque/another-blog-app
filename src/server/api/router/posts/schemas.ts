import { z } from "zod";

export const fieldEnums = z.enum([
  "id",
  "title",
  "categoryId",
  "createdAt",
  "updatedAt",
]);
