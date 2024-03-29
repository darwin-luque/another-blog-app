import { z } from "zod";

export const fieldEnums = z.enum([
  "id",
  "name",
  "createdAt",
  "updatedAt",
]);
